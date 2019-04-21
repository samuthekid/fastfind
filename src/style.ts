export const ffStyle = `
.ffelem {
  position: relative;
  z-index: 1;
  display: inline-block;
}

.ffelem.hovered,
.ffelem.selected {
  z-index: 2;
}

.ffelem::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -2px;
  right: -2px;
  bottom: -1px;
  background: inherit;
  z-index: -1;
  border-radius: 2px;
  transition: transform .3s ease-in-out;
}

.ffelem.hovered::before {
  transform: scale(1.08);
}

.ffelem.selected::before {
  animation: highlight .6s;
  border: solid 1px #ffffff !important;
  top: -2px;
  left: -3px;
  right: -3px;
  bottom: -2px;
}

@keyframes highlight {
  0% { transform: scale(1); }
  30% { transform: scale(1.08); }
  100% { transform: scale(1); }
}

.repeatLogoWrapper {
  visibility: hidden;
  background-color: #bbbbbb99;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  padding-bottom: 12px;
  border-radius: 20px;
  z-index: 1000000;
}

.repeatLogo {
  transform: rotate(-30deg);
}

.repeatLogoWrapper.active {
  animation: rotateLogoWrapper .8s cubic-bezier(.6, 0, .4, 1);
}

.repeatLogo.active {
  animation: rotateLogo .8s cubic-bezier(.6, 0, .4, 1);
}

@keyframes rotateLogo {
  0% { transform: rotate(-30deg); }
  100% { transform: rotate(80deg); }
}

@keyframes rotateLogoWrapper {
  0% {
    visibility: visible;
    opacity: 0;
  }
  25% { opacity: .7; }
  65% { opacity: .7; }
  100% {
    visibility: hidden;
    opacity: 0;
  }
}

.selectionsMapWrapper {
  width: 10px;
  height: 100vh;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: 10000;
}

.mapIndicator {
  position: absolute;
  width: 100%;
  height: 6px;
  top: -3px;
  right: 0px;
  border: solid 1px #ffffff !important;
  transition: width .3s ease-in-out;
}

.mapIndicator.selected {
  width: 150%;
}

.mapIndicator:hover {
  width: 200%;
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