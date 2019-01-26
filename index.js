let colorsCnt = 0;
const colorsTotal = 12;
const colorsCSS = `
.ffelem {
  color: #F6F6F6;
  position: relative;
  z-index: 0;
  display: inline-block;
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
  transition: transform .3s;
}
.active::before {
  transform: scale(1.1);
}
.color0 { background-color: #1EA896 }
.color1 { background-color: #FF6164 }
.color2 { background-color: #0071BC }
.color3 { background-color: #1FB85C }
.color4 { background-color: #F75C03 }
.color5 { background-color: #659B5E }
.color6 { background-color: #FAA916 }
.color7 { background-color: #C2202C }
.color8 { background-color: #B52890 }
.color9 { background-color: #4930F0 }
.color10 { background-color: #5A136C }
.color11 { background-color: #17442B }`;

let selections = [];

const initFF = () => {
  const onKeyDown = e => {
    if (e.target.nodeName === "INPUT" || event.metaKey) return false;

    if (e.key === "f") {
      const text = window
        .getSelection()
        .toString()
        .trim();
      if (text) {
        const finder = selections.find(
          selection => selection.finder.options.find === text
        );
        if (finder) {
          selections = selections.filter(selection => {
            if (selection.finder.options.find !== text) return true;
            selection.finder.revert();
            return false;
          });
        } else {
          const color = `color${colorsCnt++ % colorsTotal}`;
          const currentElements = [];
          const finder = findAndReplaceDOMText(document.body, {
            preset: "prose",
            find: text,
            replace: function(portion, match) {
              const div = document.createElement("div");
              div.classList.add("ffelem", color);
              div.innerHTML = portion.text;
              currentElements.push(div);
              return div;
            }
          });
          window.getSelection().empty();
          const currentSelection = { finder, elements: currentElements };
          currentElements.forEach(element => {
            element.onmouseover = onHover(currentSelection);
            element.onmouseout = onHover(currentSelection);
          });
          selections.push(currentSelection);
        }
      } else {
        if (selections.length) {
          selections.pop().finder.revert();
        }
      }
    } else if (e.key === "d") {
      selections.forEach(selection => selection.finder.revert());
      selections = [];
    }
  };

  const style = document.createElement("style");
  style.innerHTML = colorsCSS;
  document.head.appendChild(style);

  document.body.addEventListener("keydown", onKeyDown);
};

const onHover = currentSelection => {
  return event => {
    if (event.type === "mouseover") {
      currentSelection.elements.forEach(element =>
        element.classList.add("active")
      );
    } else {
      currentSelection.elements.forEach(element =>
        element.classList.remove("active")
      );
    }
    console.log(event, currentSelection);
  };
};

window.onload = initFF();
