function setupCanvas(e, t) {
  let r = window.devicePixelRatio || 1;
  return (
    (e.width = e.clientWidth * r),
    (e.height = e.clientHeight * r),
    t.scale(r, r),
    r
  );
}
const colorBrightBlue = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--color-bright-blue"),
  colorDarkBlue = getComputedStyle(document.documentElement).getPropertyValue(
    "--color-dark-blue"
  ),
  colorMediumMagneta = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--color-medium-magneta"),
  colorDarkGrey = getComputedStyle(document.documentElement).getPropertyValue(
    "--color-dark-grey"
  ),
  colorMediumRed = getComputedStyle(document.documentElement).getPropertyValue(
    "--color-medium-red"
  ),
  colorLightGreen = getComputedStyle(document.documentElement).getPropertyValue(
    "--color-light-green"
  ),
  progressBarColorCodes = Array.of(
    colorDarkBlue,
    colorMediumMagneta,
    colorDarkGrey,
    colorMediumRed,
    colorLightGreen
  );
function animatePrimarySkills() {
  let e = Math.PI + Math.PI / 2,
    t,
    r,
    o,
    l,
    n = e;
  function a(i, c) {
    var d;
    (n += Math.PI / 360),
      (d = i).clearRect(0, 0, t, r),
      d.beginPath(),
      d.arc(o, l, 70, e, n),
      (d.strokeStyle = colorBrightBlue),
      (d.lineWidth = 4),
      d.stroke(),
      n < c && requestAnimationFrame(() => a(i, c));
  }
  let i = document.getElementsByClassName("progress-circle");
  for (let c of i) {
    let d = c.getContext("2d");
    (t = c.clientWidth), (r = c.clientHeight), (o = t / 2), (l = r / 2);
    let g = parseInt(c.getAttribute("data-percentage")),
      s = e + (2 * Math.PI * g) / 100;
    a(d, s);
  }
}
function animateSecondarySkills() {
  let e = 0,
    t = 0,
    r = 0,
    o = 0;
  function l(n, a, i) {
    var c, d;
    (e += 2),
      (c = n),
      (d = a),
      c.clearRect(0, 0, r, o),
      c.beginPath(),
      c.moveTo(0, t),
      c.lineTo(e, t),
      (c.strokeStyle = d),
      (c.lineWidth = 4),
      c.stroke(),
      e < i && requestAnimationFrame(() => l(n, a, i));
  }
  let n = document.getElementsByClassName("progress-bar"),
    a = 0;
  for (let i of n) {
    let c = i.getContext("2d");
    setupCanvas(i, c), (r = i.clientWidth), (t = (o = i.clientHeight) / 2);
    let d = parseInt(i.getAttribute("data-percentage")),
      g = (r * d) / 100;
    a %= progressBarColorCodes.length;
    let s = progressBarColorCodes[a++];
    l(c, s, g);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".fade-in-section");

  const options = {
    root: null, // relative to document viewport
    rootMargin: "0px", // margin around root
    threshold: 0.1, // visible amount of item shown in viewport
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target); // stop observing after fade-in

        if (entry.target.id === "primarySkill") {
          animatePrimarySkills();
        }

        if (entry.target.id === "secondarySkill") {
          animateSecondarySkills();
        }
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
});
