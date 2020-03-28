import { requestTypes, entities } from "./helpers";

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
    const userSettings = data[LOCAL_STORAGE_KEY];
    console.log("DEBUG: retreiveSettings", userSettings);
    if (userSettings) {
      settings = {
        ...defaultSettings,
        ...userSettings
      };
    } else saveSettings(defaultSettings, false);
  });
};

const saveSettings = (newSettings, broadcast) => {
  console.log("DEBUG: saveSettings", newSettings);
  chrome.storage.local.set(
    {
      [LOCAL_STORAGE_KEY]: newSettings
    },
    () => {
      settings = newSettings;
      broadcast &&
        chrome.tabs.query({}, tabs =>
          tabs.forEach(tab =>
            chrome.tabs.sendMessage(tab.id, {
              type: requestTypes.set_settings,
              payload: newSettings,
              to: entities.page
            })
          )
        );
    }
  );
};

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  const { get_settings, set_settings } = requestTypes;
  const { to, payload, type, from } = data;

  if (to !== entities.background) return;

  sender.tab && console.log("# Message from", sender.tab.title.slice(0, 16));
  console.log("# type =", type);
  console.log("##################################");

  switch (type) {
    case get_settings:
      if (from === entities.settings) sendResponse(settings);
      else
        chrome.tabs.sendMessage(sender.tab.id, {
          type: requestTypes.set_settings,
          payload: settings,
          to: entities.page
        });
      break;

    case set_settings:
      saveSettings(payload, true);
      if (from === entities.settings) sendResponse(true);
      break;

    default:
      break;
  }
});

retreiveSettings();
