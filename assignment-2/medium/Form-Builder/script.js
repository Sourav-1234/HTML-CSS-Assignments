const addBtn = document.getElementById("addField");
const labelInput = document.getElementById("labelInput");
const fieldType = document.getElementById("fieldType");
const preview = document.getElementById("formPreview");

addBtn.addEventListener("click", () => {
  const label = labelInput.value.trim();
  const type = fieldType.value;

  if (!label) return;

  const field = document.createElement("div");
  field.classList.add("field");

  const fieldLabel = document.createElement("label");
  fieldLabel.innerText = label;

  field.appendChild(fieldLabel);

  if (type === "text") {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = label;
    input.style.width = "100%";
    input.style.padding = "8px";
    input.style.borderRadius = "6px";
    input.style.border = "1px solid #ccc";

    field.appendChild(input);
  }

  if (type === "checkbox") {
    const wrapper = document.createElement("div");

    const input = document.createElement("input");
    input.type = "checkbox";

    const text = document.createElement("span");
    text.innerText = " " + label;

    wrapper.appendChild(input);
    wrapper.appendChild(text);

    field.appendChild(wrapper);
  }

  if (type === "radio") {
    const group = document.createElement("div");
    group.classList.add("option-group");

    ["Option 1", "Option 2"].forEach(optionText => {
      const wrapper = document.createElement("label");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = label;

      wrapper.appendChild(radio);
      wrapper.append(" " + optionText);

      group.appendChild(wrapper);
    });

    field.appendChild(group);
  }

  preview.appendChild(field);
  labelInput.value = "";
});