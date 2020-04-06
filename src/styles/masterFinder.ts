const masterFinder = `

/* #################### MASTER FINDER #################### */

.masterFinderWrapper {
  display: flex;
  z-index: 1000000;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
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
  max-width: 90vw;
  height: 44px;
  font-size: 28px;
  white-space: nowrap;
  color: white;
  outline-width: 0;
  background: rgba(0,0,0,1.0);
  padding: 6px 18px 30px;
  border: 0px;
  border-bottom: solid 1px white;

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

.masterFinderWrapper.sleeping .masterFinder:focus {
  animation: none;
}

.masterFinderLabel {
  position: relative;
}

.masterFinderLabel::after {
  content: attr(data-info);
  color: rgba(255,255,255,1.0);
  font-size: 12px;
  position: absolute;
  bottom: 0px;
  right: 4px;
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
    opacity: 0.4;
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
