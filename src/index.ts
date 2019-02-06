import * as findAndReplaceDOMText from "findandreplacedomtext";
const ffStyle = `
.ffelem {
  position: relative;
  z-index: 1;
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

const colors = [
  "#1EA896",
  "#FF6164",
  "#0071BC",
  "#1FB85C",
  "#F75C03",
  "#659B5E",
  "#FAA916",
  "#C2202C",
  "#B52890",
  "#4930F0",
  "#5A136C",
  "#17442B"
];
let currentColor = 0;

interface Selection {
  finder: any;
  portions: Array<{ elements: HTMLDivElement[]; active: boolean }>;
}
let selections: Selection[] = [];

const initFF = () => {
  console.log("asdasd");
  const style = document.createElement("style");
  style.innerHTML = ffStyle;
  document.head.appendChild(style);

  document.body.addEventListener("keydown", onKeyDown);
};

const onKeyDown = (e: KeyboardEvent) => {
  if (e.srcElement.tagName.toLowerCase() === "input" || e.metaKey) return false;
  if (e.key === "f") {
    const selectedText = window.getSelection();
    const text = selectedText.toString().trim();
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
        const color = colors[currentColor];
        currentColor =
          currentColor === colors.length - 1 ? 0 : currentColor + 1;
        const contrast = getContrastYIQ(color);
        const currentElements: Array<{
          elements: HTMLDivElement[];
          active: boolean;
        }> = [];
        let portions: HTMLDivElement[] = [];
        let active = false;
        const finder = findAndReplaceDOMText(document.body, {
          preset: "prose",
          find: text,
          replace: (portion, match) => {
            const div = document.createElement("ffelem") as HTMLDivElement;
            div.classList.add("ffelem");
            div.style.backgroundColor = color;
            div.style.color = contrast;
            div.innerHTML = portion.text;
            portions.push(div);

            active = active
              ? active
              : selectedText.baseNode.parentElement ===
                portion.node.parentElement;

            if (portion.isEnd) {
              currentElements.push({
                elements: portions,
                active
              });
              portions = [];
              active = false;
            }
            return div;
          }
        });
        window.getSelection().empty();
        const currentSelection = { finder, portions: currentElements };
        currentElements.forEach(({ elements }) => {
          elements.forEach(
            element =>
              (element.onmouseover = element.onmouseout = onHover(
                currentSelection
              ))
          );
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

const onHover = (currentSelection: Selection) => {
  return (event: MouseEvent) => {
    if (event.type === "mouseover") {
      currentSelection.portions.forEach(portion =>
        portion.elements.forEach(element => element.classList.add("active"))
      );
    } else {
      currentSelection.portions.forEach(portion =>
        portion.elements.forEach(element => element.classList.remove("active"))
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

initFF();
