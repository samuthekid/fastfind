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

export const renderColor =(color: Array<number>, transparency: number) => {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${transparency})`;
}

export const getContrastYIQ = (color: Array<number>) => {
  const r = color[0];
  const g = color[1];
  const b = color[2];
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
};

export const isElementInViewport = (element: HTMLElement, viewPortDelta: any) => {
  const rect = element.getBoundingClientRect();
  const isInViewport =
    rect.top >= 0 + viewPortDelta && rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) - viewPortDelta &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  return isInViewport;
};

export const getElementParents = node => {
  const nodes = [node]
  for (; node; node = node.parentNode) {
    nodes.unshift(node)
  }
  return nodes;
}

export const getDistanceRelativeToViewport = (elem: HTMLElement) => {
  const {top: topA, height: heightA} = elem.getBoundingClientRect();
  return topA + heightA;
}

export const getRatioPositionRelativeToDocument = (elem: HTMLElement) => {
  const pageHeight = getPageHeight();
  const elementPosition =
    elem.getBoundingClientRect().top +
    (document.documentElement.scrollTop || document.body.scrollTop || 0);
  return elementPosition / pageHeight * 100;
}