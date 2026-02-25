const body = document.body;
const panel = document.getElementById("colorPanel");
const picker = document.getElementById("colorPicker");
const addBtn = document.getElementById("addColor");

// Change background on preset click
panel.addEventListener("click", (e) => {
  if (e.target.classList.contains("color-btn")) {
    const color = e.target.dataset.color;
    body.style.background = color;
  }
});

// Add custom color
addBtn.addEventListener("click", () => {
  const color = picker.value;

  const btn = document.createElement("button");
  btn.classList.add("color-btn");
  btn.style.background = color;
  btn.dataset.color = color;

  panel.appendChild(btn);
});