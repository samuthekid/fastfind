import * as findAndReplaceDOMText from "findandreplacedomtext";
import * as throttle from "lodash/throttle";
import * as debounce from "lodash/debounce";
import { ffStyle, colors } from "./styles";
import * as Utils from "./helpers";

const DEBUG_ON = false;
const FIXED_BUTTONS = false;
let EXTENSION_LOADED = false;

const SCROLL_THROTTLE_TIME = 10;
const ONCHANGE_MASTERFINDER_DEBOUNCE_TIME = 200;

const viewPortDelta = 20;
let currentColor = 0;
let pageHeight = Utils.getPageHeight();
let windowHeight = window.innerHeight;

const settings = {
  // KEYS
  selectKey: "f",
  removeKey: "d",
  nextElementKey: "r",
  nextInstanceKey: "e",
  wordBordersToggleKey: "b",
  caseSensitiveToggleKey: "c",

  // EFFECTS
  smoothScrolling: true, // CHECKED
  showRotatingArrow: false, // CHECKED
  keepElementCentered: false, // CHECKED

  // SIDE MAP
  showSideMap: true, // CHECKED
  showMapLabels: true, // CHECKED
  opaqueSideMap: false, // CHECKED
  mapButtonsOnTop: true, // CHECKED
  autoExpandSideMap: true, // CHECKED
  lightThemeSideMap: false, // CHECKED
  showNumberOfResults: true, // CHECKED

  // SETTINGS
  forceWordBorders: false, // CHECKED
  forceCaseSensitive: false, // CHECKED
  masterFinderEnabled: true, // CHECKED
  masterFinderOverride: true, // CHECKED
  scrollToNearestResult: true, //CHECKED
  scrollToResultAfterSearch: true // CHECKED
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
let masterSelection: FFinstance;
let masterDistances = [];
let masterIndex: number;
let masterFlag: boolean = true;
let masterCS: boolean = false;
let masterWB: boolean = false;

let handleMasterFinderDebouncedRef = null;
const masterFinder: HTMLElement = document.createElement("div");
const masterFinderWrapper: HTMLElement = document.createElement("div");

const repeatLogo: HTMLElement = document.createElement("img");
const repeatLogoWrapper: HTMLElement = document.createElement("div");

const selectionsMapWrapper: HTMLElement = document.createElement("div");
const selectionsMapScroll: HTMLElement = document.createElement("div");

// PIN BUTTON
const selectionsMapPin: HTMLElement = document.createElement("div");
const mapPin: HTMLElement = document.createElement("img");

// OPACITY BUTTON
const selectionsMapOpacity: HTMLElement = document.createElement("div");
const mapOpacity: HTMLElement = document.createElement("div");

// THEME BUTTON
const selectionsMapTheme: HTMLElement = document.createElement("div");
const mapTheme: HTMLElement = document.createElement("div");

// BUTTONS POSITION
const selectionsButtonsPosition: HTMLElement = document.createElement("div");
const buttonsPosition: HTMLElement = document.createElement("div");

const initFF = () => {
  if (EXTENSION_LOADED) return;
  EXTENSION_LOADED = true;

  const style = document.createElement("style");
  style.innerHTML = ffStyle;

  masterFinderWrapper.classList.add(
    "masterFinderWrapper",
    "disabled",
    "noAnim"
  );
  masterFinder.classList.add("masterFinder");
  masterFinder.setAttribute("contentEditable", "true");
  masterFinder.setAttribute("data-placeholder", "FAST FIND");
  handleMasterFinderDebouncedRef = debounce(
    handleMasterFinderDebounced,
    ONCHANGE_MASTERFINDER_DEBOUNCE_TIME
  );
  const masterFinderObserver = new MutationObserver(handleMasterFinder);
  const config = { subtree: true, characterData: true };
  masterFinderObserver.observe(masterFinder, config);
  masterFinder.onmouseover = masterFinder.onmouseout = (event: MouseEvent) => {
    requestAnimationFrame(() => {
      if (event.type === "mouseover")
        masterFinderWrapper.classList.remove("sleeping");
      else masterFinderWrapper.classList.add("sleeping");
    });
  };

  repeatLogo.setAttribute("src", chrome.extension.getURL("assets/repeat.png"));
  repeatLogo.classList.add("repeatLogo");
  repeatLogoWrapper.classList.add("repeatLogoWrapper");

  selectionsMapWrapper.classList.add("selectionsMapWrapper");

  if (FIXED_BUTTONS) selectionsMapWrapper.classList.add("fixedButtons");

  if (!settings.showSideMap) selectionsMapWrapper.classList.add("hidden");
  if (!settings.showMapLabels) selectionsMapWrapper.classList.add("noLabels");
  if (!settings.showNumberOfResults)
    selectionsMapWrapper.classList.add("noNumbers");
  if (settings.opaqueSideMap) selectionsMapWrapper.classList.add("opaque");
  if (settings.mapButtonsOnTop)
    selectionsMapWrapper.classList.add("buttonsOnTop");
  if (settings.lightThemeSideMap)
    selectionsMapWrapper.classList.add("lightTheme");
  if (settings.autoExpandSideMap) selectionsMapWrapper.classList.add("fixed");

  // PIN BUTTON
  selectionsMapPin.classList.add("selectionsMapButton", "selectionsMapPin");
  selectionsMapPin.onclick = () =>
    requestAnimationFrame(() => {
      selectionsMapWrapper.classList.toggle("fixed");
    });
  mapPin.setAttribute("src", chrome.extension.getURL("assets/pin.png"));
  mapPin.classList.add("mapPin");

  // OPACITY BUTTON
  selectionsMapOpacity.classList.add(
    "selectionsMapButton",
    "selectionsMapOpacity"
  );
  selectionsMapOpacity.onclick = () =>
    requestAnimationFrame(() => {
      selectionsMapWrapper.classList.toggle("opaque");
    });
  mapOpacity.classList.add("mapOpacity");

  // THEME BUTTON
  selectionsMapTheme.classList.add("selectionsMapButton", "selectionsMapTheme");
  selectionsMapTheme.onclick = () =>
    requestAnimationFrame(() => {
      selectionsMapWrapper.classList.toggle("lightTheme");
    });
  mapTheme.classList.add("mapTheme");

  // BUTTONS POSITION
  selectionsButtonsPosition.classList.add(
    "selectionsMapButton",
    "selectionsButtonsPosition"
  );
  selectionsButtonsPosition.onclick = () =>
    requestAnimationFrame(() => {
      selectionsMapWrapper.classList.toggle("buttonsOnTop");
    });
  buttonsPosition.classList.add("buttonsPosition");

  // SCROLL
  selectionsMapScroll.classList.add("selectionsMapScroll");

  requestAnimationFrame(() => {
    document.head.appendChild(style);

    masterFinderWrapper.appendChild(document.createElement("div"));
    masterFinderWrapper.appendChild(masterFinder);
    masterFinderWrapper.appendChild(document.createElement("div"));
    document.body.appendChild(masterFinderWrapper);

    repeatLogoWrapper.appendChild(repeatLogo);
    document.body.appendChild(repeatLogoWrapper);

    // PIN BUTTON
    selectionsMapPin.appendChild(mapPin);
    selectionsMapWrapper.appendChild(selectionsMapPin);

    // OPACITY BUTTON
    selectionsMapOpacity.appendChild(mapOpacity);
    selectionsMapWrapper.appendChild(selectionsMapOpacity);

    // THEME BUTTON
    selectionsMapTheme.appendChild(mapTheme);
    selectionsMapWrapper.appendChild(selectionsMapTheme);

    // BUTTONS POSITION
    selectionsButtonsPosition.appendChild(buttonsPosition);
    selectionsMapWrapper.appendChild(selectionsButtonsPosition);

    selectionsMapWrapper.appendChild(selectionsMapScroll);
    document.body.appendChild(selectionsMapWrapper);
  });

  windowHeight = window.innerHeight;

  // ON RESIZE
  window.addEventListener(
    "resize",
    throttle(() => {
      const newPageHeight = Utils.getPageHeight();
      const newWindowHeight = window.innerHeight;
      if (newPageHeight != pageHeight || newWindowHeight != windowHeight) {
        windowHeight = newWindowHeight;
        pageHeight = newPageHeight;
        redrawMinimapScroll();
        redrawMapIndicators();
      }
    }, SCROLL_THROTTLE_TIME)
  );

  // ON SCROLL
  window.addEventListener(
    "scroll",
    throttle(() => {
      redrawMinimapScroll();
      updateMasterFinderResultsPosition();
      setMasterFinderInfo();
    }, SCROLL_THROTTLE_TIME)
  );

  // ON KEY DOWN
  window.addEventListener("keydown", onKeyDown);
};

const handleMasterFinder = () => {
  removeMasterFinderHighlight();
  handleMasterFinderDebouncedRef();
};

const handleMasterFinderDebounced = () => {
  const query = masterFinder.textContent;
  if (!(query.length && query.trim().length)) return;
  createElement(query, null, masterCS, masterWB);
};

const removeMasterFinderHighlight = () => {
  masterFinderWrapper.classList.remove("noResults", "sleeping");
  requestAnimationFrame(() => {
    if (masterSelection && masterFlag) {
      masterFlag = false;
      removeElement(masterSelection);
    }
    masterSelection = null;
    masterIndex = null;
    updateMasterFinderResultsPosition();
    setMasterFinderInfo();
    masterFlag = true;
  });
};

const redrawMinimapScroll = () => {
  if (!selections.length && !masterSelection) return;
  requestAnimationFrame(() => {
    pageHeight = Utils.getPageHeight();
    const minHeight = 15;
    const scrollHeight = (window.innerHeight / pageHeight) * window.innerHeight;
    const finalHeight = parseFloat(
      Math.max(scrollHeight, minHeight).toFixed(3)
    );
    selectionsMapScroll.style.height = `${finalHeight}px`;
    const scrollToTop =
      document.documentElement.scrollTop || document.body.scrollTop || 0;
    let scrollDistance = (scrollToTop / pageHeight) * 100 - 0.04;
    if (scrollHeight < minHeight) {
      scrollDistance -= 0.3;
    }
    selectionsMapScroll.style.transform = `translateY(${scrollDistance.toFixed(
      3
    )}vh)`;
  });
};

const onKeyDown = (e: KeyboardEvent & { target: HTMLInputElement }) => {
  if (
    e.target !== masterFinder &&
    (e.target.contentEditable === "true" ||
      e.target.tagName.toLowerCase() === "input" ||
      e.target.tagName.toLowerCase() === "textarea")
  )
    return false;

  const key = e.code.startsWith("Key") ? e.code.charAt(3).toLowerCase() : null;
  const macOS = /(Mac)/i.test(navigator.platform);
  const selection = window.getSelection();
  let text = selection.toString();

  // MASTER FINDER IS ENABLED
  if (!masterFinderWrapper.classList.contains("disabled")) {
    if (e.key === "Escape") {
      // DISABLE MASTER FIND
      e.preventDefault();
      e.stopPropagation();
      window.getSelection().empty();
      removeMasterFinderHighlight();
      masterFinderWrapper.classList.add("disabled");
      setTimeout(() => {
        // @ts-ignore
        if (document.activeElement && document.activeElement.blur) {
          // @ts-ignore
          document.activeElement.blur();
        }
      }, 100);
      return;
    } else if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (!masterSelection || !masterSelection.elements.length) return;
      if (!e.shiftKey) cycleThroughMasterElements(1, null);
      else cycleThroughMasterElements(-1, null);
      return;
    } else if (e.altKey && key == settings.caseSensitiveToggleKey) {
      // toggle MASTER case sensitive
      e.preventDefault();
      e.stopPropagation();
      masterCS = !masterCS;
      handleMasterFinder();
      return;
    } else if (e.altKey && key == settings.wordBordersToggleKey) {
      // toggle MASTER word bounds
      e.preventDefault();
      e.stopPropagation();
      masterWB = !masterWB;
      handleMasterFinder();
      return;
    }
  }

  // MASTER FINDER IS DISABLED
  if (
    (key == settings.selectKey &&
      ((macOS && e.metaKey) || (!macOS && e.ctrlKey)) &&
      settings.masterFinderEnabled &&
      settings.masterFinderOverride) ||
    (key == settings.selectKey &&
      e.altKey &&
      settings.masterFinderEnabled &&
      !settings.masterFinderOverride)
  ) {
    // ENABLE MASTER FIND
    e.preventDefault();
    e.stopPropagation();
    masterFinderWrapper.classList.remove("noResults", "sleeping");
    if (masterFinderWrapper.classList.contains("disabled")) {
      masterFinderWrapper.classList.remove("noAnim", "disabled");
      handleMasterFinderDebounced();
    }
    setTimeout(() => {
      masterFinder.focus();
      setTimeout(() => {
        const sel = window.getSelection();
        if (masterFinder.firstChild)
          sel.setBaseAndExtent(
            masterFinder.firstChild,
            masterFinder.firstChild.textContent.length,
            masterFinder.firstChild,
            0
          );
      }, 5);
    }, 10);
    return;
  }

  if (e.target === masterFinder || e.metaKey || e.ctrlKey || e.altKey)
    return false;

  // NORMAL KEYS
  if (key == settings.selectKey) {
    // something is selected
    if (text && text.length && text.trim().length) {
      // No support for multi-line for now...
      const paragraphIndex = text.indexOf("\n");
      if (paragraphIndex != -1) {
        // has at least one \n
        if (paragraphIndex == text.length - 1) {
          // is at the end
          text = text.slice(0, -1); // remove it
        } else {
          return;
        }
      }

      if (!e.shiftKey) {
        // F
        createElement(text, selection, false, false);
      } else {
        // SHIFT F
        createElement(text, selection, true, true);
      }
      e.preventDefault();
      e.stopPropagation();
    } else {
      if (selections.length) {
        if (!e.shiftKey) {
          // F
          cycleThroughElements(1);
        } else {
          // SHIFT F
          cycleThroughElements(-1);
        }
        e.preventDefault();
        e.stopPropagation();
      }
    }
  } else if (selections.length && key == settings.removeKey) {
    if (!e.shiftKey) {
      // D
      removeSelectedOrLastElement();
    } else {
      // SHIFT D
      removeAllElements();
    }
    e.preventDefault();
    e.stopPropagation();
  } else if (selections.length && key == settings.nextElementKey) {
    if (!e.shiftKey) {
      // R
      cycleThroughAllElements(1);
    } else {
      // SHIFT R
      cycleThroughAllElements(-1);
    }
    e.preventDefault();
    e.stopPropagation();
  } else if (selections.length && key == settings.nextInstanceKey) {
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

const cycleThroughMasterElements = (direction: number, element: any) => {
  let newIndex = masterIndex + direction;
  if (element) newIndex = masterSelection.elements.indexOf(element);
  if (newIndex > masterSelection.elements.length - 1) {
    newIndex = 0;
    rotateLogo();
  } else if (newIndex < 0) {
    newIndex = masterSelection.elements.length - 1;
    rotateLogo();
  }
  masterSelection.elements[masterIndex].active = false;
  masterSelection.elements[masterIndex].mapIndicator.classList.remove(
    "selected"
  );
  masterSelection.elements[masterIndex].portions.forEach(p =>
    p.classList.remove("selected")
  );
  masterSelection.elements[newIndex].active = true;
  masterSelection.elements[newIndex].mapIndicator.classList.add("selected");
  masterSelection.elements[newIndex].portions.forEach(p =>
    p.classList.add("selected")
  );
  masterIndex = newIndex;

  const elem = masterSelection.elements[newIndex].portions[0];
  if (
    settings.keepElementCentered ||
    !Utils.isElementInViewport(elem, viewPortDelta)
  ) {
    scrollElementToCenter(elem);
  }
  setMasterFinderInfo();
};

const cycleThroughInstances = (direction: number) => {
  const { instance, element } = getSelectedStructures();
  if (!instance || !element) return false;
  let nextIndex = selections.indexOf(instance) + direction;
  if (nextIndex >= selections.length) {
    nextIndex = 0;
  } else if (nextIndex < 0) {
    nextIndex = selections.length - 1;
  }
  const nextActive = selections[nextIndex];
  const selectedElement = nextActive.elements.find(elem => elem.active);
  selectElement(nextActive, selectedElement);
};

const cycleThroughElements = (direction: number) => {
  const { instance, element } = getSelectedStructures();
  if (!instance || !element) return false;
  const { elements } = instance;
  let nextIndex = elements.indexOf(element) + direction;
  if (nextIndex >= elements.length) {
    nextIndex = 0;
    rotateLogo();
  } else if (nextIndex < 0) {
    nextIndex = elements.length - 1;
    rotateLogo();
  }
  const nextActive = elements[nextIndex];
  selectElement(instance, nextActive);
};

const cycleThroughAllElements = (direction: number) => {
  // select all single and initial ffelems
  const ffelems = document.querySelectorAll(".ffelem, .ffelemStart");
  let indexOnTree: number;
  for (let i = 0; i < ffelems.length; i++) {
    if (ffelems[i].classList.contains("selected")) {
      indexOnTree = i;
      break;
    }
  }
  let target: Element;
  if (direction === 1) {
    if (indexOnTree === ffelems.length - 1) {
      target = ffelems[0];
      rotateLogo();
    } else target = ffelems[indexOnTree + 1];
  } else {
    if (indexOnTree === 0) {
      target = ffelems[ffelems.length - 1];
      rotateLogo();
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
  selectElement(targetInstance, targetElement);
};

const getSelectedStructures = () => {
  const instance = selections.find(instance => instance.active) || null;
  const element = instance
    ? instance.elements.find(element => element.active)
    : null;
  return { element, instance };
};

const unselectElement = () => {
  selections.forEach(selection => {
    if (selection.active) {
      selection.active = false;
      requestAnimationFrame(() => {
        selection.mapWrapper.classList.remove("selected");
      });
      selection.elements.forEach(elem => {
        if (elem.active) {
          requestAnimationFrame(() => {
            elem.portions.forEach(p => p.classList.remove("selected"));
            elem.mapIndicator.classList.remove("selected");
          });
        } else {
          requestAnimationFrame(() => {
            elem.portions.forEach(p => p.classList.remove("selectedClass"));
          });
        }
      });
    }
  });
};

const selectElement = (instance, element) => {
  if (!element || !instance) return false;
  unselectElement();

  instance.active = true;
  requestAnimationFrame(() => {
    instance.mapWrapper.classList.add("selected");
  });
  instance.elements.forEach(elem => {
    if (elem === element) {
      elem.active = true;
      requestAnimationFrame(() => {
        elem.portions.forEach(p => p.classList.add("selected"));
        elem.mapIndicator.classList.add("selected");
      });
      if (
        settings.keepElementCentered ||
        !Utils.isElementInViewport(elem.portions[0], viewPortDelta)
      ) {
        scrollElementToCenter(elem.portions[0]);
      }
    } else {
      elem.active = false;
      requestAnimationFrame(() => {
        elem.portions.forEach(p => p.classList.add("selectedClass"));
      });
    }
  });
};

const removeElement = (selection: FFinstance) => {
  selection.elements.forEach(element => {
    element.mapIndicator.remove();
    element.portions.forEach((portion: HTMLElement) =>
      Utils.replaceChildrenWithOriginalContent(portion)
    );
  });
  selection.mapWrapper.remove();
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
    selectElement(nextInstance, selectedElement);
  }
};

const removeAllElements = () => {
  selections.forEach(removeElement);
  selections = [];
};

//
// Create Element
//
const createElement = (
  text: string, // string containing the selection text
  selection: Selection, // (optional) window selection object
  forceCS: boolean, // force case sensitive
  forceWB: boolean // force word bound
) => {
  // will save the total number of active elements - used for debugging
  let activeElements = 0;
  // will be the ref node to calculate the active element
  let activeSelectionNode = null;

  if (selection) {
    const selectionRange = selection.getRangeAt(0);
    activeSelectionNode = document.createElement("ffelem");
    if (selectionRange.startContainer == selectionRange.endContainer) {
      selectionRange.surroundContents(activeSelectionNode);
    } else {
      const newRange = document.createRange();
      newRange.selectNode(selectionRange.endContainer);
      newRange.surroundContents(activeSelectionNode);
      newRange.collapse();
    }
  } else {
    // flag used to make sure all the old elements
    // are removed before adding new ones
    if (!masterFlag) {
      setTimeout(() => {
        createElement(text, null, forceCS, forceWB);
      }, 5);
      return;
    }
  }
  const scrollToTop =
    document.documentElement.scrollTop || document.body.scrollTop || 0;

  let color: Array<number>;
  let contrast;
  if (selection) {
    if (currentColor < colors.length) {
      color = colors[currentColor++];
    } else {
      color = Utils.getRandomColor();
    }
    contrast = Utils.getContrastYIQ(color);
  } else {
    color = [254, 255, 3];
    contrast = "black";
  }
  const currentElements: FFelement[] = [];
  let portions: HTMLElement[] = [];
  let active = false;
  let someActive = false;

  let regexFinder = null;
  const excapedText = text.replace(
    /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
    "\\$&"
  );
  const wordBorders = forceWB || settings.forceWordBorders;
  const wordBordersHandler = wordBorders ? "\\b" : "";
  const caseSensitive = forceCS || settings.forceCaseSensitive;
  const caseSensitiveHandler = caseSensitive ? "g" : "gi";
  try {
    regexFinder = RegExp(
      `${wordBordersHandler}${excapedText}${wordBordersHandler}`,
      caseSensitiveHandler
    );
  } catch (error) {
    if (DEBUG_ON) {
      console.error(error);
      debugger;
    }
    return;
  }

  // THIS IS THE KEY - will find all the portions of the elements in the DOM
  const finder = findAndReplaceDOMText(document.body, {
    preset: "prose",
    find: regexFinder,
    filterElements: elem =>
      !Utils.getElementParents(elem).includes(masterFinderWrapper),
    replace: portion => {
      // if the element is inside a menu, doesn't add a ffelem
      const elementIsVisible = !!(
        portion.node.parentElement.offsetWidth ||
        portion.node.parentElement.offsetHeight ||
        portion.node.parentElement.getClientRects().length
      );

      if (!elementIsVisible) return portion.text;

      const div = document.createElement("ffelem") as HTMLDivElement;
      portions.push(div);
      requestAnimationFrame(() => {
        if (selection) {
          // puts "normal", start, middle or end classes to the portions
          if (portion.index === 0 && portion.isEnd) div.classList.add("ffelem");
          else if (portion.index === 0) div.classList.add("ffelemStart");
          else if (portion.isEnd) div.classList.add("ffelemEnd");
          else div.classList.add("ffelemMiddle");
          div.style.backgroundColor = Utils.renderColor(color, 1.0);
          div.style.color = contrast;
        } else {
          div.classList.add("ffelemMaster");
        }
        // Does innerText works here? TODO
        div.innerHTML = portion.text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      });

      if (portion.isEnd) {
        // if last one, save all the data and reset vars
        if (selection) {
          active =
            active ||
            Utils.getElementParents(portion.node).includes(activeSelectionNode);
          someActive = active || someActive;
          if (active) activeElements++;
        }
        const element: FFelement = { portions, active, mapIndicator: null };
        currentElements.push(element);
        portions = [];
        active = false;
      }

      return div;
    }
  });
  // END OF FINDER

  if (selection) {
    // remove this ref node from the tree
    requestAnimationFrame(() =>
      Utils.replaceChildrenWithOriginalContent(activeSelectionNode)
    );
  }
  if (
    DEBUG_ON &&
    currentElements.length &&
    (activeElements === 0 || activeElements > 1)
  ) {
    console.log("Active elements:", activeElements);
    console.log("Elements:", currentElements);
    debugger;
  }

  if (!currentElements.length) {
    // no results => reset and return
    if (!selection) {
      removeMasterFinderHighlight();
      masterFinderWrapper.classList.add("noResults");
    }
    return false;
  }

  if (selection) {
    // clear selected element
    // we have a new one!
    unselectElement();
    window.getSelection().empty();
  }

  // Side map (will include indicators and label)
  const mapWrapper = document.createElement("div");
  mapWrapper.classList.add("mapWrapper");
  mapWrapper.classList.add(selection ? "selected" : "master");

  const currentSelection: FFinstance = {
    finder,
    active: true,
    elements: currentElements,
    mapWrapper: mapWrapper,
    sanitizedText: text
  };

  currentElements.forEach(element => {
    const { portions, active } = element;
    // create indicator
    const indicator = document.createElement("div");
    indicator.classList.add("mapIndicator");
    if (active) indicator.classList.add("selected");

    if (!selection) {
      // INDICATOR - ON CLICK
      indicator.onclick = () => cycleThroughMasterElements(0, element);
    } else {
      // INDICATOR - ON CLICK - ON MOUSE OVER - ON MOUSE OUT
      indicator.onclick = () => selectElement(currentSelection, element);
      indicator.onmouseover = indicator.onmouseout = (event: MouseEvent) =>
        requestAnimationFrame(() => {
          element.portions.forEach(portion =>
            event.type === "mouseover"
              ? portion.classList.add("hovered")
              : portion.classList.remove("hovered")
          );
        });

      portions.forEach(portion => {
        // PORTION - ON CLICK - ON MOUSE OVER - ON MOUSE OUT
        portion.onclick = () => selectElement(currentSelection, element);
        portion.onmouseover = portion.onmouseout = (event: MouseEvent) => {
          requestAnimationFrame(() => {
            if (event.type === "mouseover") {
              indicator.classList.add("hovered");
              element.portions.forEach(p => p.classList.add("hovered"));
            } else {
              indicator.classList.remove("hovered");
              element.portions.forEach(p => p.classList.remove("hovered"));
            }
          });
        };

        requestAnimationFrame(() => {
          if (active) portion.classList.add("selected");
          else if (someActive) portion.classList.add("selectedClass");
        });
      });
    }

    requestAnimationFrame(() => {
      const position = Utils.getRatioPositionRelativeToDocument(
        element.portions[0]
      );
      indicator.style.transform = `translateY(${position}vh)`;
      if (selection)
        indicator.style.backgroundColor = Utils.renderColor(color, 0.8);
      mapWrapper.insertBefore(indicator, mapWrapper.firstChild);
    });
    element.mapIndicator = indicator;
  });

  // create map label
  const label = document.createElement("div");
  label.classList.add("mapLabel");
  label.style.background = `linear-gradient(to bottom,
${Utils.renderColor(color, 1.0)} 0%,
${Utils.renderColor(color, 0.8)} 10%,
${Utils.renderColor(color, 0.6)} 40%,
#00000000 50%,#00000000 100%)`;

  // redraw scrollbar
  redrawMinimapScroll();

  if (selection) {
    label.setAttribute("data-number", ` (${currentElements.length})`);
    label.setAttribute(
      "data-label",
      `${text} ${wordBorders ? "|| " : ""}${caseSensitive ? "Aa" : ""}`
    );

    selections.push(currentSelection);

    requestAnimationFrame(() => {
      currentSelection.mapWrapper.appendChild(label);
      // If there is a masterFinder side map
      if (masterSelection)
        selectionsMapWrapper.insertBefore(
          mapWrapper,
          masterSelection.mapWrapper
        );
      else selectionsMapWrapper.appendChild(mapWrapper);
    });
  } else {
    masterSelection = currentSelection;
    updateMasterFinderResultsPosition();

    if (settings.scrollToNearestResult) {
      // find the nearest result from viewport center
      let minDistance;
      currentSelection.elements.forEach((_, index) => {
        let dist = Math.abs(masterDistances[index].distance);
        if (!minDistance || dist < minDistance) {
          minDistance = dist;
          masterIndex = index;
        }
      });
    } else {
      // otherwise is the first in page
      masterIndex = 0;
    }

    // elem is the selected element
    const elem = currentSelection.elements[masterIndex];
    elem.active = true;
    requestAnimationFrame(() => {
      setMasterFinderInfo();
      masterFinderWrapper.classList.add("sleeping");
      elem.mapIndicator.classList.add("selected");
      elem.portions.forEach(portion => portion.classList.add("selected"));
      currentSelection.mapWrapper.appendChild(label);
      selectionsMapWrapper.appendChild(mapWrapper);

      if (
        !masterDistances[masterIndex].isInViewport &&
        settings.scrollToResultAfterSearch
      ) {
        scrollElementToCenter(elem.portions[0]);
      }
    });
  }

  document.documentElement.scrollTop &&
    document.documentElement.scrollTo({ top: scrollToTop });
  document.body.scrollTop && document.body.scrollTo({ top: scrollToTop });
};

const redrawMapIndicators = () => {
  selections.forEach(instance => {
    instance.elements.forEach(element => {
      const elementPosition =
        element.portions[0].getBoundingClientRect().top +
        (document.documentElement.scrollTop || document.body.scrollTop || 0);
      requestAnimationFrame(() => {
        element.mapIndicator.style.transform = `translateY(${(elementPosition /
          pageHeight) *
          100}vh)`;
      });
    });
  });
};

const rotateLogo = () => {
  if (!settings.showRotatingArrow) return;
  repeatLogo.classList.add("active");
  repeatLogoWrapper.classList.add("active");
  window.setTimeout(() => {
    repeatLogo.classList.remove("active");
    repeatLogoWrapper.classList.remove("active");
  }, 810);
};

const setMasterFinderInfo = () => {
  let value = "";
  if (masterWB) value += "||\xa0\xa0\xa0";
  if (masterCS) value += "Aa\xa0\xa0\xa0";
  const selElem = masterIndex !== null ? masterIndex : null;
  let elemsPositions = { above: 0, visible: 0, below: 0 };
  let totalElems = 0;
  if (masterSelection && masterSelection.elements.length) {
    totalElems = masterSelection.elements.length || 0;
    elemsPositions = masterDistances.reduce((prev, curr) => {
      return {
        ...prev,
        above: prev.above + (curr.isAbove ? 1 : 0),
        visible: prev.visible + (!curr.isAbove && curr.isInViewport ? 1 : 0),
        below: prev.below + (!curr.isAbove && !curr.isInViewport ? 1 : 0)
      };
    }, elemsPositions);
    value +=
      elemsPositions.above +
      " ▲\xa0" +
      elemsPositions.visible +
      " ⧉\xa0\xa0" +
      elemsPositions.below +
      " ▼\xa0\xa0\xa0";
  }
  value += (selElem && isNaN(selElem) ? 0 : selElem + 1) + " / " + totalElems;
  masterFinder.setAttribute("data-info", value);
};

const updateMasterFinderResultsPosition = () => {
  masterDistances = [];
  if (!masterSelection || masterSelection.elements.length === 0) return;
  masterSelection.elements.forEach(elem => {
    const distance = Utils.getDistanceRelativeToViewport(elem.portions[0]);
    const isVisible = Utils.isElementInViewport(elem.portions[0], 0);
    masterDistances.push({
      distance,
      isAbove: distance < 0 && !isVisible,
      isInViewport: isVisible
    });
  });
};

const scrollElementToCenter = (elem: HTMLElement) => {
  const scrollBehaviour: any = settings.smoothScrolling ? "smooth" : "instant";
  const scrollSettings: ScrollIntoViewOptions = {
    block: "center",
    behavior: scrollBehaviour
  };
  elem.scrollIntoView(scrollSettings);
};

window.onload = initFF;
