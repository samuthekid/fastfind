const masterFinder = `

/* #################### MASTER FINDER #################### */

.masterFinderWrapper {
  display: grid;
  z-index: 1000000;
  grid-template-columns: 10000fr fit-content(100vw) 10000fr;
  box-sizing: border-box;
  align-self: center;
  width: 100vw;
  position: fixed;
  top: 48vh;
  left: 0px;
  cursor: text;
  pointer-events: none;
  transition: var(--animation-settings);
}

.masterFinderWrapper.disabled {
  animation: wrapperAnimation .12s;
  top: 50vh;
  left: 30px;
  opacity: 0;
}

.masterFinderWrapper.noAnim {
  animation: none !important;
}

.masterFinder {
  position: relative;
  min-width: 200px;
  font-size: 28px;
  white-space: nowrap;
  border-bottom: solid 2px white !important;
  text-align: center;
  color: white;
  outline-width: 0;
  background: rgba(0,0,0,0.9);
  padding: 10px 20px;
  box-shadow: 20px 20px 12px 0px rgba(0,0,0,0.85);
  transition: var(--animation-settings);
  pointer-events: all;
}

.masterFinderWrapper.noResults .masterFinder {
  color: #414141;
}

.masterFinderWrapper.disabled .masterFinder {
  animation: finderAnimation .12s;
  box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.85);
  pointer-events: none;
}

.masterFinderWrapper.sleeping .masterFinder {
  animation: wrapperAnimationSleep 3s ease 2s 1 normal forwards;
}

.masterFinder:empty::before {
  content: attr(data-placeholder);
  color: rgba(255,255,255,0.1);
}

.masterFinder::after {
  content: attr(data-info);
  color: #acacac;
  font-size: 11px;
  position: absolute;
  bottom: -1.5px;
  right: 3px;
}

@keyframes wrapperAnimation {
  from {
    top: 48vh;
    left: 0px;
    opacity: 1;
  }
  to {
    top: 50vh;
    left: 30px;
    opacity: 0;
  }
}

@keyframes wrapperAnimationSleep {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.2;
  }
}

@keyframes finderAnimation {
  from {
    box-shadow: 20px 20px 12px 0px rgba(0,0,0,0.85);
  }
  to {
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.85);
  }
}
`;

export default masterFinder;