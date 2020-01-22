export const getPageHeight = () => {
  return Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
};

export const getRandomColor = () => {
  return [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ];
};

export const renderColor = (color: Array<number>, transparency: number) => {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${transparency})`;
};

export const getContrastYIQ = (color: Array<number>) => {
  const r = color[0];
  const g = color[1];
  const b = color[2];
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
};

export const isElementInViewport = (
  element: HTMLElement,
  viewPortDelta: any
) => {
  const { top, height, left, bottom, right } = element.getBoundingClientRect();
  const isInViewport =
    left >= 0 &&
    top + height >= 0 + viewPortDelta &&
    right <= (window.innerWidth || document.documentElement.clientWidth) &&
    bottom <=
      (window.innerHeight || document.documentElement.clientHeight) -
        viewPortDelta;
  return isInViewport;
};

export const getElementParents = node => {
  const nodes = [node];
  for (; node; node = node.parentNode) {
    nodes.unshift(node);
  }
  return nodes;
};

export const getDistanceRelativeToViewport = (elem: HTMLElement) => {
  const { top, height } = elem.getBoundingClientRect();
  return top + height / 2 - window.innerHeight / 2;
};

export const getRatioPositionRelativeToDocument = (elem: HTMLElement) => {
  const pageHeight = getPageHeight();
  const elementPosition =
    elem.getBoundingClientRect().top +
    (document.documentElement.scrollTop || document.body.scrollTop || 0);
  return (elementPosition / pageHeight) * 100;
};

export const replaceChildrenWithOriginalContent = (portion: HTMLElement) => {
  while (portion.childNodes.length)
    portion.parentNode.insertBefore(portion.childNodes[0], portion);
  portion.parentNode.removeChild(portion);
};
