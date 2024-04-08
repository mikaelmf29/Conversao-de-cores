document.getElementById("rgbToHsv").addEventListener("click", function() {
  const r = document.getElementById("r").value;
  const g = document.getElementById("g").value;
  const b = document.getElementById("b").value;
  rgbToHsv(r, g, b);
});

document.getElementById("rgbToCmyk").addEventListener("click", function() {
  const r = document.getElementById("r").value;
  const g = document.getElementById("g").value;
  const b = document.getElementById("b").value;
  rgbToCmyk(r, g, b);
});

document.getElementById("cmykToRgb").addEventListener("click", function() {
  const c = document.getElementById("c").value;
  const m = document.getElementById("m").value;
  const y = document.getElementById("y").value;
  const k = document.getElementById("k").value;
  cmykToRgb(c, m, y, k);
});

document.getElementById("hsvToRgb").addEventListener("click", function() {
  const h = document.getElementById("h").value;
  const s = document.getElementById("s").value;
  const v = document.getElementById("v").value;
  hsvToRgb(h, s, v);
});

document.getElementById("rgbToGray").addEventListener("click", function() {
  const r = document.getElementById("r").value;
  const g = document.getElementById("g").value;
  const b = document.getElementById("b").value;
  rgbToGray(r, g, b);
});


function anglToRad(deg) {
  return deg * (Math.PI / 180);
}

const rgbToHsv = (r, g, b) => {
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    document.getElementById("result").innerText = "Esse valor não é válido";
  }
  r /= 255;
  g /= 255;
  b /= 255;
  let max2 = Math.max(r, g, b);
  let min2 = Math.min(r, g, b);
  let diff = max2 - min2;
  let h;
  let s;
  let v = max2;

  if (diff == 0) {
    h = 0;
  } else if (max2 == r) {
    h = (60 * ((g - b) / diff) + 360) % 360;
  } else if (max2 == g) {
    h = (60 * ((b - r) / diff) + 120) % 360;
  } else {
    h = (60 * ((r - g) / diff) + 240) % 360;
  }

  if (max2 == 0) {
    s = 0;
  } else {
    s = (diff / max2) * 100;
  }

  h = Math.round(h);
  s = Math.round(s);
  v = Math.round(v * 100);

  document.getElementById("result").innerText = `H: ${h} S: ${s.toFixed(2)} V: ${v.toFixed(2)}`;
}

const hsvToRgb = (h, s, v) => {
  if (h < 0 || h > 360 || s < 0 || s > 100 || v < 0 || v > 100) {
    document.getElementById("result").innerText = "Esse valor não é válido";
  }
  s = s / 100;
  v = v / 100;
  let c = v * s;
  let x = c * (1 - Math.abs(Math.floor(h / 60) % 2 - 1));
  let m = v - c;
  let r;let g;
  let b;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else {
    r = x;
    g = 0;
    b = c;
  }
  const R = Math.round((r + m) * 255);
  const G = Math.round((g + m) * 255);
  const B = Math.round((b + m) * 255);

  document.getElementById("result").innerText = `R: ${R} G: ${G} B: ${B}`;
}

const rgbToCmyk = (r, g, b) => {
  r = r / 255;
  g = g / 255;
  b = b / 255;

  const k = 1 - Math.max(r, g, b);
  const c = Math.round((1 - r - k) / (1 - k) * 100);
  const m = Math.round((1 - g - k) / (1 - k) * 100);
  const y = Math.round((1 - b - k) / (1 - k) * 100);

  document.getElementById("result").innerText = `C: ${c} M: ${m} Y: ${y} K: ${Math.round(k * 100)}`;
}

const cmykToRgb = (c, m, y, k) => {
  c = c / 100;
  m = m / 100;
  y = y / 100;
  k = k / 100;

  const r = Math.round(255 * (1 - c) * (1 - k));
  const g = Math.round(255 * (1 - m) * (1 - k));
  const b = Math.round(255 * (1 - y) * (1 - k));

  document.getElementById("result").innerText = `R: ${r} G: ${g} B: ${b}`;
}



const rgbToGray = (r, g, b) => {
  const gray = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
  document.getElementById("result").innerText = `Gray: ${gray}`;
}