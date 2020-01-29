import { requestTypes } from "./helpers";

console.log("Hello from background page! 👋 -- FastFind");

const LOCAL_STORAGE_KEY = "__FF_STORAGE_KEY__";

const defaultSettings = {
  // KEYS
  selectKey: "f",
  removeKey: "d",
  nextElementKey: "r",
  nextInstanceKey: "e",
  wordBordersToggleKey: "b",
  caseSensitiveToggleKey: "c",

  // EFFECTS
  smoothScrolling: true, // CHECKED
  showRotatingArrow: true, // CHECKED
  keepElementCentered: false, // CHECKED

  // SIDE MAP
  showSideMap: true, // CHECKED
  showMapLabels: true, // CHECKED
  opaqueSideMap: false, // CHECKED
  mapButtonsOnTop: false, // CHECKED
  autoExpandSideMap: false, // CHECKED
  lightThemeSideMap: false, // CHECKED
  showNumberOfResults: true, // CHECKED

  // SETTINGS
  forceWordBorders: false, // CHECKED
  forceCaseSensitive: false, // CHECKED
  masterFinderEnabled: true, // CHECKED
  masterFinderOverride: false, // CHECKED
  scrollToNearestResult: true, //CHECKED
  scrollToResultAfterSearch: true // CHECKED
};

let settings = null;

const retreiveSettings = () => {
  chrome.storage.local.get([LOCAL_STORAGE_KEY], data => {
    const newSettings = data[LOCAL_STORAGE_KEY];
    console.log("DEBUG: retreiveSettings", newSettings);
    if (newSettings) settings = newSettings;
    else saveSettings(defaultSettings);
  });
};

const saveSettings = newSettings => {
  console.log("DEBUG: saveSettings", newSettings);
  chrome.storage.local.set(
    {
      [LOCAL_STORAGE_KEY]: newSettings
    },
    () => {
      settings = newSettings;
    }
  );
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { get_settings, set_settings } = requestTypes;
  console.log("# Message from", sender.tab.title.slice(0, 16));
  console.log("# request =", request.data);

  switch (request.data) {
    case get_settings:
      sendResponse(settings);
      break;

    case set_settings:
      saveSettings(request.payload);
      sendResponse(true);
      break;

    default:
      break;
  }
});

retreiveSettings();
