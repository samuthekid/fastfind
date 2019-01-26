let colorsCnt = 0;
const colorsTotal = 12;
const colorsCSS = `
.ffelem {
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

.ffelem {
  transition: transform .3s;
}

.active,
.active::before {
  transform: scale(1.1);
}
`;

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
          const color = getRandomColor();
          const contrast = getContrastYIQ(color);
          const currentElements = [];
          const finder = findAndReplaceDOMText(document.body, {
            preset: "prose",
            find: text,
            replace: function(portion, match) {
              const div = document.createElement("div");
              div.classList.add("ffelem");
              div.style.backgroundColor = `#${color}`;
              div.style.color = contrast;
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
  };
};

const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getContrastYIQ = hexcolor => {
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
};

window.onload = initFF();
