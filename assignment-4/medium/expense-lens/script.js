let expenses = [];
let chart;

function addTransaction() {
    const amount = document.getElementById("amount").value;
    const desc = document.getElementById("desc").value;
    const category = document.getElementById("category").value;

    if (!amount || !desc) {
        alert("Enter valid details");
        return;
    }

    const transaction = {
        id: Date.now(),
        amount: parseFloat(amount),
        desc,
        category
    };

    expenses.push(transaction);

    document.getElementById("amount").value = "";
    document.getElementById("desc").value = "";

    renderTransactions(expenses);
    updateBalance();
    updateChart();
}

function deleteTransaction(id) {
    expenses = expenses.filter(exp => exp.id !== id);

    renderTransactions(expenses);
    updateBalance();
    updateChart();
}

function renderTransactions(data) {
    const container = document.getElementById("transactions");

    container.innerHTML = data.map(exp => `
        <tr>
            <td>₹${exp.amount}</td>
            <td>${exp.desc}</td>
            <td>${exp.category}</td>
            <td>
                <span class="delete-btn" onclick="deleteTransaction(${exp.id})">
                    Delete
                </span>
            </td>
        </tr>
    `).join("");
}

function updateBalance() {
    const balance = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    document.getElementById("balance").innerText = `₹${balance}`;
}

function filterTransactions() {
    const filter = document.getElementById("filter").value;

    if (filter === "All") {
        renderTransactions(expenses);
    } else {
        const filtered = expenses.filter(exp => exp.category === filter);
        renderTransactions(filtered);
    }
}

function updateChart() {
    const categoryTotals = {};

    expenses.forEach(exp => {
        categoryTotals[exp.category] =
            (categoryTotals[exp.category] || 0) + exp.amount;
    });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    if (chart) chart.destroy();

    const ctx = document.getElementById("expenseChart");

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels,
            datasets: [{
                data
            }]
        }
    });
}