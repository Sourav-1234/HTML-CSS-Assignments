let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveState() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function addHabit() {
    const input = document.getElementById("habitInput");
    const category = document.getElementById("categorySelect").value;

    if (!input.value.trim()) {
        alert("Enter a habit");
        return;
    }

    const habit = {
        id: Date.now(),
        text: input.value,
        category,
        status: "todo"
    };

    habits.push(habit);
    input.value = "";

    render();
    saveState();
}

function deleteHabit(id) {
    habits = habits.filter(h => h.id !== id);
    render();
    saveState();
}

function render() {
    document.getElementById("todo").innerHTML = "";
    document.getElementById("progress").innerHTML = "";
    document.getElementById("done").innerHTML = "";

    habits.forEach(habit => {
        const div = document.createElement("div");
        div.className = "habit";
        div.draggable = true;
        div.dataset.id = habit.id;

        div.innerHTML = `
            <div>
                ${habit.text}
                <small>${habit.category}</small>
            </div>
            <span class="delete" onclick="deleteHabit(${habit.id})">✕</span>
        `;

        div.addEventListener("dragstart", dragStart);

        document.getElementById(habit.status).appendChild(div);
    });
}

function dragStart(e) {
    e.dataTransfer.setData("id", e.target.dataset.id);
}

document.querySelectorAll(".dropzone").forEach(zone => {
    zone.addEventListener("dragover", e => e.preventDefault());

    zone.addEventListener("drop", e => {
        const id = e.dataTransfer.getData("id");
        const habit = habits.find(h => h.id == id);

        habit.status = zone.id;

        render();
        saveState();
    });
});

render();