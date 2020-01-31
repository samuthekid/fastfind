"use strict";

import { entities } from "./helpers";

console.log("Hello from entry point! 👋 -- FastFind");

const pinUrl = chrome.extension.getURL("assets/pin.png");
const repeatUrl = chrome.extension.getURL("assets/repeat.png");
const scriptUrl = chrome.extension.getURL("fast-find.js");

const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute("src", scriptUrl);
script.setAttribute("class", "fast-find");
script.setAttribute("data-ff-urls-pin", pinUrl);
script.setAttribute("data-ff-urls-repeat", repeatUrl);
const head =
  document.head ||
  document.getElementsByTagName("head")[0] ||
  document.documentElement;
head.insertBefore(script, head.lastChild);

// from BACKGROUND
chrome.runtime.onMessage.addListener(data => {
  if (data.to === entities.page) window.postMessage(data, "*");
});

// from PAGE SCRIPT
window.addEventListener(
  "message",
  ({ data }) => {
    if (data.to === entities.background) chrome.runtime.sendMessage(data);
  },
  false
);
