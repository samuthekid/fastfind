import ffelem from "./ffelem";
import mapButtons from "./mapButtons";
import mapColumns from "./mapColumns";
import mapWrapper from "./mapWrapper";
import masterFinder from "./masterFinder";
import pageLoopLogo from "./pageLoopLogo";
import resetCss from "./resetCss";

const ffStyleVars = `
body {
  --elem-small: 1px;
  --elem-normal: 0px;
  --elem-expanded: -1px;
  --elem-big: -3px;
  --elem-max: -5px;

  --elem-radius: 2px;
  --elem-radius-selected: 3px;

  --selected-animation-duration: 1s;
  --highlight-animation-duration: .3s;
  --highlight-animation-effect: cubic-bezier(.6, 0, .4, 1);

  --animation-settings: all .2s ease;

  --buttons-size: 24px;

  --master-yellow: #FEFF03;
  --master-orange: #FF9631;
}
`;

const ffElementsStyleVar = `
body#ffbody {
  -webkit-font-smoothing: antialiased;
  font-family: Opensans;
  line-height: 1.5;
}

@media print {
  body#ffbody {
    display: none !important;
  }
}
`;

export const ffBodyStyles = [ffStyleVars, ffelem].join("");

export const ffElementStyles = [
  resetCss,
  ffStyleVars,
  ffElementsStyleVar,
  pageLoopLogo,
  masterFinder,
  mapWrapper,
  mapButtons,
  mapColumns
].join("");

export const colors = [
  [30, 168, 150],
  [255, 97, 100],
  [0, 113, 188],
  [31, 184, 92],
  [247, 92, 3],
  [101, 155, 94],
  [250, 169, 22],
  [194, 32, 44],
  [181, 40, 144],
  [73, 48, 240],
  [90, 19, 108],
  [23, 68, 43]
];
