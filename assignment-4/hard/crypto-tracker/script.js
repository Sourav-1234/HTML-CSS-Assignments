let cryptoData = [];
let filteredData = [];

const table = document.getElementById("cryptoTable");
const status = document.getElementById("status");
const searchInput = document.getElementById("search");
const currencySelect = document.getElementById("currency");

async function fetchCrypto() {
    const currency = currencySelect.value;

    status.innerText = "Loading...";

    try {
        const res = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1`
        );

        if (!res.ok) throw new Error();

        cryptoData = await res.json();
        filteredData = cryptoData;

        status.innerText = "";

        renderTable();

    } catch {
        status.innerText = "❌ Failed to fetch data";
    }
}

function renderTable() {
    table.innerHTML = filteredData.map(coin => {
        const changeClass =
            coin.price_change_percentage_24h >= 0 ? "green" : "red";

        return `
            <tr>
                <td class="coin">
                    <img src="${coin.image}">
                    ${coin.name}
                </td>
                <td>
                    ${formatCurrency(coin.current_price)}
                </td>
                <td class="${changeClass}">
                    ${coin.price_change_percentage_24h.toFixed(2)}%
                </td>
            </tr>
        `;
    }).join("");
}

function formatCurrency(price) {
    const currency = currencySelect.value;

    const symbols = {
        usd: "$",
        eur: "€",
        inr: "₹"
    };

    return symbols[currency] + price.toLocaleString();
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    filteredData = cryptoData.filter(coin =>
        coin.name.toLowerCase().includes(query)
    );

    renderTable();
});

currencySelect.addEventListener("change", fetchCrypto);

fetchCrypto();