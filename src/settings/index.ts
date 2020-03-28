import { requestTypes, entities } from "../helpers";

console.log("Hello from settings page! 👋 -- FastFind");

let settings = null;

let onSaveButton = document.getElementById("feedback");
let feedbackMsg = document.getElementById("saveButton");
let versionSpan = document.getElementById("ff_description");
let footerContainer = document.getElementById("footerContainer");

const setFeedbackMsg = message => {
  if (!feedbackMsg) feedbackMsg = document.getElementById("feedback");
  if (!footerContainer)
    footerContainer = document.getElementById("footerContainer");
  footerContainer.classList.add("onSave");
  feedbackMsg.innerText = message;
  setTimeout(() => {
    feedbackMsg.innerText = "";
    footerContainer.classList.remove("onSave");
  }, 3000);
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

  onSaveButton = document.getElementById("saveButton");
  onSaveButton.onclick = () => {
    chrome.runtime.sendMessage(
      {
        type: requestTypes.set_settings,
        payload: settings,
        to: entities.background,
        from: entities.settings
      },
      success => {
        if (success) {
          setFeedbackMsg("Saved!");
        } else {
          setFeedbackMsg("Ups! Something went wrong...");
        }
      }
    );
  };

  const manifestData = chrome.runtime.getManifest();
  versionSpan = document.getElementById("ff_description");
  versionSpan.innerText =
    "By " + manifestData.author + " - Version: " + manifestData.version + " on";
};

window.onload = () => {
  // Activate first tab!
  if (!window.location.href.includes("#")) window.location.href += "#home";

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
