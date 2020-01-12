export const ffStyle = `
body {
  --elem-small: 1px;
  --elem-normal: 0px;
  --elem-expanded: -1px;
  --elem-big: -3px;
  --elem-max: -5px;

  --elem-radius: 2px;
  --elem-radius-selected: 3px;

  --highlight-animation-duration: .3s;
  --highlight-animation-effect: cubic-bezier(.6, 0, .4, 1);

  --animation-settings: all .2s ease;

  --buttons-size: 24px;
}



/* #################### FFELEM #################### */

.ffelem {
  position: relative;
  z-index: 1;
  display: inline-block;
  border-top-left-radius: var(--elem-radius);
  border-bottom-left-radius: var(--elem-radius);
  border-top-right-radius: var(--elem-radius);
  border-bottom-right-radius: var(--elem-radius);
  transition: var(--animation-settings);
}

.ffelemMiddle {
  position: relative;
  z-index: 1;
  display: inline-block;
}

.ffelemStart {
  position: relative;
  z-index: 1;
  display: inline-block;
  border-top-left-radius: var(--elem-radius);
  border-bottom-left-radius: var(--elem-radius);
}

.ffelemEnd {
  position: relative;
  z-index: 1;
  display: inline-block;
  border-top-right-radius: var(--elem-radius);
  border-bottom-right-radius: var(--elem-radius);
}

.ffelem.hovered  { z-index: 2; }
.ffelemMiddle.hovered  { z-index: 2; }
.ffelemStart.hovered  { z-index: 2; }
.ffelemEnd.hovered  { z-index: 2; }
.ffelem.selected { z-index: 3; }
.ffelemMiddle.selected { z-index: 3; }
.ffelemStart.selected { z-index: 3; }
.ffelemEnd.selected { z-index: 3; }



.ffelem::before {
  content: '';
  position: absolute;
  top: var(--elem-normal);
  left: -1px;
  right: -1px;
  bottom: var(--elem-normal);
  background: inherit;
  z-index: -1;
  border-top-left-radius: var(--elem-radius);
  border-bottom-left-radius: var(--elem-radius);
  border-top-right-radius: var(--elem-radius);
  border-bottom-right-radius: var(--elem-radius);
  transition: var(--animation-settings);
}

.ffelemMiddle::before {
  content: '';
  position: absolute;
  top: var(--elem-normal);
  left: -1px;
  right: -1px;
  bottom: var(--elem-normal);
  background: inherit;
  z-index: -1;
  transition: var(--animation-settings);
}

.ffelemStart::before {
  content: '';
  position: absolute;
  top: var(--elem-normal);
  left: -1px;
  right: -1px;
  bottom: var(--elem-normal);
  background: inherit;
  z-index: -1;
  border-top-left-radius: var(--elem-radius);
  border-bottom-left-radius: var(--elem-radius);
  transition: var(--animation-settings);
}

.ffelemEnd::before {
  content: '';
  position: absolute;
  top: var(--elem-normal);
  left: -1px;
  right: -1px;
  bottom: var(--elem-normal);
  background: inherit;
  z-index: -1;
  border-top-right-radius: var(--elem-radius);
  border-bottom-right-radius: var(--elem-radius);
  transition: var(--animation-settings);
}



.ffelem.selectedClass::before {
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  border-left: solid 1px rgba(255,255,255,0.4) !important;
  border-right: solid 1px rgba(255,255,255,0.4) !important;
  top: var(--elem-expanded);
  left: var(--elem-expanded);
  right: var(--elem-expanded);
  bottom: var(--elem-expanded);
}

.ffelemMiddle.selectedClass::before {
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  top: var(--elem-expanded);
  bottom: var(--elem-expanded);
}

.ffelemStart.selectedClass::before {
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  border-left: solid 1px rgba(255,255,255,0.4) !important;
  top: var(--elem-expanded);
  left: var(--elem-expanded);
  bottom: var(--elem-expanded);
}

.ffelemEnd.selectedClass::before {
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  border-right: solid 1px rgba(255,255,255,0.4) !important;
  top: var(--elem-expanded);
  right: var(--elem-expanded);
  bottom: var(--elem-expanded);
}



.ffelem.hovered::before {
  top: var(--elem-big);
  left: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  border-left: solid 1px rgba(255,255,255,0.4) !important;
  border-right: solid 1px rgba(255,255,255,0.4) !important;
}

.ffelemMiddle.hovered::before {
  top: var(--elem-big);
  bottom: var(--elem-big);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
}

.ffelemStart.hovered::before {
  top: var(--elem-big);
  left: var(--elem-big);
  bottom: var(--elem-big);
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  border-left: solid 1px rgba(255,255,255,0.4) !important;
}

.ffelemEnd.hovered::before {
  top: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  border-right: solid 1px rgba(255,255,255,0.4) !important;
}



.ffelem.selected::before {
  animation: highlight var(--highlight-animation-duration) var(--highlight-animation-effect);
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,1.0) !important;
  border-bottom: solid 1px rgba(255,255,255,1.0) !important;
  border-left: solid 1px rgba(255,255,255,1.0) !important;
  border-right: solid 1px rgba(255,255,255,1.0) !important;
  top: var(--elem-big);
  left: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemMiddle.selected::before {
  animation: highlightMiddle var(--highlight-animation-duration) var(--highlight-animation-effect);
  border-top: solid 1px rgba(255,255,255,1.0) !important;
  border-bottom: solid 1px rgba(255,255,255,1.0) !important;
  top: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemStart.selected::before {
  animation: highlightStart var(--highlight-animation-duration) var(--highlight-animation-effect);
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,1.0) !important;
  border-bottom: solid 1px rgba(255,255,255,1.0) !important;
  border-left: solid 1px rgba(255,255,255,1.0) !important;
  top: var(--elem-big);
  left: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemEnd.selected::before {
  animation: highlightEnd var(--highlight-animation-duration) var(--highlight-animation-effect);
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,1.0) !important;
  border-bottom: solid 1px rgba(255,255,255,1.0) !important;
  border-right: solid 1px rgba(255,255,255,1.0) !important;
  top: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
}



/* #################### FFELEM ANIMATIONS #################### */

@keyframes highlight {
  0% {
    top: var(--elem-small);
    left: var(--elem-small);
    right: var(--elem-small);
    bottom: var(--elem-small);
  }
  15% {
    top: var(--elem-normal);
    left: var(--elem-normal);
    right: var(--elem-normal);
    bottom: var(--elem-normal);
  }
  60% {
    top: var(--elem-max);
    left: var(--elem-max);
    right: var(--elem-max);
    bottom: var(--elem-max);
  }
  100% {
    top: var(--elem-big);
    left: var(--elem-big);
    right: var(--elem-big);
    bottom: var(--elem-big);
  }
}

@keyframes highlightMiddle {
  0% {
    top: var(--elem-small);
    bottom: var(--elem-small);
  }
  15% {
    top: var(--elem-normal);
    bottom: var(--elem-normal);
  }
  60% {
    top: var(--elem-max);
    bottom: var(--elem-max);
  }
  100% {
    top: var(--elem-big);
    bottom: var(--elem-big);
  }
}

@keyframes highlightStart {
  0% {
    top: var(--elem-small);
    left: var(--elem-small);
    bottom: var(--elem-small);
  }
  15% {
    top: var(--elem-normal);
    left: var(--elem-normal);
    bottom: var(--elem-normal);
  }
  60% {
    top: var(--elem-max);
    left: var(--elem-max);
    bottom: var(--elem-max);
  }
  100% {
    top: var(--elem-big);
    left: var(--elem-big);
    bottom: var(--elem-big);
  }
}

@keyframes highlightEnd {
  0% {
    top: var(--elem-small);
    right: var(--elem-small);
    bottom: var(--elem-small);
  }
  15% {
    top: var(--elem-normal);
    right: var(--elem-normal);
    bottom: var(--elem-normal);
  }
  60% {
    top: var(--elem-max);
    right: var(--elem-max);
    bottom: var(--elem-max);
  }
  100% {
    top: var(--elem-big);
    right: var(--elem-big);
    bottom: var(--elem-big);
  }
}



/* #################### PAGE LOOP LOGO #################### */

.repeatLogoWrapper {
  opacity: 0;
  background-color: rgb(160,160,160);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 20px 12px 18px;
  border-radius: 20px;
  z-index: 1000000;
  pointer-events: none;
}

.repeatLogo {
  transform: rotate(-30deg);
  pointer-events: none;
}

.repeatLogo.active {
  animation: rotateLogo .7s cubic-bezier(.6, 0, .4, 1);
}
@keyframes rotateLogo {
  0%   { transform: rotate(-30deg); }
  100% { transform: rotate( 80deg); }
}

.repeatLogoWrapper.active {
  animation: rotateLogoWrapper .7s cubic-bezier(.6, 0, .4, 1);
}
@keyframes rotateLogoWrapper {
  0%   { opacity: 0; }
  25%  { opacity: 1; }
  75%  { opacity: 1; }
  100% { opacity: 0; }
}



/* #################### SELECTIONS MAP WRAPPER #################### */

.selectionsMapWrapper {
  display: flex;
  min-width: 0px;
  height: 100vh;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: 10000;
  background: none;
  transition: var(--animation-settings);
}

.selectionsMapWrapper:hover,
.selectionsMapWrapper.fixed {
  background: rgba(0,0,0,0.6);
}

.selectionsMapWrapper.lightTheme:hover,
.selectionsMapWrapper.lightTheme.fixed {
  background: rgba(255,255,255,0.5);
}

.selectionsMapWrapper.opaque {
  background: rgba(0,0,0,1.0);
}

.selectionsMapWrapper.opaque.lightTheme {
  background: rgba(255,255,255,1.0);
}

.selectionsMapWrapper.hidden {
  display: none;
}



/* #################### SELECTIONS MAP SCROLL #################### */

.selectionsMapScroll {
  position: absolute;
  width: 100%;
  background: rgba(255,255,255,0.4);
  opacity: 0.5;
  z-index: 2;
  pointer-events: none;
}

.selectionsMapWrapper.lightTheme .selectionsMapScroll {
  background: rgba(0,0,0,0.4);
}



/* #################### SELECTIONS MAP BUTTON #################### */

.selectionsMapButton {
  visibility: hidden;
  width: var(--buttons-size);
  height: var(--buttons-size);
  background: rgba(0,0,0,0.6);
  position: absolute;
  left: calc(-1 * var(--buttons-size));
  cursor: pointer;
  transition: background .2s ease;
}

.selectionsMapPin {
  bottom: 0px;
}

.selectionsMapWrapper.buttonsOnTop .selectionsMapPin {
  top: 0px;
}

.selectionsMapOpacity {
  bottom: calc(1 * var(--buttons-size));;
}

.selectionsMapWrapper.buttonsOnTop .selectionsMapOpacity {
  top: calc(1 * var(--buttons-size));;
}

.selectionsMapTheme {
  bottom: calc(2 * var(--buttons-size));;
}

.selectionsMapWrapper.buttonsOnTop .selectionsMapTheme {
  top: calc(2 * var(--buttons-size));;
}

.selectionsButtonsPosition {
  bottom: calc(3 * var(--buttons-size));;
}

.selectionsMapWrapper.buttonsOnTop .selectionsButtonsPosition {
  top: calc(3 * var(--buttons-size));;
}

.selectionsMapWrapper.opaque .selectionsMapButton {
  background: rgba(0,0,0,1.0);
}

.selectionsMapWrapper.lightTheme .selectionsMapButton {
  background: rgba(255,255,255,0.5);
}

.selectionsMapWrapper.opaque.lightTheme .selectionsMapButton {
  background: rgba(255,255,255,1.0);
}

.selectionsMapWrapper:hover .selectionsMapButton,
.selectionsMapWrapper.fixedButtons .selectionsMapButton {
  visibility: visible;
}



/* #################### MAP PIN #################### */

.mapPin {
  width: 100%;
  padding: 5px;
  opacity: 0.4;
  filter: invert(100%);
  box-sizing: border-box;
  transform: rotate(-45deg);
  transition: opacity .2s ease, padding .2s ease;
}

.selectionsMapWrapper.lightTheme .mapPin {
  filter: none;
}

.selectionsMapWrapper.fixed .mapPin {
  opacity: 1.0;
}

.mapPin:hover {
  padding: 3px;
}



/* #################### MAP OPACITY #################### */

.mapOpacity {
  width: 40%;
  height: 60%;
  margin: 20% 30%;
  opacity: 0.4;
  border: solid .5px white !important;
  transition:
    border .2s ease,
    width .2s ease,
    height .2s ease,
    margin .2s ease,
    opacity .2s ease,
    background .2s ease;
}

.selectionsMapWrapper.lightTheme .mapOpacity {
  border: solid .5px black !important;
}

.mapOpacity:hover {
  width: 50%;
  height: 70%;
  margin: 15% 25%;
}

.selectionsMapWrapper.opaque .mapOpacity {
  opacity: 1.0;
  background: rgba(255,255,255,0.4);
}

.selectionsMapWrapper.lightTheme.opaque .mapOpacity {
  opacity: 1.0;
  background: rgba(0,0,0,0.4);
}



/* #################### MAP THEME #################### */

.mapTheme {
  width: 100%;
  opacity: 0.4;
  box-sizing: border-box;
  transition: opacity .2s ease;
}

.mapTheme::before {
  content: '\\25D1';
  position: relative;
  top: -1px;
  left: 4px;
  font-size: 16px;
  color: white;
  transition:
    opacity .2s ease,
    color .2s ease,
    top .2s ease,
    left .2s ease,
    font-size .2s ease;
}

.selectionsMapWrapper.lightTheme .mapTheme {
  opacity: 0.8;
}

.selectionsMapWrapper.lightTheme .mapTheme::before {
  color: black;
}

.mapTheme:hover::before {
  top: -3px;
  left: 3px;
  font-size: 18px;
}



/* #################### BUTTONS POSITION #################### */

.buttonsPosition {
  width: 100%;
  opacity: 0.4;
  box-sizing: border-box;
  transition: opacity .2s ease;
}

.buttonsPosition::before {
  content: '▲';
  position: relative;
  top: -1px;
  left: 4px;
  font-size: 16px;
  color: white;
  transition:
    opacity .2s ease,
    color .2s ease,
    top .2s ease,
    left .2s ease,
    font-size .2s ease;
}

.selectionsMapWrapper.buttonsOnTop .buttonsPosition::before {
  content: '▼';
}

.selectionsMapWrapper.lightTheme .buttonsPosition {
  opacity: 0.8;
}

.selectionsMapWrapper.lightTheme .buttonsPosition::before {
  color: black;
}

.buttonsPosition:hover::before {
  top: -3px;
  left: 3px;
  font-size: 18px;
}



/* #################### MAP WRAPPER #################### */

.selectionsMapWrapper .mapWrapper {
  position: absolute;
  right: 0px;
  width: 14px;
  height: 100vh;
}

.selectionsMapWrapper:hover .mapWrapper {
  position: relative;
}

.selectionsMapWrapper.fixed .mapWrapper {
  position: relative;
}

.mapWrapper.selected {
  z-index: 3;
}

.mapWrapper:hover {
  background: rgba(255,255,255,0.4);
}

.selectionsMapWrapper.lightTheme .mapWrapper:hover {
  background: rgba(0,0,0,0.2);
}



/* #################### INDICATORS #################### */

.mapIndicator {
  position: absolute;
  right: 0px;
  width: 10px;
  height: 6px;
  margin-left: 4px;
  box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.8);
  border-radius: 1px;
  transition: var(--animation-settings);
  z-index: 2;
  cursor: pointer;
  box-sizing: content-box;
}

.mapWrapper.selected .mapIndicator {
  border: solid 0.5px rgba(255,255,255,0.4) !important;
  width: 9px;
  height: 5px;
}

.mapIndicator:hover,
.mapIndicator.hovered {
  width: 14px;
  margin-left: 0px;
  border: solid 0.5px rgba(255,255,255,0.4) !important;
}

.mapWrapper.selected .mapIndicator:hover,
.mapWrapper.selected .mapIndicator.hovered {
  width: 14px;
  margin-left: 0px;
}

.mapWrapper.selected .mapIndicator.selected {
  border: solid 0.5px rgba(255,255,255,1.0) !important;
  width: 18px;
  margin-left: -4px;
  z-index: 1;
}



/* #################### MAP LABEL #################### */

.mapLabel {
  visibility: hidden;
  font-size: 11px;
  font-family: monospace;
  color: rgba(255,255,255,0.7);
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 50vh;
  margin-top: 14vh;
  height: 85vh;
  width: 14px;
  user-select: none;
  transform: rotate(180deg);
  box-sizing: content-box;
  text-align: left;
  line-height: 14px;
  writing-mode: vertical-rl;
  transition: var(--animation-settings);
}

.selectionsMapWrapper.lightTheme .mapLabel {
  color: rgba(0,0,0,0.8);
}

.mapLabel::before {
  content: attr(data-label);
}

.mapLabel::after {
  content: attr(data-number);
}

.mapWrapper:hover .mapLabel {
  margin-top: 13vh;
  padding-top: 30vh;
  color: rgba(255,255,255,1.0);
}

.selectionsMapWrapper.lightTheme .mapWrapper:hover .mapLabel {
  color: rgba(0,0,0,1.0);
}

.mapWrapper.selected .mapLabel {
  visibility: visible;
  margin-top: 12vh;
  padding-top: 10vh;
  color: rgba(255,255,255,1.0);
}

.selectionsMapWrapper.lightTheme .mapWrapper.selected .mapLabel {
  color: rgba(0,0,0,1.0);
}

.selectionsMapWrapper:hover .mapLabel {
  visibility: visible;
}

.selectionsMapWrapper.fixed .mapLabel {
  visibility: visible;
}

.selectionsMapWrapper.noLabels .mapLabel::before {
  color: transparent;
}

.selectionsMapWrapper.noLabels .mapLabel::after {
  color: transparent;
}

.selectionsMapWrapper.noNumbers .mapLabel::after {
  color: transparent;
}
`;

export const colors = [
  [30, 168, 150],
  [255, 97, 100],
  [0, 113, 188],
  [31, 184, 92],
  [247, 92, 3],
  [101, 155, 94],
  [250, 169, 22],
  [194, 32, 44],
  [181, 40, 144],
  [73, 48, 240],
  [90, 19, 108],
  [23, 68, 43]
];