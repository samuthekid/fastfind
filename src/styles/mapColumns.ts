const mapColumns = `

/* #################### MAP WRAPPER #################### */

.selectionsMapWrapper .mapWrapper {
  position: absolute;
  right: 0px;
  width: 14px;
  height: 100vh;
  opacity: 0.6;
}

.selectionsMapWrapper:hover .mapWrapper,
.selectionsMapWrapper.fixed .mapWrapper {
  position: relative;
  opacity: 1;
}

.mapWrapper.selected {
  z-index: 3;
  opacity: 1;
}

.mapWrapper.master {
  z-index: 4;
  opacity: 1;
  background: rgba(0,0,0,0.2);
}

.selectionsMapWrapper.lightTheme .mapWrapper.master {
  background: rgba(255,255,255,0.5);
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
  border: solid 0.5px rgba(255,255,255,0.4) !important;
  width: 14px;
  margin-left: 0px;
}

.mapWrapper.selected .mapIndicator:hover,
.mapWrapper.selected .mapIndicator.hovered {
  width: 14px;
  margin-left: 0px;
}

.mapWrapper.master .mapIndicator.selected,
.mapWrapper.selected .mapIndicator.selected {
  width: 18px;
  margin-left: -4px;
  z-index: 1;
}

.mapWrapper.selected .mapIndicator.selected {
  border: solid 0.5px rgba(255,255,255,1.0) !important;
}

.mapWrapper.master .mapIndicator {
  background-color: var(--master-yellow);
}

.mapWrapper.master .mapIndicator.selected {
  background-color: var(--master-orange);
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

.mapWrapper.master .mapLabel,
.mapWrapper.selected .mapLabel {
  visibility: visible;
  margin-top: 12vh;
  padding-top: 10vh;
  color: rgba(255,255,255,1.0);
}

.mapWrapper.master .mapLabel {
  color: rgba(0,0,0,1.0);
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

export default mapColumns;
