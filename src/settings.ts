import { requestTypes } from "./helpers";

console.log("Hello from settings page! 👋 -- FastFind");

let settings = null;

let onSaveButton = document.getElementById("feedback");
let feedbackMsg = document.getElementById("saveButton");

const setFeedbackMsg = message => {
  if (!feedbackMsg) feedbackMsg = document.getElementById("feedback");
  feedbackMsg.innerText = message;
  setTimeout(() => {
    feedbackMsg.innerText = "";
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
        data: requestTypes.set_settings,
        payload: settings
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
};

window.onload = () => {
  // Activate first tab!
  if (!window.location.href.includes("#")) window.location.href += "#home";

  chrome.runtime.sendMessage(
    { data: requestTypes.get_settings },
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
