const addBtn = document.getElementById("addTask");
const taskInput = document.getElementById("taskText");

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();

  if (!text) return;

  const task = createTask(text);
  document.getElementById("todo").appendChild(task);

  taskInput.value = "";
});

function createTask(text) {
  const div = document.createElement("div");
  div.classList.add("task");
  div.draggable = true;
  div.innerText = text;

  div.addEventListener("dragstart", () => {
    div.classList.add("dragging");
  });

  div.addEventListener("dragend", () => {
    div.classList.remove("dragging");
  });

  return div;
}

const columns = document.querySelectorAll(".task-list");

columns.forEach(column => {
  column.addEventListener("dragover", e => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    column.appendChild(dragging);
  });
});