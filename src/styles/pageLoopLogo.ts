const pageLoopLogo = `

/* #################### PAGE LOOP LOGO #################### */

.repeatLogoWrapper {
  opacity: 0;
  background-color: rgba(0,0,0,1.0);
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
  filter: invert(1);
  opacity: 0.4;
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
`;

export default pageLoopLogo;