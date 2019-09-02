export const ffStyle = `
body {
  --elem-normal: 0px;
  --elem-big: -2px;
  --elem-max: -4px;

  --elem-radius: 2px;
  --elem-radius-selected: 3px;
}



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
  border-top: solid 1px #ffffff55 !important;
  border-bottom: solid 1px #ffffff55 !important;
  border-left: solid 1px #ffffff55 !important;
  border-right: solid 1px #ffffff55 !important;
  top: var(--elem-big);
  left: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemMiddle.selectedClass::before {
  border-top: solid 1px #ffffff55 !important;
  border-bottom: solid 1px #ffffff55 !important;
  top: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemStart.selectedClass::before {
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top: solid 1px #ffffff55 !important;
  border-bottom: solid 1px #ffffff55 !important;
  border-left: solid 1px #ffffff55 !important;
  top: var(--elem-big);
  left: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemEnd.selectedClass::before {
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px #ffffff55 !important;
  border-bottom: solid 1px #ffffff55 !important;
  border-right: solid 1px #ffffff55 !important;
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
  border-top: solid 1px #ffffff !important;
  border-bottom: solid 1px #ffffff !important;
  border-left: solid 1px #ffffff !important;
  border-right: solid 1px #ffffff !important;
  top: var(--elem-big);
  left: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemMiddle.selected::before {
  animation: highlightMiddle .6s cubic-bezier(.6, 0, .4, 1);
  border-top: solid 1px #ffffff !important;
  border-bottom: solid 1px #ffffff !important;
  top: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemStart.selected::before {
  animation: highlightStart .6s cubic-bezier(.6, 0, .4, 1);
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top: solid 1px #ffffff !important;
  border-bottom: solid 1px #ffffff !important;
  border-left: solid 1px #ffffff !important;
  top: var(--elem-big);
  left: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemEnd.selected::before {
  animation: highlightEnd .6s cubic-bezier(.6, 0, .4, 1);
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px #ffffff !important;
  border-bottom: solid 1px #ffffff !important;
  border-right: solid 1px #ffffff !important;
  top: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
}



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









.repeatLogoWrapper {
  opacity: 0;
  background-color: #5a5a5ab3;
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
  background: rgba(0,0,0,0.7);
}

.selectionsMapWrapper .mapWrapper {
  position: absolute;
  right: 0px;
  width: 14px;
  height: 100vh;
}

.selectionsMapWrapper:hover .mapWrapper {
  position: relative;
}

.mapWrapper:hover {
  background: rgba(0,0,0,0.9);
}

.mapIndicator {
  position: absolute;
  right: 0px;
  width: 10px;
  height: 6px;
  margin-left: 4px;
  border: solid 1px #ffffff !important;
  transition: all .3s ease-in-out;
}

.mapIndicator:hover {
  width: 14px;
  margin-left: 0px;
}

.mapIndicator.selected {
  width: 18px;
  margin-left: -4px;
}

.mapWrapper:hover .mapIndicator {
  z-index: 2;
}

.mapLabel {
  position: absolute;
  bottom: 0px;
  left: 0px;
  font-size: 11px;
  font-family: monospace;
  color: #FFFFFF;
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: 0px;
  width: 100%;
  user-select: none;
  opacity: 0.4;
  transform: rotate(-90deg);
}

.mapWrapper:hover .mapLabel {
  transform: translate(0px, -10px) rotate(-90deg);
  opacity: 1;
}
`;

export const colors = [
  '#1EA896',
  '#FF6164',
  '#0071BC',
  '#1FB85C',
  '#F75C03',
  '#659B5E',
  '#FAA916',
  '#C2202C',
  '#B52890',
  '#4930F0',
  '#5A136C',
  '#17442B'
];