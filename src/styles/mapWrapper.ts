const mapWrapper = `

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
`;

export default mapWrapper;