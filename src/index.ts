import * as findAndReplaceDOMText from 'findandreplacedomtext';
import { ffStyle, colors } from './style';
import ResizeObserver from 'resize-observer-polyfill';

// TODO:
// - html text "breaks" after removing elements
// - typing is missing in some places
// - performance
const DEBUG_ON = false;
const AUTO_PIN_MAP = false;

let viewPortDelta = 20;
let currentColor = 0;
let pageHeight = Math.max(
  document.body.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.clientHeight,
  document.documentElement.scrollHeight,
  document.documentElement.offsetHeight
);

let settings = {
  mainKey: 'f',
  unselectAllKey: 'd',
  nextElementKey: 'r',
  previousElementKey: 'e',
  nextInstanceKey: 't',
  previousInstanceKey: 'w',
  showRotatingArrow: false,
  showSideMap: true,
  keepElementCentered: false,
  matchCaseSensitive: true,
  smoothScrolling: true,
};

interface FFelement {
  active: boolean;
  portions: HTMLElement[];
  mapIndicator: HTMLElement;
}
interface FFinstance {
  finder: any;
  active: boolean;
  sanitizedText: string;
  elements: FFelement[];
  mapWrapper: HTMLElement;
}
let selections: FFinstance[] = [];

let repeatLogo: HTMLElement = document.createElement('img');
let repeatLogoWrapper: HTMLElement = document.createElement('div');

let selectionsMapWrapper: HTMLElement = document.createElement('div');
let selectionsMapPin: HTMLElement = document.createElement('div');
let mapPin: HTMLElement = document.createElement('img');

const initFF = () => {
  const style = document.createElement('style');
  style.innerHTML = ffStyle;
  document.head.appendChild(style);

  repeatLogo.setAttribute('src', chrome.extension.getURL('assets/repeat.png'));
  repeatLogo.className = 'repeatLogo';
  repeatLogoWrapper.className = 'repeatLogoWrapper';
  repeatLogoWrapper.appendChild(repeatLogo);
  document.body.appendChild(repeatLogoWrapper);

  selectionsMapWrapper.className = 'selectionsMapWrapper';
  document.body.appendChild(selectionsMapWrapper);

  selectionsMapPin.className = 'selectionsMapPin';
  selectionsMapPin.onclick = () => {
    selectionsMapPin.classList.toggle('fixed');
    selectionsMapWrapper.classList.toggle('fixed');
  };
  if (AUTO_PIN_MAP) {
    selectionsMapPin.classList.toggle('fixed');
    selectionsMapWrapper.classList.toggle('fixed');
  }
  selectionsMapWrapper.appendChild(selectionsMapPin);

  mapPin.setAttribute('src', chrome.extension.getURL('assets/pin.png'));
  mapPin.className = 'mapPin';
  selectionsMapPin.appendChild(mapPin);

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
      console.log('page height change:', newHeight);
      redrawMapIndicators();
    }
  });
  resizeObserver.observe(document.body);
};

const onKeyDown = (e: KeyboardEvent & { target: HTMLInputElement }) => {
  if (
    e.target.contentEditable === 'true' ||
    e.target.tagName.toLowerCase() === 'input' ||
    e.target.tagName.toLowerCase() === 'textarea' ||
    e.metaKey)
    return false;

  const selectedText = window.getSelection();
  // trim removes spaces
  const text = selectedText.toString().trim();

  if (e.key === settings.mainKey ||
      (e.key === settings.mainKey.toUpperCase() && !e.shiftKey)) {
    // No support for multi-line for now...
    if (text && !text.includes('\n')) {
      const exists = selections.find(
        selection => selection.sanitizedText === text
      );
      if (!exists) {
        createElement(text, selectedText, selectedText.toString());
      } else {
        removeSelectedOrLastElement();
      }
    } else {
      removeSelectedOrLastElement();
    }
    e.preventDefault();
    e.stopPropagation();
  } else if (e.key === settings.unselectAllKey && selections.length ||
    (e.key === settings.unselectAllKey.toUpperCase() && !e.shiftKey)) {
    removeAllElements();
    e.preventDefault();
    e.stopPropagation();
  } else if (e.key === settings.nextElementKey && selections.length ||
    (e.key === settings.nextElementKey.toUpperCase() && !e.shiftKey)) {
    cycleThroughElements(1);
    e.preventDefault();
    e.stopPropagation();
  } else if (e.key === settings.previousElementKey && selections.length ||
    (e.key === settings.previousElementKey.toUpperCase() && !e.shiftKey)) {
    cycleThroughElements(-1);
    e.preventDefault();
    e.stopPropagation();
  } else if (e.key === settings.nextInstanceKey && selections.length ||
    (e.key === settings.nextInstanceKey.toUpperCase() && !e.shiftKey)) {
    cycleThroughInstances(1);
    e.preventDefault();
    e.stopPropagation();
  } else if (e.key === settings.previousInstanceKey && selections.length ||
    (e.key === settings.previousInstanceKey.toUpperCase() && !e.shiftKey)) {
    cycleThroughInstances(-1);
    e.preventDefault();
    e.stopPropagation();
  }
};

const cycleThroughInstances = (direction: number) => {
  const { instance, element } = getSelectedStructures();
  if (!instance || !element) return false;
  let nextIndex = selections.indexOf(instance) + direction;
  if (nextIndex >= selections.length) {
    nextIndex = 0;
    // settings.showRotatingArrow && rotateLogo();
  } else if (nextIndex < 0) {
    nextIndex = selections.length - 1;
    // settings.showRotatingArrow && rotateLogo();
  }
  const nextActive = selections[nextIndex];
  const selectedElement = nextActive.elements.find(elem => elem.active);
  selectElement(nextActive, selectedElement, true);
};

const cycleThroughElements = (direction: number) => {
  const { instance, element } = getSelectedStructures();
  if (!instance || !element) return false;
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
  selectElement(instance, nextActive, true);
};

const getSelectedStructures = () => {
  let instance = selections.find(instance => instance.active) || null;
  let element = instance
    ? instance.elements.find(element => element.active)
    : null;
  return { element, instance };
};

const unselectElement = () => {
  selections.forEach(selection => {
    if (selection.active) {
      selection.active = false;
      requestAnimationFrame(() => {
        selection.mapWrapper.classList.remove('selected');
      });
      selection.elements.forEach(elem => {
        if (elem.active) {
          requestAnimationFrame(() => {
            elem.portions.forEach(p => p.classList.remove('selected'));
            elem.mapIndicator.classList.remove('selected');
          });
        } else {
          requestAnimationFrame(() => {
            elem.portions.forEach(p => p.classList.remove('selectedClass'));
          });
        }
      });
    }
  });
};

const selectElement = (instance, element, scrollIntoView) => {
  if (!element || !instance) return false;
  unselectElement();

  selections.forEach(selection => {
    if (selection === instance) {
      selection.active = true;
      requestAnimationFrame(() => {
        selection.mapWrapper.classList.add('selected');
      });
      selection.elements.forEach(elem => {
        if (elem === element) {
          elem.active = true;
          requestAnimationFrame(() => {
            elem.portions.forEach(p => p.classList.add('selected'));
            elem.mapIndicator.classList.add('selected');
          });
          const scrollBehaviour: any = settings.smoothScrolling ? 'smooth' : 'instant';
          const scrollSettings: ScrollIntoViewOptions = {
            block: 'center',
            behavior: scrollBehaviour,
          };
          if (settings.keepElementCentered || !isElementInViewport(elem.portions[0])) {
            scrollIntoView && elem.portions[0].scrollIntoView(scrollSettings);
          }
        } else {
          elem.active = false;
          requestAnimationFrame(() => {
            elem.portions.forEach(p => p.classList.add('selectedClass'));
          });
        }
      });
    }
  });
};

const removeElement = (selection: FFinstance) => {
  selection.elements.forEach(element =>
    element.mapIndicator.remove()
  );
  selection.mapWrapper.remove();
  selection.elements.forEach(element => {
    element.portions.forEach((portion: HTMLElement) => {
      while(portion.childNodes.length) {
        portion.parentNode.insertBefore(portion.childNodes[0], portion);
      }
      portion.parentNode.removeChild(portion);
    });
  });
  // selection.finder.revert();
};

const removeSelectedOrLastElement = () => {
  const { instance } = getSelectedStructures();
  if (instance) {
    removeElement(instance);
    selections.splice(selections.indexOf(instance), 1);
  } else {
    selections.length && removeElement(selections.pop());
  }
  if (selections.length) {
    const nextInstance = selections[selections.length - 1];
    const selectedElement = nextInstance.elements.find(elem => elem.active);
    selectElement(nextInstance, selectedElement, true);
  }
};

const removeAllElements = () => {
  selections.forEach(removeElement);
  selections = [];
};

const createElement = (text: string, selectedText: any, selection) => {
  let activeElements = 0;
  const scrollToTop =
      document.documentElement.scrollTop || document.body.scrollTop || 0;

  const anchorAndFocusAreTheSame = selectedText.anchorNode === selectedText.focusNode;
  let selectionOffsetToEnd;
  let selectedTextParent;
  let selectedTextIndex;
  const selectionTextTrimDelta = selection.length - text.length - selection.indexOf(text);
  DEBUG_ON && console.log('selectionTextTrimDelta', selectionTextTrimDelta)

  if (anchorAndFocusAreTheSame) {
    if (selectedText.anchorOffset < selectedText.focusOffset) {
      // left to right selection
      selectionOffsetToEnd = selectedText.focusNode.textContent.length - selectedText.focusOffset;
      selectedTextIndex = getParentIndex(selectedText.focusNode, true);
    } else {
      // right to left selection
      selectionOffsetToEnd = selectedText.anchorNode.textContent.length - selectedText.anchorOffset;
      selectedTextIndex = getParentIndex(selectedText.anchorNode, true);
    }
    selectedTextParent = selectedText.focusNode.parentElement;
    selectionOffsetToEnd += selectionTextTrimDelta;
  } else {
    const ancestor = commonAncestor(selectedText.anchorNode, selectedText.focusNode);
    DEBUG_ON && console.log('ancestor', ancestor);

    const anchorParents = getElementParents(selectedText.anchorNode);
    const anchorAncestorIndex = anchorParents.indexOf(ancestor);
    const focusParents = getElementParents(selectedText.focusNode);
    const focusAncestorIndex = focusParents.indexOf(ancestor);

    let anchorIndexOnParent;
    let focusIndexOnParent;

    anchorIndexOnParent = getParentIndex(anchorParents[anchorAncestorIndex + 1]);
    DEBUG_ON && console.log("anchor relative", anchorParents[anchorAncestorIndex + 1]);
    focusIndexOnParent = getParentIndex(focusParents[focusAncestorIndex + 1]);
    DEBUG_ON && console.log("focus relative", focusParents[focusAncestorIndex + 1]);

    DEBUG_ON && console.log('anchorIndexOnParent focusIndexOnParent', anchorIndexOnParent, focusIndexOnParent);
    let node;
    let offset;
    let deltaCopy = selectionTextTrimDelta;
    if (anchorIndexOnParent < focusIndexOnParent) {
      // anchor is before focus on DOM
      // left to right selection
      selectionOffsetToEnd = selectedText.focusNode.textContent.length - selectedText.focusOffset;
      node = selectedText.focusNode;
      offset = selectedText.focusOffset;
    } else {
      // anchor is after focus on DOM
      // right to left selection
      selectionOffsetToEnd = selectedText.anchorNode.textContent.length - selectedText.anchorOffset;
      node = selectedText.anchorNode;
      offset = selectedText.anchorOffset;
    }

    if(deltaCopy >= offset) {
      while(deltaCopy >= offset) {
        node = node.previousSibling;
        deltaCopy -= offset;
        offset = node.textContent.length;
        selectionOffsetToEnd = 0;
      }
    } else {
      selectionOffsetToEnd += selectionTextTrimDelta;
    }
    selectedTextParent = node.parentElement;
    selectedTextIndex = getParentIndex(node, true);
  }

  DEBUG_ON && console.log('index', selectedTextIndex);
  DEBUG_ON && console.log('offset', selectionOffsetToEnd);
  DEBUG_ON && console.log('parent', selectedTextParent);
  DEBUG_ON && console.log("--------------------------------------------------");

  let color: Array<number>;
  if (currentColor < colors.length) {
    color = colors[currentColor++];
  } else {
    color = getRandomColor();
  }
  const contrast = getContrastYIQ(color);
  const currentElements: FFelement[] = [];
  let portions: HTMLElement[] = [];
  let active = false;
  let someActive = false;
  let regexFinder = null;
  let excapedText = text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  let needsWBonStart = RegExp(/^\w/).test(text);
  let needsWBonEnd = RegExp(/\w$/).test(text);

  try {
    regexFinder = RegExp(
      `${needsWBonStart ? '\\b' : ''}${excapedText}${needsWBonEnd ? '\\b' : ''}`,
      settings.matchCaseSensitive ? 'g' : 'gi'
    );
    DEBUG_ON && console.log(excapedText, regexFinder);
  } catch (error) {
    if (DEBUG_ON) {
      console.error(error);
      debugger;
    }
    return;
  }
  
  const finder = findAndReplaceDOMText(document.body, {
    preset: 'prose',
    find: regexFinder,
    replace: portion => {

      const elementIsVisible =
        !!( portion.node.parentElement.offsetWidth ||
            portion.node.parentElement.offsetHeight ||
            portion.node.parentElement.getClientRects().length
          );

      DEBUG_ON && console.log("elem is visible", elementIsVisible);
      if (elementIsVisible) {

        let portionOffsetToEnd;
        let portionIndex;
        if (portion.isEnd) {
          portionIndex = getParentIndex(portion.node, true);
          portionOffsetToEnd =
            Number(portion.node.textContent.length) - Number(portion.text.length);
          if (portion.index === 0) portionOffsetToEnd -= portion.indexInNode;

          active = active
            ? active
            : selectedTextIndex === portionIndex &&
              selectionOffsetToEnd === portionOffsetToEnd &&
              selectedTextParent === portion.node.parentElement;
          someActive = active || someActive;

          DEBUG_ON && console.log("###", text, " active", active, portion.node);
          DEBUG_ON && console.log("index", selectedTextIndex, portionIndex);
          DEBUG_ON && console.log("parents", selectedTextParent, portion.node.parentElement)
          DEBUG_ON && console.log("offsetToEnd", selectionOffsetToEnd, portionOffsetToEnd)
          DEBUG_ON && console.log("--------------------------------------------------");
          // debugger
        }

        const div = document.createElement('ffelem') as HTMLDivElement;
        portions.push(div);
        requestAnimationFrame(() => {
          if (portion.index === 0 && portion.isEnd) div.classList.add('ffelem');
          else if (portion.index === 0) div.classList.add('ffelemStart');
          else if (portion.isEnd) div.classList.add('ffelemEnd');
          else div.classList.add('ffelemMiddle');
          div.style.backgroundColor = renderColor(color, 1.0);
          div.style.color = contrast;
          div.innerHTML = portion.text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        });

        if (portion.isEnd) {
          const element: FFelement = { portions, active, mapIndicator: null };
          currentElements.push(element);
          portions = [];
          if (active) activeElements++;
          active = false;
        }

        return div;
      } else {
        return portion.text;
      }
    }
  });
  if (DEBUG_ON && currentElements.length && (activeElements === 0 || activeElements > 1)) {
    console.log('Active elements:', activeElements);
    console.log('Elements:', currentElements);
    debugger;
  }

  if (!currentElements.length) return false;

  unselectElement();
  window.getSelection().empty();
  const mapWrapper = document.createElement('div');
  mapWrapper.classList.add('mapWrapper');
  mapWrapper.classList.add('selected');
  const currentSelection: FFinstance = {
    finder,
    active: true,
    elements: currentElements,
    mapWrapper,
    sanitizedText: text,
  };

  currentElements.forEach(element => {
    const { portions, active } = element;

    portions.forEach(div => {
      div.onmouseover = div.onmouseout = onElementHover(currentSelection);
      div.onclick = () => selectElement(currentSelection, element, false);

      if (active) {
        requestAnimationFrame(() => {
          div.classList.add('selected');
        });
      } else if (someActive) {
        requestAnimationFrame(() => {
          div.classList.add('selectedClass');
        });
      }
    });

    let indicator = document.createElement('div');
    indicator.classList.add('mapIndicator');
    if (active) indicator.classList.add('selected');
    indicator.onclick = () => selectElement(currentSelection, element, true);
    let elementPosition = portions[0].getBoundingClientRect().top + scrollToTop;
    indicator.style.transform = `translateY(${elementPosition / pageHeight * 100}vh)`;
    DEBUG_ON && console.log('DEBUG: createElement -> portions[0].getBoundingClientRect().top', portions[0].getBoundingClientRect().top)
    DEBUG_ON && console.log('DEBUG: createElement -> scrollToTop', scrollToTop)
    DEBUG_ON && console.log('DEBUG: createElement -> elementPosition', elementPosition)
    DEBUG_ON && console.log('DEBUG: createElement -> pageHeight', pageHeight)
    DEBUG_ON && console.log('DEBUG: ..............................')
    indicator.style.backgroundColor = renderColor(color, 0.8);
    mapWrapper.appendChild(indicator);
    element.mapIndicator = indicator;
  });

  const label = document.createElement('div');
  label.classList.add('mapLabel');
  label.style.background =
    `linear-gradient(to bottom,
${renderColor(color, 1.0)} 0%,
${renderColor(color, 0.8)} 10%,
${renderColor(color, 0.6)} 40%,
#00000000 50%,#00000000 100%)`;
  label.innerText = text.split('').reverse().join('');

  requestAnimationFrame(() => {
    selectionsMapWrapper.appendChild(mapWrapper);
  });

  currentSelection.mapWrapper.appendChild(label);
  selections.push(currentSelection);
  document.documentElement.scrollTop && document.documentElement.scrollTo({ top: scrollToTop });
  document.body.scrollTop && document.body.scrollTo({ top: scrollToTop });
};

const redrawMapIndicators = () => {
  selections.forEach(instance => {
    instance.elements.forEach(element => {
      let elementPosition =
        element.portions[0].getBoundingClientRect().top +
          (document.documentElement.scrollTop || document.body.scrollTop || 0);
      element.mapIndicator.style.transform = `translateY(${elementPosition / pageHeight * 100}vh)`;
    });
  });
};

const onElementHover = (currentSelection: FFinstance) =>
  (event: MouseEvent) =>
    currentSelection.elements.forEach(element =>
      element.portions.forEach(portion =>
        requestAnimationFrame(() =>
          event.type === 'mouseover'
            ? portion.classList.add('hovered')
            : portion.classList.remove('hovered')
        )
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
  return [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ];
};

const renderColor =(color: Array<number>, transparency: number) => {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${transparency})`;
}

const getContrastYIQ = (color: Array<number>) => {
  const r = color[0];
  const g = color[1];
  const b = color[2];
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
};

const getParentIndex = (node: HTMLElement, reverse: boolean = false) => {
  let childNodes = node.parentNode.childNodes;
  let index = 0;
  childNodes.forEach((child, i) => {
    if (child === node) index = i;
  })
  if (reverse) {
    return childNodes.length - index - 1;
  } else {
    return index;
  }
};

const isElementInViewport = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const isInViewport =
    rect.top >= 0 + viewPortDelta && rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) - viewPortDelta &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  return isInViewport;
};

const getElementParents = node => {
  const nodes = [node]
  for (; node; node = node.parentNode) {
    nodes.unshift(node)
  }
  return nodes
}

const commonAncestor = (node1: HTMLElement, node2: HTMLElement) => {
  const parents1 = getElementParents(node1)
  const parents2 = getElementParents(node2)

  if (parents1[0] != parents2[0]) throw "No common ancestor!"

  for (let i = 0; i < parents1.length; i++) {
    if (parents1[i] != parents2[i]) return parents1[i - 1]
  }
}

initFF();
