const API_KEY = "08efb0b0800549eb9e989359e0453fb7";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const status = document.getElementById("status");
    const card = document.getElementById("weatherCard");

    if (!city) {
        alert("Enter a city name");
        return;
    }

    status.innerText = "Loading...";
    card.classList.add("hidden");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) throw new Error();

        const data = await response.json();

        const temp = data.main.temp;
        const condition = data.weather[0].main;
        const iconCode = data.weather[0].icon;

        document.getElementById("temperature").innerText = `${temp}°C`;
        document.getElementById("condition").innerText = condition;
        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        card.classList.remove("hidden");
        status.innerText = "";

        updateTheme(condition, iconCode);

    } catch {
        status.innerText = "❌ City not found";
    }
}

function updateTheme(condition, iconCode) {
    const body = document.body;

    // Night detection
    if (iconCode.includes("n")) {
        body.style.background = "linear-gradient(135deg, #141E30, #243B55)";
        return;
    }

    switch (condition) {
        case "Clear":
            body.style.background = "linear-gradient(135deg, #fceabb, #f8b500)";
            break;

        case "Rain":
        case "Drizzle":
            body.style.background = "linear-gradient(135deg, #4b79a1, #283e51)";
            break;

        case "Clouds":
            body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
            break;

        case "Snow":
            body.style.background = "linear-gradient(135deg, #e6dada, #274046)";
            break;

        default:
            body.style.background = "linear-gradient(135deg, #74b9ff, #0984e3)";
    }
}

function overrideTheme() {
    const color = document.getElementById("colorPicker").value;
    document.body.style.background = color;
}