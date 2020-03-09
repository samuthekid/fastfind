const ffelem = `

/* #################### FFELEM #################### */

.ffelemMaster {
  color: black;
  background-color: var(--master-yellow);
}

.ffelemMaster.selected {
  background-color: var(--master-orange);
}

.ffelem {
  position: relative;
  z-index: 1;
  display: inline-block;
  border-top-left-radius: var(--elem-radius);
  border-bottom-left-radius: var(--elem-radius);
  border-top-right-radius: var(--elem-radius);
  border-bottom-right-radius: var(--elem-radius);
  transition: var(--animation-settings);
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
  transition: var(--animation-settings);
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
  transition: var(--animation-settings);
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
  transition: var(--animation-settings);
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
  transition: var(--animation-settings);
}



.ffelem.selectedClass::before {
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  border-left: solid 1px rgba(255,255,255,0.4) !important;
  border-right: solid 1px rgba(255,255,255,0.4) !important;
  top: var(--elem-expanded);
  left: var(--elem-expanded);
  right: var(--elem-expanded);
  bottom: var(--elem-expanded);
}

.ffelemMiddle.selectedClass::before {
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  top: var(--elem-expanded);
  bottom: var(--elem-expanded);
}

.ffelemStart.selectedClass::before {
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  border-left: solid 1px rgba(255,255,255,0.4) !important;
  top: var(--elem-expanded);
  left: var(--elem-expanded);
  bottom: var(--elem-expanded);
}

.ffelemEnd.selectedClass::before {
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  border-right: solid 1px rgba(255,255,255,0.4) !important;
  top: var(--elem-expanded);
  right: var(--elem-expanded);
  bottom: var(--elem-expanded);
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
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  border-left: solid 1px rgba(255,255,255,0.4) !important;
  border-right: solid 1px rgba(255,255,255,0.4) !important;
}

.ffelemMiddle.hovered::before {
  top: var(--elem-big);
  bottom: var(--elem-big);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
}

.ffelemStart.hovered::before {
  top: var(--elem-big);
  left: var(--elem-big);
  bottom: var(--elem-big);
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  border-left: solid 1px rgba(255,255,255,0.4) !important;
}

.ffelemEnd.hovered::before {
  top: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,0.4) !important;
  border-bottom: solid 1px rgba(255,255,255,0.4) !important;
  border-right: solid 1px rgba(255,255,255,0.4) !important;
}



.ffelem.selected::before {
  animation:
    highlight var(--highlight-animation-duration) var(--highlight-animation-effect),
    border 1.6s var(--highlight-animation-effect) infinite;
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,1.0) !important;
  border-bottom: solid 1px rgba(255,255,255,1.0) !important;
  border-left: solid 1px rgba(255,255,255,1.0) !important;
  border-right: solid 1px rgba(255,255,255,1.0) !important;
  top: var(--elem-big);
  left: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemMiddle.selected::before {
  animation:
    highlightMiddle var(--highlight-animation-duration) var(--highlight-animation-effect),
    border 1.6s var(--highlight-animation-effect) infinite;
  border-top: solid 1px rgba(255,255,255,1.0) !important;
  border-bottom: solid 1px rgba(255,255,255,1.0) !important;
  top: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemStart.selected::before {
  animation:
    highlightStart var(--highlight-animation-duration) var(--highlight-animation-effect),
    border 1.6s var(--highlight-animation-effect) infinite;
  border-top-left-radius: var(--elem-radius-selected);
  border-bottom-left-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,1.0) !important;
  border-bottom: solid 1px rgba(255,255,255,1.0) !important;
  border-left: solid 1px rgba(255,255,255,1.0) !important;
  top: var(--elem-big);
  left: var(--elem-big);
  bottom: var(--elem-big);
}

.ffelemEnd.selected::before {
  animation:
    highlightEnd var(--highlight-animation-duration) var(--highlight-animation-effect),
    border 1.6s var(--highlight-animation-effect) infinite;
  border-top-right-radius: var(--elem-radius-selected);
  border-bottom-right-radius: var(--elem-radius-selected);
  border-top: solid 1px rgba(255,255,255,1.0) !important;
  border-bottom: solid 1px rgba(255,255,255,1.0) !important;
  border-right: solid 1px rgba(255,255,255,1.0) !important;
  top: var(--elem-big);
  right: var(--elem-big);
  bottom: var(--elem-big);
}



/* #################### FFELEM ANIMATIONS #################### */

@keyframes border {
  0% {
    border-color: white;
    filter: brightness(1.2);
  }
  50% {
    border-color: black;
    filter: brightness(0.9);
  }
  100% {
    border-color: white;
    filter: brightness(1.2);
  }
}

@keyframes highlight {
  0% {
    top: var(--elem-normal);
    left: var(--elem-normal);
    right: var(--elem-normal);
    bottom: var(--elem-normal);
  }
  60% {
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
    top: var(--elem-normal);
    bottom: var(--elem-normal);
  }
  60% {
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
    top: var(--elem-normal);
    left: var(--elem-normal);
    bottom: var(--elem-normal);
  }
  60% {
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
    top: var(--elem-normal);
    right: var(--elem-normal);
    bottom: var(--elem-normal);
  }
  60% {
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
`;

export default ffelem;
