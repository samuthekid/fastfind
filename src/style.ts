export const ffStyle = `
.ffelem {
  position: relative;
  z-index: 1;
  display: inline-block;
}

.ffelem.hovered  { z-index: 2; }
.ffelem.selected { z-index: 3; }

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
  animation: rotateLogo .8s cubic-bezier(.6, 0, .4, 1);
}
@keyframes rotateLogo {
  0%   { transform: rotate(-30deg); }
  100% { transform: rotate( 80deg); }
}

.repeatLogoWrapper.active {
  animation: rotateLogoWrapper .8s cubic-bezier(.6, 0, .4, 1);
}
@keyframes rotateLogoWrapper {
  0%   { opacity: 0; }
  25%  { opacity: 1; }
  65%  { opacity: 1; }
  100% { opacity: 0; }
}

.selectionsMapWrapper {
  display: flex;
  min-width: 10px;
  height: 100vh;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: 10000;
  background: linear-gradient(
    rgba(0,0,0,0.1) 0%,
    rgba(0,0,0,0.05) 50%,
    rgba(0,0,0,0.1) 100%
  );
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

.mapIndicator {
  position: absolute;
  right: 0px;
  width: 10px;
  height: 6px;
  margin-left: 4px;
  border: solid 1px #ffffff !important;
  transition: all .3s ease-in-out;
}

.mapIndicator.selected {
  width: 14px;
  margin-left: 0px;
}

.mapIndicator:hover {
  width: 18px;
  margin-left: -4px;
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