export const ffStyle = `
body {
  --elem-normal: 0px;
  --elem-big: -2px;
  --elem-max: -4px;

  --elem-radius: 2px;
  --elem-radius-selected: 3px;
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
  transition: all .1s ease;
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
  transition: all .1s ease;
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
  transition: all .1s ease;
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
  transition: all .1s ease;
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
}

.ffelemMiddle.hovered::before {
  top: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemStart.hovered::before {
  top: var(--elem-big);
  left: var(--elem-big);
  bottom: var(--elem-big);
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
}

.ffelemEnd.hovered::before {
  top: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
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
  top: var(--elem-big);
  left: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemMiddle.selectedClass::before {
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  top: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemStart.selectedClass::before {
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  border-left: solid 1px rgba(255,255,255,0.4) !important;
  top: var(--elem-big);
  left: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemEnd.selectedClass::before {
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  border-right: solid 1px rgba(255,255,255,0.4) !important;
  top: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
}



.ffelem.selected::before {
  animation: highlight .6s cubic-bezier(.6, 0, .4, 1);
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
  animation: highlightMiddle .6s cubic-bezier(.6, 0, .4, 1);
  border-top: solid 1px rgba(255,255,255,1.0) !important;
  border-bottom: solid 1px rgba(255,255,255,1.0) !important;
  top: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemStart.selected::before {
  animation: highlightStart .6s cubic-bezier(.6, 0, .4, 1);
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
  animation: highlightEnd .6s cubic-bezier(.6, 0, .4, 1);
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
    top: var(--elem-big);
    left: var(--elem-big);
    right: var(--elem-big);
    bottom: var(--elem-big);
  }
  10% {
    top: var(--elem-normal);
    left: var(--elem-normal);
    right: var(--elem-normal);
    bottom: var(--elem-normal);
  }
  70% {
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
    top: var(--elem-big);
    bottom: var(--elem-big);
  }
  10% {
    top: var(--elem-normal);
    bottom: var(--elem-normal);
  }
  70% {
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
    top: var(--elem-big);
    left: var(--elem-big);
    bottom: var(--elem-big);
  }
  10% {
    top: var(--elem-normal);
    left: var(--elem-normal);
    bottom: var(--elem-normal);
  }
  70% {
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
    top: var(--elem-big);
    right: var(--elem-big);
    bottom: var(--elem-big);
  }
  10% {
    top: var(--elem-normal);
    right: var(--elem-normal);
    bottom: var(--elem-normal);
  }
  70% {
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
  background-color: rgba(90,90,90,0.7);
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
  opacity: .7;
  transform: rotate(-30deg);
  pointer-events: none;
}

.repeatLogo.active {
  animation: rotateLogo .6s cubic-bezier(.6, 0, .4, 1);
}
@keyframes rotateLogo {
  0%   { transform: rotate(-30deg); }
  100% { transform: rotate( 80deg); }
}

.repeatLogoWrapper.active {
  animation: rotateLogoWrapper .6s cubic-bezier(.6, 0, .4, 1);
}
@keyframes rotateLogoWrapper {
  0%   { opacity: 0; }
  25%  { opacity: 1; }
  65%  { opacity: 1; }
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
}

.selectionsMapWrapper:hover {
  background: rgba(0,0,0,0.6);
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

.mapWrapper.selected {
  z-index: 2;
}

.mapWrapper:hover {
  background: rgba(255,255,255,0.4);
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
  transition: all .1s ease;
  z-index: 2;
  cursor: pointer;
}

.mapWrapper.selected .mapIndicator {
  border: solid 0.5px rgba(255,255,255,0.4) !important;
  width: 9px;
  height: 5px;
}

.mapIndicator:hover {
  width: 14px;
  margin-left: 0px;
}

.mapWrapper.selected .mapIndicator:hover {
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
  color: rgba(255,255,255,1.0);
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 50vh;
  margin-top: 14vh;
  height: 85vh;
  width: 14px;
  user-select: none;
  transform: rotate(180deg);
  box-sizing: content-box;
  unicode-bidi: bidi-override;
  direction: rtl;
  text-align: left;
  line-height: 14px;
  writing-mode: vertical-rl;
  transition: all .1s ease;
}

.mapWrapper:hover .mapLabel {
  margin-top: 13vh;
  padding-top: 30vh;
}

.mapWrapper.selected .mapLabel {
  margin-top: 11vh;
  padding-top: 10vh;
}

.selectionsMapWrapper:hover .mapLabel {
  visibility: visible;
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