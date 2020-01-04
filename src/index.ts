import * as findAndReplaceDOMText from 'findandreplacedomtext';
import * as throttle from 'lodash/throttle';
import { ffStyle, colors } from './style';

const getPageHeight = () => {
  return Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
};

// TODO:
// - only animate ffelem AFTER scroll is over
// - html text "breaks" after removing elements
// - typing is missing in some places

const DEBUG_ON = false;
const AUTO_PIN_MAP = false;

let viewPortDelta = 20;
let currentColor = 0;
let pageHeight = getPageHeight();
let windowHeight = window.innerHeight;

let settings = {
  selectKey: 'f',
  removeKey: 'd',
  nextElementKey: 'r',
  nextInstanceKey: 'e',
  showRotatingArrow: true,
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
let selectionsMapScroll: HTMLElement = document.createElement('div');
let mapPin: HTMLElement = document.createElement('img');

const initFF = () => {
  const style = document.createElement('style');
  style.innerHTML = ffStyle;

  repeatLogo.setAttribute('src', chrome.extension.getURL('assets/repeat.png'));
  repeatLogo.className = 'repeatLogo';
  repeatLogoWrapper.className = 'repeatLogoWrapper';

  selectionsMapWrapper.className = 'selectionsMapWrapper';

  selectionsMapPin.className = 'selectionsMapPin';
  selectionsMapPin.onclick = () => requestAnimationFrame(() => {
    selectionsMapPin.classList.toggle('fixed');
    selectionsMapWrapper.classList.toggle('fixed');
  });
  if (AUTO_PIN_MAP) {
    selectionsMapPin.classList.toggle('fixed');
    selectionsMapWrapper.classList.toggle('fixed');
  }

  selectionsMapScroll.className = "selectionsMapScroll";
  mapPin.setAttribute('src', chrome.extension.getURL('assets/pin.png'));
  mapPin.className = 'mapPin';
  
  requestAnimationFrame(() => {
    document.head.appendChild(style);
    repeatLogoWrapper.appendChild(repeatLogo);
    document.body.appendChild(repeatLogoWrapper);
    document.body.appendChild(selectionsMapWrapper);
    selectionsMapWrapper.appendChild(selectionsMapPin);
    selectionsMapPin.appendChild(mapPin);
    selectionsMapWrapper.appendChild(selectionsMapScroll);
  });

  windowHeight = window.innerHeight;
  window.addEventListener('resize', throttle(
    () => {
      let newPageHeight = getPageHeight();
      let newWindowHeight = window.innerHeight;
      if (newPageHeight != pageHeight ||
          newWindowHeight != windowHeight) {
        windowHeight = newWindowHeight;
        pageHeight = newPageHeight;
        redrawMinimapScroll(true);
        redrawMapIndicators();
      }
    }, 200)
  );

  window.addEventListener('scroll', () => redrawMinimapScroll(false));
  document.body.addEventListener('keydown', onKeyDown);
};

const redrawMinimapScroll = (rescale: boolean) => {
  if (!selections.length && !rescale) return;
  requestAnimationFrame(() => {
    pageHeight = getPageHeight();
    const minHeight = 15;
    const scrollHeight = (window.innerHeight / pageHeight) * window.innerHeight;
    const finalHeight = parseFloat(Math.max(scrollHeight, minHeight).toFixed(3));
    if(rescale)
      selectionsMapScroll.style.height = `${finalHeight}px`;
    const scrollToTop = (document.documentElement.scrollTop || document.body.scrollTop || 0);
    let scrollDistance = scrollToTop / pageHeight * 100 - 0.04;
    if (scrollHeight < minHeight) {
      scrollDistance -= 0.3;
    }
    selectionsMapScroll.style.transform =
      `translateY(${scrollDistance.toFixed(3)}vh)`;
  })
};

const onKeyDown = (e: KeyboardEvent & { target: HTMLInputElement }) => {
  if (
    e.target.contentEditable === 'true' ||
    e.target.tagName.toLowerCase() === 'input' ||
    e.target.tagName.toLowerCase() === 'textarea' ||
    e.metaKey)
    return false;

  const selection = window.getSelection();
  const text = selection.toString();

  if (e.key === settings.selectKey || e.key === settings.selectKey.toUpperCase()) {
    if (!e.shiftKey) {
      // F
      if (text && text.length) {
        // something is selected
        if (
          !text.trim().length ||
          (text.indexOf('\n') != text.length - 1 && text.indexOf('\n') != -1)
          ) // No support for multi-line for now...
          return;
        createElement(text, selection);
        e.preventDefault();
        e.stopPropagation();
      } else {
        if (selections.length) {
          cycleThroughElements(1);
          e.preventDefault();
          e.stopPropagation();
        }
      }
    } else {
      // SHIFT F
      if (selections.length) {
        cycleThroughElements(-1);
        e.preventDefault();
        e.stopPropagation();
      }
    }
  } else if (selections.length &&
    e.key === settings.removeKey || e.key === settings.removeKey.toUpperCase()) {
    if (!e.shiftKey) {
      // D
      removeSelectedOrLastElement();
    } else {
      // SHIFT D
      removeAllElements();
    }
    e.preventDefault();
    e.stopPropagation();
  } else if (selections.length &&
    e.key === settings.nextElementKey || e.key === settings.nextElementKey.toUpperCase()) {
    if (!e.shiftKey) {
      // R
      cycleThroughAllElements(1);
    } else {
      // SHIFT R
      cycleThroughAllElements(-1);
    }
    e.preventDefault();
    e.stopPropagation();
  } else if (selections.length &&
    e.key === settings.nextInstanceKey || e.key === settings.nextInstanceKey.toUpperCase()) {
    if (!e.shiftKey) {
      // E
      cycleThroughInstances(1);
    } else {
      // SHIFT E
      cycleThroughInstances(-1);
    }
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

const cycleThroughAllElements = (direction: number) => {
  // select all single and initial ffelems
  const ffelems = document.querySelectorAll('.ffelem, .ffelemStart');
  let indexOnTree: number;
  for (let i = 0; i < ffelems.length; i++) {
    if (ffelems[i].classList.contains('selected')) {
      indexOnTree = i;
      break;
    }
  }
  let target: Element;
  if (direction === 1) {
    if (indexOnTree === ffelems.length - 1) {
      target = ffelems[0];
      settings.showRotatingArrow && rotateLogo();
    } else target = ffelems[indexOnTree + 1];
  } else {
    if (indexOnTree === 0) {
      target = ffelems[ffelems.length - 1];
      settings.showRotatingArrow && rotateLogo();
    } else target = ffelems[indexOnTree - 1];
  }
  let targetInstance: FFinstance, targetElement: FFelement;
  selections.find(selection => {
    selection.elements.find(element => {
      element.portions.find(portion => {
        if (portion == target) {
          targetInstance = selection;
          targetElement = element;
          return true;
        }
      });
      if (targetElement) return true;
    });
    if (targetElement) return true;
  });
  selectElement(targetInstance, targetElement, true);
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

const createElement = (text: string, selection: Selection) => {
  let activeElements = 0;
  const selectionRange = selection.getRangeAt(0);
  let activeSelectionNode = document.createElement('ffelem');
  if (selectionRange.startContainer == selectionRange.endContainer) {
    selectionRange.surroundContents(activeSelectionNode);
  } else {
    const newRange = document.createRange();
    newRange.selectNode(selectionRange.endContainer);
    newRange.surroundContents(activeSelectionNode);
    newRange.collapse();
  }
  const scrollToTop = document.documentElement.scrollTop || document.body.scrollTop || 0;

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

  try {
    regexFinder = RegExp(excapedText, settings.matchCaseSensitive ? 'g' : 'gi');
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

      if (elementIsVisible) {
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
          active = active || getElementParents(portion.node).includes(activeSelectionNode);
          someActive = active || someActive;
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
  requestAnimationFrame(() => {
    while(activeSelectionNode.childNodes.length)
      activeSelectionNode.parentNode.insertBefore(activeSelectionNode.childNodes[0], activeSelectionNode);
    activeSelectionNode.parentNode.removeChild(activeSelectionNode);
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
    requestAnimationFrame(() => {
      pageHeight = getPageHeight();
      let elementPosition =
        element.portions[0].getBoundingClientRect().top +
        (document.documentElement.scrollTop || document.body.scrollTop || 0);
      indicator.style.transform = `translateY(${elementPosition / pageHeight * 100}vh)`;
      indicator.style.backgroundColor = renderColor(color, 0.8);
      mapWrapper.insertBefore(indicator, mapWrapper.firstChild);
    });
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
    currentSelection.mapWrapper.appendChild(label);
    selectionsMapWrapper.appendChild(mapWrapper);
  });

  if (!selections.length) redrawMinimapScroll(true);
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
      requestAnimationFrame(() => {
        element.mapIndicator.style.transform = `translateY(${elementPosition / pageHeight * 100}vh)`;
      });
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

window.onload = initFF;
