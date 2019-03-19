import * as findAndReplaceDOMText from 'findandreplacedomtext';
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

/*.ffelem.active,
.ffelem .active::before {
  transform: scale(1.1);
}*/
`;

const colors = [
  '#1EA896',
  '#FF6164',
  '#0071BC',
  '#1FB85C',
  '#F75C03',
  '#659B5E',
  '#FAA916',
  '#C2202C',
  '#B52890',
  '#4930F0',
  '#5A136C',
  '#17442B'
];
let currentColor = 0;

interface FFelement {
  finder: any;
  elements: Array<{ portions: HTMLDivElement[]; active: boolean }>;
}
let selections: FFelement[] = [];

const initFF = () => {
  const style = document.createElement('style');
  style.innerHTML = ffStyle;
  document.head.appendChild(style);

  document.body.addEventListener('keydown', onKeyDown);
};

const onKeyDown = (e: KeyboardEvent) => {
  if (e.srcElement.tagName.toLowerCase() === 'input' || e.metaKey) return false;

  const selectedText = window.getSelection();
  const text = selectedText.toString().trim();

  if (e.key === 'f') {
    if (text) {
      const exists = selections.find(
        selection => selection.finder.options.find === text
      );
      if (exists)
        removeElement(text);
      else
        createElement(text, selectedText);
    } else {
      removeLastElement();
    }
  } else if (e.key === 'd') {
    removeAllElements();
  } else if (e.key === 'r' && selections.length) {
    cycleThroughElements(1);
  } else if (e.key === 'e' && selections.length) {
    cycleThroughElements(-1);
  }
  e.stopPropagation();
};

const cycleThroughElements = (direction: number) => {
  const { elements } = selections[selections.length - 1];
  const current = elements.find(element => element.active);
  let nextIndex = elements.indexOf(current) + direction;
  if (nextIndex >= elements.length) nextIndex = 0;
  else if (nextIndex < 0) nextIndex = elements.length - 1;
  const nextActive = elements[nextIndex];
  current.active = false;
  nextActive.active = true;
  nextActive.portions[0].scrollIntoView({block: 'center'});
};

const removeElement = (text: String) => {
  selections = selections.filter(selection => {
    if (selection.finder.options.find !== text) return true;
    selection.finder.revert();
    return false;
  });
};

const removeLastElement = () => {
  if (selections.length) selections.pop().finder.revert();
};

const removeAllElements = () => {
  selections.forEach(selection => selection.finder.revert());
  selections = [];
};

const createElement = (text: String, selectedText: Selection) => {
  const color = colors[currentColor];
  currentColor =
    currentColor === colors.length - 1 ? 0 : currentColor + 1;
  const contrast = getContrastYIQ(color);
  const currentElements: Array<{
    portions: HTMLDivElement[];
    active: boolean;
  }> = [];
  let portions: HTMLDivElement[] = [];
  let active = false;
  const finder = findAndReplaceDOMText(document.body, {
    preset: 'prose',
    find: text,
    replace: portion => {
      const div = document.createElement('ffelem') as HTMLDivElement;
      div.classList.add('ffelem');
      div.style.backgroundColor = color;
      div.style.color = contrast;
      div.innerHTML = portion.text;
      portions.push(div);

      active = active
        ? active
        : selectedText.baseNode.parentElement ===
          portion.node.parentElement;

      if (portion.isEnd) {
        currentElements.push({ portions, active });
        portions = [];
        active = false;
      }
      return div;
    }
  });
  window.getSelection().empty();
  const currentSelection = { finder, elements: currentElements };
  currentElements.forEach(({ portions }) => {
    portions.forEach(
      div =>
        (div.onmouseover = div.onmouseout = onHover(
          currentSelection
        ))
    );
  });
  selections.push(currentSelection);
};

const onHover = (currentSelection: FFelement) => {
  return (event: MouseEvent) => {
    if (event.type === 'mouseover') {
      currentSelection.elements.forEach(portion =>
        portion.portions.forEach(element => element.classList.add('active'))
      );
    } else {
      currentSelection.elements.forEach(portion =>
        portion.portions.forEach(element => element.classList.remove('active'))
      );
    }
  };
};

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '';
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
  return yiq >= 128 ? 'black' : 'white';
};

initFF();
