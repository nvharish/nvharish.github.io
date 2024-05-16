function setupCanvas(canvas, ctx) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.scale(dpr, dpr);
  return dpr;
}

const colorBrightBlue = getComputedStyle(
  document.documentElement
).getPropertyValue("--color-bright-blue");
const colorDarkBlue = getComputedStyle(
  document.documentElement
).getPropertyValue("--color-dark-blue");
const colorMediumMagneta = getComputedStyle(
  document.documentElement
).getPropertyValue("--color-medium-magneta");
const colorDarkGrey = getComputedStyle(
  document.documentElement
).getPropertyValue("--color-dark-grey");
const colorMediumRed = getComputedStyle(
  document.documentElement
).getPropertyValue("--color-medium-red");
const colorLightGreen = getComputedStyle(
  document.documentElement
).getPropertyValue("--color-light-green");

const progressBarColorCodes = Array.of(
  colorDarkBlue,
  colorMediumMagneta,
  colorDarkGrey,
  colorMediumRed,
  colorLightGreen
);

function animatePrimarySkills() {
  const lineWidth = 4,
    r = 75,
    startAngle = Math.PI + Math.PI / 2;

  let width,
    height,
    x,
    y,
    endAngle = startAngle;

  function drawArc(ctx) {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(x, y, r, startAngle, endAngle);
    ctx.strokeStyle = colorBrightBlue;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  function animateArc(ctx, targetAngle) {
    endAngle += Math.PI / 180;
    drawArc(ctx);
    if (endAngle < targetAngle) {
      requestAnimationFrame(() => animateArc(ctx, targetAngle));
    }
  }

  const canvases = document.getElementsByClassName("progress-circle");
  for (const canvas of canvases) {
    const ctx = canvas.getContext("2d");
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    x = width / 2;
    y = height / 2;
    const percentage = parseInt(canvas.getAttribute("data-percentage"));
    const targetAngle = startAngle + (Math.PI * 2 * percentage) / 100;
    animateArc(ctx, targetAngle);
  }
}

function animateSecondarySkills() {
  let x = 0,
    y = 0,
    width = 0,
    height = 0;
  const lineWidth = 4;

  function drawLine(ctx, color) {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  function animateLine(ctx, color, target) {
    x += 2;
    drawLine(ctx, color);
    if (x < target) {
      requestAnimationFrame(() => animateLine(ctx, color, target));
    }
  }

  const canvases = document.getElementsByClassName("progress-bar");
  let colorIndex = 0;
  for (const canvas of canvases) {
    const ctx = canvas.getContext("2d");
    setupCanvas(canvas, ctx);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    y = height / 2;
    const percentage = parseInt(canvas.getAttribute("data-percentage"));
    const target = (width * percentage) / 100;
    colorIndex %= progressBarColorCodes.length;
    const color = progressBarColorCodes[colorIndex++];
    animateLine(ctx, color, target);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  animatePrimarySkills();
  animateSecondarySkills();
});
