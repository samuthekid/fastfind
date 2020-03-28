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
  top: 10px;
  left: 0px;
  cursor: text;
  pointer-events: none;
  transition: var(--animation-settings);
}

.masterFinderWrapper.disabled {
  animation: wrapperAnimation .12s;
  top: 20px;
  left: 10px;
  opacity: 0;
}

.masterFinderWrapper.noAnim {
  animation: none;
}

.masterFinder {
  position: relative;
  min-width: 200px;
  font-size: 28px;
  white-space: nowrap;
  text-align: center;
  color: white;
  outline-width: 0;
  background: rgba(0,0,0,1.0);
  padding: 6px 30px 18px 30px;
  box-shadow: 14px 14px 12px 0px rgba(0,0,0,0.85);
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
  color: rgba(255,255,255,0.2);
}

.masterFinder::after {
  content: attr(data-info);
  color: rgba(255,255,255,1.0);
  font-size: 13px;
  position: absolute;
  bottom: -1px;
  right: 3px;
}

@keyframes wrapperAnimation {
  from {
    top: 10px;
    left: 0px;
    opacity: 1;
  }
  to {
    top: 20px;
    left: 10px;
    opacity: 0;
  }
}

@keyframes wrapperAnimationSleep {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.3;
  }
}

@keyframes finderAnimation {
  from {
    box-shadow: 14px 14px 12px 0px rgba(0,0,0,0.85);
  }
  to {
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.85);
  }
}
`;

export default masterFinder;
