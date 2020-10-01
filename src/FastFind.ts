import * as findAndReplaceDOMText from "findandreplacedomtext";
import * as throttle from "lodash/throttle";
import * as debounce from "lodash/debounce";
import { ffBodyStyles, ffElementStyles, colors } from "./styles";
import * as Utils from "./helpers";

const DEBUG_ON = false;
const FIXED_BUTTONS = false;
let EXTENSION_LOADED = false;

const SCROLL_THROTTLE_TIME = 10;
const ONCHANGE_MASTERFINDER_DEBOUNCE_TIME = 300;

const viewPortDelta = 20;
let currentColor = 0;
let pageHeight = Utils.getPageHeight();
let windowHeight = window.innerHeight;

let settings = null;

// Interfaces
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

// SELF SCRIPT
let selfScript = null;

// MAIN ARRAY
let selections: FFinstance[] = [];

// MASTER FINDER STUFF
let masterSelection: FFinstance;
let masterDistances = [];
let masterIndex: number;
let masterFlag: boolean = true;
let masterCS: boolean = false;
let masterWB: boolean = false;

// Master Finder
let handleMasterFinderDebouncedRef = null;
const masterFinder: HTMLInputElement = document.createElement("input");
const masterFinderLabel: HTMLLabelElement = document.createElement("label");
const masterFinderWrapper: HTMLElement = document.createElement("div");

// Repeat Logo
const repeatLogo: HTMLElement = document.createElement("img");
const repeatLogoWrapper: HTMLElement = document.createElement("div");

// Side Map
const selectionsMapWrapper: HTMLElement = document.createElement("div");
const selectionsMapScroll: HTMLElement = document.createElement("div");

// Pin Button
const selectionsMapPin: HTMLElement = document.createElement("div");
const mapPin: HTMLElement = document.createElement("img");

// Opacity Button
const selectionsMapOpacity: HTMLElement = document.createElement("div");
const mapOpacity: HTMLElement = document.createElement("div");

// Theme Button
const selectionsMapTheme: HTMLElement = document.createElement("div");
const mapTheme: HTMLElement = document.createElement("div");

// Buttons Position
const selectionsButtonsPosition: HTMLElement = document.createElement("div");
const buttonsPosition: HTMLElement = document.createElement("div");

class FastFindWrapper extends HTMLElement {
  handleMasterFinder = () => {
    this.removeMasterFinderHighlight();
    handleMasterFinderDebouncedRef();
  };

  handleMasterFinderDebounced = () => {
    const query = masterFinder.value.trim();
    if (query.length < 3) return;
    this.createElement(query, null, masterCS, masterWB);
  };

  removeMasterFinderHighlight = () => {
    requestAnimationFrame(() => {
      masterFinderWrapper.classList.remove("noResults", "sleeping");
      if (masterSelection && masterFlag) {
        masterFlag = false;
        this.removeElement(masterSelection);
      }
      masterSelection = null;
      masterIndex = null;
      this.updateMasterFinderResultsPosition();
      this.setMasterFinderInfo();
      masterFlag = true;
    });
  };

  redrawMinimapScroll = () => {
    if (!selections.length && !masterSelection) return;
    requestAnimationFrame(() => {
      pageHeight = Utils.getPageHeight();
      const minHeight = 15;
      const scrollHeight =
        (window.innerHeight / pageHeight) * window.innerHeight;
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

  transformFFElement = () => {
    const { color, contrast } = this.getColorAndContrast(true);
    const selectionRef = masterSelection;
    let futureActiveElement = null;

    const label = document.createElement("div");
    label.classList.add("mapLabel");
    label.style.background = `linear-gradient(to bottom,
  ${Utils.renderColor(color, 1.0)} 0%,
  ${Utils.renderColor(color, 0.8)} 10%,
  ${Utils.renderColor(color, 0.6)} 40%,
  #00000000 50%,#00000000 100%)`;
    label.setAttribute("data-number", ` (${masterSelection.elements.length})`);
    label.setAttribute(
      "data-label",
      `${masterSelection.sanitizedText} ${masterWB ? "|| " : ""}${
        masterCS ? "Aa" : ""
      }`
    );

    requestAnimationFrame(() => {
      masterSelection.elements.forEach(element => {
        const { active, portions, mapIndicator } = element;
        if (active) futureActiveElement = element;
        portions.forEach((portion, index) => {
          portion.classList.remove("ffelemMaster");
          portion.style.backgroundColor = Utils.renderColor(color, 1.0);
          portion.style.color = contrast;
          if (portions.length === 1) portion.classList.add("ffelem");
          else if (index === 0) portion.classList.add("ffelemStart");
          else if (index === portions.length - 1)
            portion.classList.add("ffelemEnd");
          else portion.classList.add("ffelemMiddle");

          // PORTION - ON CLICK - ON MOUSE OVER - ON MOUSE OUT
          portion.onclick = () =>
            this.selectElement(selectionRef, element, false);
          portion.onmouseover = portion.onmouseout = (event: MouseEvent) => {
            if (event.type === "mouseover") {
              mapIndicator.classList.add("hovered");
              portions.forEach(p => p.classList.add("hovered"));
            } else {
              mapIndicator.classList.remove("hovered");
              portions.forEach(p => p.classList.remove("hovered"));
            }
          };
        });
        // INDICATOR - ON CLICK - ON MOUSE OVER - ON MOUSE OUT
        mapIndicator.onclick = () =>
          this.selectElement(selectionRef, element, false);
        mapIndicator.onmouseover = mapIndicator.onmouseout = (
          event: MouseEvent
        ) =>
          portions.forEach(portion =>
            event.type === "mouseover"
              ? portion.classList.add("hovered")
              : portion.classList.remove("hovered")
          );
        mapIndicator.style.backgroundColor = Utils.renderColor(color, 0.9);
      });
      masterSelection.mapWrapper.classList.remove("master");
      masterSelection.mapWrapper.removeChild(
        masterSelection.mapWrapper.lastChild
      );
      masterSelection.mapWrapper.appendChild(label);
      masterFinderWrapper.classList.add("disabled");
      masterFinderWrapper.classList.remove("noResults", "sleeping");
      masterFinder.value = '';
      setTimeout(() => {
        // @ts-ignore
        if (document.activeElement && document.activeElement.blur) {
          // @ts-ignore
          document.activeElement.blur();
        }
      }, 100);

      selections.push(masterSelection);
      this.selectElement(masterSelection, futureActiveElement, true);
      masterSelection = null;
      masterIndex = null;
      this.updateMasterFinderResultsPosition();
      this.setMasterFinderInfo();
    });
  };

  onKeyDownMasterFinder = (e: KeyboardEvent & { target: HTMLInputElement }) => {
    const key = e.code.startsWith("Key")
      ? e.code.charAt(3).toLowerCase()
      : null;

    // MASTER FINDER IS ENABLED
    if (!masterFinderWrapper.classList.contains("disabled")) {
      if (e.key === "Escape") {
        // DISABLE MASTER FIND
        window.getSelection().empty();
        this.removeMasterFinderHighlight();
        masterFinderWrapper.classList.add("disabled");
        setTimeout(() => {
          // @ts-ignore
          if (document.activeElement && document.activeElement.blur) {
            // @ts-ignore
            document.activeElement.blur();
          }
        }, 100);
      } else if (e.key === "Enter") {
        if (!masterSelection || !masterSelection.elements.length) return;
        if (e.ctrlKey || e.metaKey) {
          this.transformFFElement();
          Utils.eventBlocker(e);
          return;
        }
        if (!e.shiftKey) this.cycleThroughMasterElements(1, null);
        else this.cycleThroughMasterElements(-1, null);
      } else if (e.altKey && key == settings.caseSensitiveToggleKey) {
        // toggle MASTER case sensitive
        masterCS = !masterCS;
        e.preventDefault();
        this.handleMasterFinder();
      } else if (e.altKey && key == settings.wordBordersToggleKey) {
        // toggle MASTER word bounds
        masterWB = !masterWB;
        e.preventDefault();
        this.handleMasterFinder();
      }
      Utils.eventBlocker(e);
      return;
    }
  }

  onKeyDown = (e: KeyboardEvent & { target: HTMLInputElement }) => {
    if (
      e.target !== FastFindWrapperElem &&
      (e.target.contentEditable === "true" ||
        e.target.tagName.toLowerCase() === "input" ||
        e.target.tagName.toLowerCase() === "textarea")
    )
      return false;

    if (!masterFinderWrapper.classList.contains("disabled"))
      this.onKeyDownMasterFinder(e);

    const key = e.code.startsWith("Key")
      ? e.code.charAt(3).toLowerCase()
      : null;
    const macOS = /(Mac)/i.test(navigator.platform);
    const selection = window.getSelection();
    let text = selection.toString();

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
        this.handleMasterFinderDebounced();
      }
      masterFinder.select();
      return;
    }

    if (e.target === FastFindWrapperElem || e.metaKey || e.ctrlKey || e.altKey)
      return false;

    // NORMAL KEYS
    if (key == settings.selectKey) {
      // something is selected
      if (text && text.trim().length) {
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
          this.createElement(text, selection, settings.forceCaseSensitive, settings.forceWordBorders);
        } else {
          // SHIFT F
          this.createElement(text, selection, true, true);
        }
        e.preventDefault();
        e.stopPropagation();
      } else {
        if (selections.length) {
          if (!e.shiftKey) {
            // F
            this.cycleThroughElements(1);
          } else {
            // SHIFT F
            this.cycleThroughElements(-1);
          }
          e.preventDefault();
          e.stopPropagation();
        }
      }
    } else if (selections.length && key == settings.removeKey) {
      if (!e.shiftKey) {
        // D
        this.removeSelectedOrLastElement();
      } else {
        // SHIFT D
        this.removeAllElements();
      }
      e.preventDefault();
      e.stopPropagation();
    } else if (selections.length && key == settings.nextElementKey) {
      if (!e.shiftKey) {
        // R
        this.cycleThroughAllElements(1);
      } else {
        // SHIFT R
        this.cycleThroughAllElements(-1);
      }
      e.preventDefault();
      e.stopPropagation();
    } else if (selections.length && key == settings.nextInstanceKey) {
      if (!e.shiftKey) {
        // E
        this.cycleThroughInstances(1);
      } else {
        // SHIFT E
        this.cycleThroughInstances(-1);
      }
      e.preventDefault();
      e.stopPropagation();
    }
  };

  cycleThroughMasterElements = (direction: number, element: any) => {
    let newIndex = masterIndex + direction;
    if (element) newIndex = masterSelection.elements.indexOf(element);
    if (newIndex > masterSelection.elements.length - 1) {
      newIndex = 0;
      this.rotateLogo();
    } else if (newIndex < 0) {
      newIndex = masterSelection.elements.length - 1;
      this.rotateLogo();
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
      this.scrollElementToCenter(elem);
    }
    this.setMasterFinderInfo();
  };

  cycleThroughInstances = (direction: number) => {
    const { instance, element } = this.getSelectedStructures();
    if (!instance || !element) return false;
    let nextIndex = selections.indexOf(instance) + direction;
    if (nextIndex >= selections.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = selections.length - 1;
    }
    const nextActive = selections[nextIndex];
    const selectedElement = nextActive.elements.find(elem => elem.active);
    this.selectElement(nextActive, selectedElement, true);
  };

  cycleThroughElements = (direction: number) => {
    const { instance, element } = this.getSelectedStructures();
    if (!instance || !element) return false;
    const { elements } = instance;
    let nextIndex = elements.indexOf(element) + direction;
    if (nextIndex >= elements.length) {
      nextIndex = 0;
      this.rotateLogo();
    } else if (nextIndex < 0) {
      nextIndex = elements.length - 1;
      this.rotateLogo();
    }
    const nextActive = elements[nextIndex];
    this.selectElement(instance, nextActive, true);
  };

  cycleThroughAllElements = (direction: number) => {
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
        this.rotateLogo();
      } else target = ffelems[indexOnTree + 1];
    } else {
      if (indexOnTree === 0) {
        target = ffelems[ffelems.length - 1];
        this.rotateLogo();
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
    this.selectElement(targetInstance, targetElement, true);
  };

  getSelectedStructures = () => {
    const instance = selections.find(instance => instance.active) || null;
    const element = instance
      ? instance.elements.find(element => element.active)
      : null;
    return { element, instance };
  };

  unselectElement = () => {
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

  selectElement = (instance, element, followKeepCenterRule) => {
    if (!element || !instance) return false;
    this.unselectElement();

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
          (followKeepCenterRule && settings.keepElementCentered) ||
          !Utils.isElementInViewport(elem.portions[0], viewPortDelta)
        ) {
          this.scrollElementToCenter(elem.portions[0]);
        }
      } else {
        elem.active = false;
        requestAnimationFrame(() => {
          elem.portions.forEach(p => p.classList.add("selectedClass"));
        });
      }
    });
  };

  removeElement = (selection: FFinstance) => {
    selection.elements.forEach(element => {
      element.mapIndicator.remove();
      element.portions.forEach((portion: HTMLElement) =>
        Utils.replaceChildrenWithOriginalContent(portion)
      );
    });
    selection.mapWrapper.remove();
  };

  removeSelectedOrLastElement = () => {
    const { instance } = this.getSelectedStructures();
    if (instance) {
      this.removeElement(instance);
      selections.splice(selections.indexOf(instance), 1);
    } else {
      selections.length && this.removeElement(selections.pop());
    }
    if (selections.length) {
      const nextInstance = selections[selections.length - 1];
      const selectedElement = nextInstance.elements.find(elem => elem.active);
      this.selectElement(nextInstance, selectedElement, true);
    }
  };

  removeAllElements = () => {
    selections.forEach(this.removeElement);
    selections = [];
  };

  //
  // Create Element
  //
  createElement = (
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
          this.createElement(text, null, forceCS, forceWB);
        }, 5);
        return;
      }
    }
    const scrollToTop =
      document.documentElement.scrollTop || document.body.scrollTop || 0;

    const { color, contrast } = this.getColorAndContrast(selection);
    const currentElements: FFelement[] = [];
    let portions: HTMLElement[] = [];
    let active = false;
    let someActive = false;

    let regexFinder = null;
    const excapedText = text.replace(
      /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
      "\\$&"
    );
    const wordBordersHandler = forceWB ? "\\b" : "";
    const caseSensitiveHandler = forceCS ? "g" : "gi";
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
            if (portion.index === 0 && portion.isEnd)
              div.classList.add("ffelem");
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
              Utils.getElementParents(portion.node).includes(
                activeSelectionNode
              );
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
        this.removeMasterFinderHighlight();
        masterFinderWrapper.classList.add("noResults");
      }
      return false;
    }

    if (selection) {
      // clear selected element
      // we have a new one!
      this.unselectElement();
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
        indicator.onclick = () => this.cycleThroughMasterElements(0, element);
      } else {
        // INDICATOR - ON CLICK - ON MOUSE OVER - ON MOUSE OUT
        indicator.onclick = () =>
          this.selectElement(currentSelection, element, false);
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
          portion.onclick = () =>
            this.selectElement(currentSelection, element, false);
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
  ${Utils.renderColor(color, selection ? 1.0 : 1.0)} 0%,
  ${Utils.renderColor(color, selection ? 0.8 : 1.0)} 10%,
  ${Utils.renderColor(color, selection ? 0.6 : 1.0)} 40%,
  #00000000 50%,#00000000 100%)`;

    // redraw scrollbar
    this.redrawMinimapScroll();

    if (selection) {
      label.setAttribute("data-number", ` (${currentElements.length})`);
      label.setAttribute(
        "data-label",
        `${text} ${forceWB ? "|| " : ""}${forceCS ? "Aa" : ""}`
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
      this.updateMasterFinderResultsPosition();

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
        this.setMasterFinderInfo();
        masterFinderWrapper.classList.add("sleeping");
        elem.mapIndicator.classList.add("selected");
        elem.portions.forEach(portion => portion.classList.add("selected"));
        currentSelection.mapWrapper.appendChild(label);
        selectionsMapWrapper.appendChild(mapWrapper);

        if (
          !masterDistances[masterIndex].isInViewport &&
          settings.scrollToResultAfterSearch
        ) {
          this.scrollElementToCenter(elem.portions[0]);
        }
      });
    }

    document.documentElement.scrollTop &&
      document.documentElement.scrollTo({ top: scrollToTop });
    document.body.scrollTop && document.body.scrollTo({ top: scrollToTop });
  };

  redrawMapIndicators = () => {
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

  rotateLogo = () => {
    if (!settings.showRotatingArrow) return;
    repeatLogo.classList.add("active");
    repeatLogoWrapper.classList.add("active");
    window.setTimeout(() => {
      repeatLogo.classList.remove("active");
      repeatLogoWrapper.classList.remove("active");
    }, 810);
  };

  setMasterFinderInfo = () => {
    let value = "";
    if (masterWB) value += "||\xa0\xa0\xa0";
    if (masterCS) value += "Aa\xa0\xa0\xa0";
    let selElem = masterIndex || 0;
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
    } else {
      selElem = null;
    }
    value +=
      (selElem === null || selElem === undefined ? 0 : selElem + 1) +
      " / " +
      totalElems;
    masterFinderLabel.setAttribute("data-info", value);
  };

  updateMasterFinderResultsPosition = () => {
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

  scrollElementToCenter = (elem: HTMLElement) => {
    const scrollBehaviour: any = settings.smoothScrolling
      ? "smooth"
      : "instant";
    const scrollSettings: ScrollIntoViewOptions = {
      block: "center",
      behavior: scrollBehaviour
    };
    elem.scrollIntoView(scrollSettings);
  };

  getColorAndContrast = selection => {
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
    return { color, contrast };
  };

  constructor() {
    super();

    console.log(" -- FastFind has started! 👋 --");

    var shadow = this.attachShadow({ mode: "open" });

    if (EXTENSION_LOADED) return;
    EXTENSION_LOADED = true;

    selfScript = document.head.getElementsByClassName("fast-find")[0];

    if (!selfScript) return;

    // Styles
    const bodyStyle = document.createElement("style");
    bodyStyle.innerHTML = ffBodyStyles;
    const elementStyle = document.createElement("style");
    elementStyle.innerHTML = ffElementStyles;

    // Master Finder
    handleMasterFinderDebouncedRef = debounce(
      this.handleMasterFinderDebounced,
      ONCHANGE_MASTERFINDER_DEBOUNCE_TIME
    );
    masterFinderWrapper.classList.add(
      "masterFinderWrapper",
      "disabled",
      "noAnim"
      );
    masterFinderLabel.classList.add("masterFinderLabel");
    masterFinder.classList.add("masterFinder");
    masterFinder.setAttribute("placeholder", "FAST FIND");
    masterFinder.onkeypress = Utils.eventBlocker;
    masterFinder.onkeyup = Utils.eventBlocker;
    masterFinder.onkeydown = this.onKeyDownMasterFinder;
    masterFinder.oninput = this.handleMasterFinder;
    masterFinder.onmouseover = masterFinder.onmouseout = (
      event: MouseEvent
    ) => {
      requestAnimationFrame(() => {
        if (event.type === "mouseover")
          masterFinderWrapper.classList.remove("sleeping");
        else masterFinderWrapper.classList.add("sleeping");
      });
    };

    // Repeat Logo
    repeatLogo.setAttribute(
      "src",
      selfScript.getAttribute("data-ff-urls-repeat")
    );
    repeatLogo.classList.add("repeatLogo");
    repeatLogoWrapper.classList.add("repeatLogoWrapper");

    // Side Map
    selectionsMapWrapper.classList.add("selectionsMapWrapper");

    // Debug
    if (FIXED_BUTTONS) selectionsMapWrapper.classList.add("fixedButtons");

    if (!settings?.showSideMap) selectionsMapWrapper.classList.add("hidden");
    if (!settings?.showMapLabels) selectionsMapWrapper.classList.add("noLabels");
    if (!settings?.showNumberOfResults)
      selectionsMapWrapper.classList.add("noNumbers");
    if (settings?.opaqueSideMap) selectionsMapWrapper.classList.add("opaque");
    if (settings?.mapButtonsOnTop)
      selectionsMapWrapper.classList.add("buttonsOnTop");
    if (settings?.lightThemeSideMap)
      selectionsMapWrapper.classList.add("lightTheme");
    if (settings?.autoExpandSideMap) selectionsMapWrapper.classList.add("fixed");

    // Pin Button
    selectionsMapPin.classList.add("selectionsMapButton", "selectionsMapPin");
    selectionsMapPin.onclick = () =>
      requestAnimationFrame(() => {
        selectionsMapWrapper.classList.toggle("fixed");
      });
    mapPin.setAttribute("src", selfScript.getAttribute("data-ff-urls-pin"));
    mapPin.classList.add("mapPin");

    // Opacity Button
    selectionsMapOpacity.classList.add(
      "selectionsMapButton",
      "selectionsMapOpacity"
    );
    selectionsMapOpacity.onclick = () =>
      requestAnimationFrame(() => {
        selectionsMapWrapper.classList.toggle("opaque");
      });
    mapOpacity.classList.add("mapOpacity");

    // Theme Button
    selectionsMapTheme.classList.add(
      "selectionsMapButton",
      "selectionsMapTheme"
    );
    selectionsMapTheme.onclick = () =>
      requestAnimationFrame(() => {
        selectionsMapWrapper.classList.toggle("lightTheme");
      });
    mapTheme.classList.add("mapTheme");

    // Buttons Position
    selectionsButtonsPosition.classList.add(
      "selectionsMapButton",
      "selectionsButtonsPosition"
    );
    selectionsButtonsPosition.onclick = () =>
      requestAnimationFrame(() => {
        selectionsMapWrapper.classList.toggle("buttonsOnTop");
      });
    buttonsPosition.classList.add("buttonsPosition");

    // Scroll
    selectionsMapScroll.classList.add("selectionsMapScroll");

    const body = document.createElement("body");
    body.setAttribute("id", "ffbody");
    // Add all to document body
    // Order is important !
    requestAnimationFrame(() => {
      document.head.appendChild(bodyStyle);
      shadow.appendChild(elementStyle);
      shadow.appendChild(body);

      masterFinderLabel.appendChild(masterFinder);
      masterFinderWrapper.appendChild(masterFinderLabel);
      body.appendChild(masterFinderWrapper);

      repeatLogoWrapper.appendChild(repeatLogo);
      body.appendChild(repeatLogoWrapper);

      selectionsMapPin.appendChild(mapPin);
      selectionsMapWrapper.appendChild(selectionsMapPin);
      selectionsMapOpacity.appendChild(mapOpacity);
      selectionsMapWrapper.appendChild(selectionsMapOpacity);
      selectionsMapTheme.appendChild(mapTheme);
      selectionsMapWrapper.appendChild(selectionsMapTheme);
      selectionsButtonsPosition.appendChild(buttonsPosition);
      selectionsMapWrapper.appendChild(selectionsButtonsPosition);

      selectionsMapWrapper.appendChild(selectionsMapScroll);
      body.appendChild(selectionsMapWrapper);
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
          this.redrawMinimapScroll();
          this.redrawMapIndicators();
        }
      }, SCROLL_THROTTLE_TIME)
    );

    // ON SCROLL
    window.addEventListener(
      "scroll",
      throttle(() => {
        this.redrawMinimapScroll();
        this.updateMasterFinderResultsPosition();
        this.setMasterFinderInfo();
      }, SCROLL_THROTTLE_TIME)
    );

    // ON KEY DOWN
    window.addEventListener("keydown", this.onKeyDown);
  }
}

// Custom Element
customElements.define("fast-find-wrapper", FastFindWrapper);
let FastFindWrapperElem = null;

// GET SETTINGS AND START!
window.onload = () => {
  const { set_settings } = Utils.requestTypes;
  const { page, background } = Utils.entities;

  window.addEventListener(
    "message",
    ({ data }) => {
      if (data.to !== page) return;
      switch (data.type) {
        case set_settings:
          settings = data.payload;
          if (!EXTENSION_LOADED) {
            FastFindWrapperElem = document.createElement("fast-find-wrapper");
            document.body.appendChild(FastFindWrapperElem);
          }
          break;

        default:
          break;
      }
    },
    false
  );

  window.postMessage(
    {
      type: Utils.requestTypes.get_settings,
      to: background
    },
    "*"
  );
};
