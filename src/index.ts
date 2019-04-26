import * as findAndReplaceDOMText from 'findandreplacedomtext';
import { ffStyle, colors } from './style.ts';

let currentColor = 0;
let pageHeight = 0;
let settings = {
  showRotatingArrow: true,
  showSideMap: true,
};

interface FFelement {
  active: boolean;
  portions: HTMLDivElement[];
  mapIndicator: HTMLDivElement;
}
interface FFinstance {
  finder: any;
  elements: FFelement[];
  mapWrapper: HTMLDivElement;
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

  const resizeObserver = new ResizeObserver(() => {
    let newHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    if (newHeight != pageHeight) {
      pageHeight = newHeight;
      redrawMapIndicators();
    }
  });
  resizeObserver.observe(document.body);
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
      removeSelectedOrLastElement();
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
  const { instance, element } = getSelectedStructures();
  if (!element) return false;
  const { elements } = instance;
  let nextIndex = elements.indexOf(element) + direction;
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

const getSelectedStructures = () => {
  let element;
  let instance = selections.find(selection => {
    element = selection.elements.find(element => element.active);
    return Boolean(element);
  });
  return { element, instance: instance || undefined };
};

const unselectElement = () => {
  let { element } = getSelectedStructures();
  if (element) {
    element.active = false;
    element.portions.forEach(p => p.classList.remove('selected'));
    settings.showSideMap && element.mapIndicator.classList.remove('selected');
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
  selection.mapWrapper.remove();
  selection.finder.revert();
};

const removeSelectedOrLastElement = () => {
  const { instance } = getSelectedStructures();
  if (instance) {
    removeElement(instance);
    selections.splice(selections.indexOf(instance), 1);
  } else {
    selections.length && removeElement(selections.pop());
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
  const mapWrapper = document.createElement('div');
  mapWrapper.classList.add('mapWrapper');
  const currentSelection: FFinstance = { finder, elements: currentElements, mapWrapper };
  currentElements.forEach(element => {
    const { portions, active } = element;
    portions.forEach(div => {
      div.onmouseover = div.onmouseout = onElementHover(currentSelection);
      div.onclick = () => selectElement(element, false);
    });
    if (settings.showSideMap) {
      let indicator = document.createElement('div');
      indicator.classList.add('mapIndicator');
      if (active) indicator.classList.add('selected');
      indicator.onclick = () => selectElement(element, true);
      let elementPosition =
        portions[0].getBoundingClientRect().top + document.documentElement.scrollTop;
      indicator.style.transform = `translateY(${elementPosition / pageHeight * 100}vh)`;
      indicator.style.backgroundColor = color;
      mapWrapper.appendChild(indicator);
      element.mapIndicator = indicator;
    }
  });
  selectionsMapWrapper.appendChild(mapWrapper);
  selections.push(currentSelection);
};

const redrawMapIndicators = () => {
  selections.forEach(instance => {
    instance.elements.forEach(element => {
      let elementPosition =
        element.portions[0].getBoundingClientRect().top + document.documentElement.scrollTop;
      element.mapIndicator.style.transform = `translateY(${elementPosition / pageHeight * 100}vh)`;
    });
  });
};

const onElementHover = (currentSelection: FFinstance) =>
  (event: MouseEvent) =>
    currentSelection.elements.forEach(element =>
      element.portions.forEach(portion =>
        event.type === 'mouseover'
          ? portion.classList.add('hovered')
          : portion.classList.remove('hovered')
        )
    );

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
