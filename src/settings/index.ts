import { requestTypes, entities } from "../helpers";
import { defaultSettings } from "../Background";

console.log("Hello from settings page! 👋 -- FastFind");

let settings = null;

let onSaveButton;
let openOnTabButton;
let resetSettingsButton;
let feedbackMsg;
let versionSpan;
let footerContainer;

const setFeedbackMsg = message => {
  footerContainer.classList.add("onSave");
  feedbackMsg.innerText = message;
  setTimeout(() => {
    feedbackMsg.innerText = "";
  }, 1000);
  setTimeout(() => {
    footerContainer.classList.remove("onSave");
  }, 2000);
};

const initFFSettings = () => {
  // Assign values and event listeners by id
  Object.entries(settings).forEach(([key, value]) => {
    const elem: any = document.getElementById(key);
    if (typeof value === "string") {
      // Key binding
      elem.value = value;
      elem.onchange = ({ target: { value } }) => {
        if (!!value.trim()) settings[key] = value;
      };
    } else {
      // Boolean option
      elem.checked = value;
      elem.onchange = ({ target: { checked } }) => {
        settings[key] = checked;
      };
    }
  });

  onSaveButton.onclick = () => {
    chrome.runtime.sendMessage(
      {
        type: requestTypes.set_settings,
        payload: settings,
        to: entities.background,
        from: entities.settings
      },
      success =>
        success
          ? setFeedbackMsg("Saved!")
          : setFeedbackMsg("Ups! Something went wrong...")
    );
  };

  openOnTabButton.onclick = () => chrome.runtime.openOptionsPage();
  resetSettingsButton.onclick = () => {
    if (confirm("Are you sure?")) {
      chrome.runtime.sendMessage(
        {
          type: requestTypes.set_settings,
          payload: defaultSettings,
          to: entities.background,
          from: entities.settings
        },
        success =>
          success
            ? window.location.reload()
            : setFeedbackMsg("Ups! Something went wrong...")
      );
    }
  };

  const manifestData = chrome.runtime.getManifest();
  versionSpan.innerText =
    "By " + manifestData.author + " - Version: " + manifestData.version + " on";
};

window.onload = () => {
  // Activate first tab!
  if (!window.location.href.includes("#")) window.location.href += "#home";

  onSaveButton = document.getElementById("saveButton");
  openOnTabButton = document.getElementById("openOnTabButton");
  resetSettingsButton = document.getElementById("resetSettingsButton");
  feedbackMsg = document.getElementById("feedback");
  versionSpan = document.getElementById("extensionVersion");
  footerContainer = document.getElementById("footerContainer");

  chrome.runtime.sendMessage(
    {
      type: requestTypes.get_settings,
      to: entities.background,
      from: entities.settings
    },
    newSettings => {
      if (newSettings) {
        settings = newSettings;
        initFFSettings();
      } else {
        setFeedbackMsg("Error fetching settings...");
      }
    }
  );
};
