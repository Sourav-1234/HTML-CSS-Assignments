let sections = [];

function addSection() {
    const title = document.getElementById("sectionTitle").value.trim();
    const content = document.getElementById("sectionContent").value.trim();

    if (!title || !content) {
        alert("Enter valid details");
        return;
    }

    sections.push({
        id: Date.now(),
        title,
        content
    });

    document.getElementById("sectionTitle").value = "";
    document.getElementById("sectionContent").value = "";

    render();
}

function deleteSection(id) {
    sections = sections.filter(sec => sec.id !== id);
    render();
}

function updateSection(id, field, value) {
    const section = sections.find(sec => sec.id === id);
    section[field] = value;
    renderPreview();
}

function render() {
    const container = document.getElementById("sections");

    container.innerHTML = "";

    sections.forEach(sec => {
        const div = document.createElement("div");
        div.className = "section-card";
        div.draggable = true;
        div.dataset.id = sec.id;

        div.innerHTML = `
            <input value="${sec.title}" 
                   oninput="updateSection(${sec.id}, 'title', this.value)">
            <textarea oninput="updateSection(${sec.id}, 'content', this.value)">
${sec.content}</textarea>
            <div class="actions">
                <span class="delete" onclick="deleteSection(${sec.id})">Delete</span>
            </div>
        `;

        div.addEventListener("dragstart", dragStart);

        container.appendChild(div);
    });

    renderPreview();
}

function renderPreview() {
    const preview = document.getElementById("preview");

    preview.innerHTML = sections.map(sec => `
        <div class="preview-section">
            <h3>${sec.title}</h3>
            <p>${sec.content}</p>
        </div>
    `).join("");
}

function dragStart(e) {
    e.dataTransfer.setData("id", e.target.dataset.id);
}

document.getElementById("sections").addEventListener("dragover", e => {
    e.preventDefault();
});

document.getElementById("sections").addEventListener("drop", e => {
    e.preventDefault();

    const draggedId = e.dataTransfer.getData("id");
    const target = e.target.closest(".section-card");

    if (!target) return;

    const targetId = target.dataset.id;

    const draggedIndex = sections.findIndex(s => s.id == draggedId);
    const targetIndex = sections.findIndex(s => s.id == targetId);

    const [draggedItem] = sections.splice(draggedIndex, 1);
    sections.splice(targetIndex, 0, draggedItem);

    render();
});