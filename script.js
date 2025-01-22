const xSlider = document.getElementById("x-slider");
const dataPoint = document.getElementById("data-point");
const xAxis = document.getElementById("x-axis");
const yAxis = document.getElementById("y-axis");

const xMinPx = Number(xAxis.getAttribute("x1")) || 20;
const xMaxPx = Number(xAxis.getAttribute("x2")) || 380;
const yMinPx = Number(yAxis.getAttribute("y1")) || 20;
const yMaxPx = Number(yAxis.getAttribute("y2")) || 380;

/**
 * @param {number} x a porcentagem da posição x entre 0 e 100%
 */
const updatePointPos = (x) => {
  const rangeMax = Number(xSlider.getAttribute("max")) || 100;
  const rangeMin = Number(xSlider.getAttribute("min")) || 0;

  const newX = remap(x, rangeMin, rangeMax, xMinPx, xMaxPx);
  const y = Math.sin(x * 0.125) * 20 + 50;
  const newY = remap(y, rangeMin, rangeMax, yMaxPx, yMinPx);

  dataPoint.setAttribute("cx", newX);
  dataPoint.setAttribute("cy", newY);
};

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
