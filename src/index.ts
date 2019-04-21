import * as findAndReplaceDOMText from 'findandreplacedomtext';
import { ffStyle, colors } from './style.ts';

let currentColor = 0;
let settings = {
  showRotatingArrow: false,
  showSideMap: false,
};

var pageHeight = Math.max(
  document.body.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.clientHeight,
  document.documentElement.scrollHeight,
  document.documentElement.offsetHeight
);

interface FFelement {
  active: boolean;
  portions: HTMLDivElement[];
  mapIndicator: HTMLDivElement;
}
interface FFinstance {
  finder: any;
  elements: FFelement[];
}
let selections: FFinstance[] = [];

let repeatLogo: HTMLElement = document.createElement('img');
let repeatLogoWrapper: HTMLElement = document.createElement('div');

let selectionsMapWrapper: HTMLElement = document.createElement('div');

const initFF = () => {
  const style = document.createElement('style');
  style.innerHTML = ffStyle;
  document.head.appendChild(style);

  repeatLogo.setAttribute('src', chrome.extension.getURL('assets/repeat.png'));
  repeatLogo.className = 'repeatLogo';
  repeatLogoWrapper.className = 'repeatLogoWrapper';
  repeatLogoWrapper.appendChild(repeatLogo);
  document.body.appendChild(repeatLogoWrapper);

  if (settings.showSideMap) {
    selectionsMapWrapper.className = 'selectionsMapWrapper';
    document.body.appendChild(selectionsMapWrapper);
  }

  document.body.addEventListener('keydown', onKeyDown);
};

const onKeyDown = (e: KeyboardEvent) => {
  if (e.srcElement.tagName.toLowerCase() === 'input' || e.metaKey) return false;

  const selectedText = window.getSelection();
  const text = selectedText.toString().trim();

  if (e.key === 'f') {
    if (text) {
      const exists = selections.find(
        selection => selection.finder.options.find === text
      );
      if (!exists) createElement(text, selectedText);
    } else {
      removeSelectedElement();
    }
    e.stopPropagation();
  } else if (e.key === 'd' && selections.length) {
    removeAllElements();
    e.stopPropagation();
  } else if (e.key === 'r' && selections.length) {
    cycleThroughElements(1);
    e.stopPropagation();
  } else if (e.key === 'e' && selections.length) {
    cycleThroughElements(-1);
    e.stopPropagation();
  }
};

const cycleThroughElements = (direction: number) => {
  const selectedInstance = getSelectedInstance();
  if (!selectedInstance) return false;
  const selectedElement = getSelectedElement(selectedInstance);
  const { elements } = selectedInstance;
  let nextIndex = elements.indexOf(selectedElement) + direction;
  if (nextIndex >= elements.length) {
    nextIndex = 0;
    settings.showRotatingArrow && rotateLogo();
  } else if (nextIndex < 0) {
    nextIndex = elements.length - 1;
    settings.showRotatingArrow && rotateLogo();
  }
  const nextActive = elements[nextIndex];
  selectElement(nextActive, true);
};

const getSelectedInstance = () => {
  let instance = null;
  let found = false;
  selections.forEach(selection => {
    found = Boolean(selection.elements.find(element => element.active));
    if (found) instance = selection;
  });
  return instance;
};

const getSelectedElement = (instance: FFinstance) => {
  if (!instance) return false;
  return instance.elements.find(element => element.active);
};

const unselectElement = () => {
  let oldElement = getSelectedElement(getSelectedInstance());
  if (oldElement) {
    oldElement.active = false;
    oldElement.portions.forEach(p => p.classList.remove('selected'));
    settings.showSideMap && oldElement.mapIndicator.classList.remove('selected');
  }
};

const selectElement = (element, scrollIntoView) => {
  if (!element) return false;
  unselectElement();

  element.active = true;
  element.portions.forEach(p => p.classList.add('selected'));
  settings.showSideMap && element.mapIndicator.classList.add('selected');
  scrollIntoView && element.portions[0].scrollIntoView({block: 'center'});
};

const removeElement = (selection: FFinstance) => {
  settings.showSideMap && selection.elements.forEach(element =>
    element.mapIndicator.remove()
  );
  selection.finder.revert();
};

const removeSelectedElement = () => {
  const selectedInstance = getSelectedInstance();
  if (selectedInstance) {
    removeElement(selectedInstance);
    selections.splice(selections.indexOf(selectedInstance), 1);
  } else {
    removeElement(selections.pop());
  }
};

const removeAllElements = () => {
  selections.forEach(removeElement);
  selections = [];
};

const createElement = (text: String, selectedText: Selection) => {
  unselectElement();
  const color = colors[currentColor];
  currentColor =
    currentColor === colors.length - 1 ? 0 : currentColor + 1;
  const contrast = getContrastYIQ(color);
  const currentElements: FFelement[] = [];
  let portions: HTMLDivElement[] = [];
  let active = false;
  const finder = findAndReplaceDOMText(document.body, {
    preset: 'prose',
    find: text,
    replace: portion => {
      active = active
        ? active
        : selectedText.baseNode.parentElement ===
          portion.node.parentElement;

      const div = document.createElement('ffelem') as HTMLDivElement;
      div.classList.add('ffelem');
      if (active) div.classList.add('selected');
      div.style.backgroundColor = color;
      div.style.color = contrast;
      div.innerHTML = portion.text;
      portions.push(div);

      if (portion.isEnd) {
        const element: FFelement = { portions, active, mapIndicator: null };
        currentElements.push(element);
        portions = [];
        active = false;
      }
      return div;
    }
  });

  window.getSelection().empty();
  const currentSelection: FFinstance = { finder, elements: currentElements };
  currentElements.forEach(element => {
    const { portions, active } = element;
    portions.forEach(div => {
      div.onmouseover = div.onmouseout = onHover(currentSelection);
      div.onclick = () => selectElement(element, false);
    });
    if (settings.showSideMap) {
      let indicator = document.createElement('div');
      indicator.classList.add('mapIndicator');
      if (active) indicator.classList.add('selected');
      indicator.onclick = () => selectElement(element, true);
      let elementPosition = portions[0].getBoundingClientRect().top + document.documentElement.scrollTop;
      indicator.style.marginTop = `${elementPosition / pageHeight * 100}vh`;
      indicator.style.backgroundColor = color;
      selectionsMapWrapper.appendChild(indicator);
      element.mapIndicator = indicator;
    }
  });
  selections.push(currentSelection);
};

const onHover = (currentSelection: FFinstance) => {
  return (event: MouseEvent) => {
    if (event.type === 'mouseover') {
      currentSelection.elements.forEach(portion =>
        portion.portions.forEach(element => element.classList.add('hovered'))
      );
    } else {
      currentSelection.elements.forEach(portion =>
        portion.portions.forEach(element => element.classList.remove('hovered'))
      );
    }
  };
};

const rotateLogo = () => {
  repeatLogo.classList.add('active');
  repeatLogoWrapper.classList.add('active');
  window.setTimeout(() => {
    repeatLogo.classList.remove('active');
    repeatLogoWrapper.classList.remove('active');
  }, 810);
};

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getContrastYIQ = hexcolor => {
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
};

initFF();
