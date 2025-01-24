const xSlider = document.getElementById("x-slider");
const yFunc = document.getElementById("y-function");
const yValidity = document.getElementById('y-validation')
const dataPoint = document.getElementById("data-point");
const xAxis = document.getElementById("x-axis");
const yAxis = document.getElementById("y-axis");

const xVal = document.getElementById("x-val");
const yVal = document.getElementById("y-val");

const xMinPx = Number(xAxis.getAttribute("x1")) || 20;
const xMaxPx = Number(xAxis.getAttribute("x2")) || 380;
const yMinPx = Number(yAxis.getAttribute("y1")) || 20;
const yMaxPx = Number(yAxis.getAttribute("y2")) || 380;
const yRange = yMaxPx - yMinPx;

const numberRegex = /[+\-]*(\.\d+|\d+(\.\d+)?)/g;

let valueA = 0, valueB = 0;

/**
 * @param {number} x a porcentagem da posição x entre 0 e 100%
 */
const updatePointPos = (x) => {
  const rangeMax = Number(xSlider.getAttribute("max")) || 100;
  const rangeMin = Number(xSlider.getAttribute("min")) || 0;

  const newX = remap(x, rangeMin, rangeMax, xMinPx, xMaxPx);
  const y = yFuncBuilder(valueA, valueB, x);
  const newY = remap(y, rangeMin, rangeMax, yMaxPx, yMinPx);

  dataPoint.setAttribute("cx", newX);
  dataPoint.setAttribute("cy", newY);
  xVal.innerText = x;
  yVal.innerText = y;
};

/** 
 * @param {number} a 
 * @param {number} b 
 * @param {number} x 
 * @returns {number}
 */
const yFuncBuilder = (a, b, x) => a*x+b;

/**
 * @param {number} value
 * @param {number} inMin
 * @param {number} inMax
 * @param {number} outMin
 * @param {number} outMax
 * @returns {number} remaped value
 */
const remap = (value, inMin, inMax, outMin, outMax) =>
  outMin + ((outMax - outMin) * (value - inMin)) / (inMax - inMin);

updatePointPos(xSlider.value);

xSlider.addEventListener("input", (event) => {
  const value = event.target.value;
  updatePointPos(value);
});

const regex = /^([-+/*]\d+(?:\.\d+)?)*(?:\*[xX])([-+/*]\d+(?:\.\d+)?)*/gm;

const grabY = () => {
  const func = "+" + yFunc.value;
  if (!func.match(regex)) {
    // alert("função malformada");
    yFunc.setCustomValidity("funcão malformada");
    yValidity.innerText = "Função malformada";
    return;
  } else {
    yFunc.setCustomValidity("");
    yValidity.innerText = "";
  }
  const [all, va, vb] = func.matchAll(regex).toArray().at(0);
  
  console.log(all, va, vb)
  valueA = eval(va) || 1;
  valueB = eval(vb) || 0;
  updatePointPos(xSlider.value)
}

grabY()

const visualize = document.getElementById('visualize');
visualize.addEventListener('click', () => grabY());
yFunc.addEventListener('input', () => grabY())