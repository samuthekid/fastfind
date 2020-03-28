const mapButtons = `

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
  border: solid .5px white;
  transition:
    border .2s ease,
    width .2s ease,
    height .2s ease,
    margin .2s ease,
    opacity .2s ease,
    background .2s ease;
}

.selectionsMapWrapper.lightTheme .mapOpacity {
  border: solid .5px black;
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
`;

export default mapButtons;
