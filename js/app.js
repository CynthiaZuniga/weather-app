const cities = [
  {
    id: 1,
    name: "Santiago",
    temp: 24,
    status: "Soleado",
    humidity: 40,
    wind: 12,
    forecast: ["☀️", "⛅", "🌧️", "☀️", "☀️"]
  },
  {
    id: 2,
    name: "Valparaíso",
    temp: 20,
    status: "Nublado",
    humidity: 60,
    wind: 18,
    forecast: ["⛅", "⛅", "🌧️", "⛅", "☀️"]
  },
  {
    id: 3,
    name: "Concepción",
    temp: 18,
    status: "Nublado",
    humidity: 60,
    wind: 18,
    forecast: ["⛅", "⛅", "🌧️", "⛅", "☀️"]
  },
  {
    id: 4,
    name: "Temuco",
    temp: 20,
    status: "Nublado",
    humidity: 60,
    wind: 18,
    forecast: ["⛅", "⛅", "🌧️", "⛅", "☀️"]
  },
  {
    id: 5,
    name: "Talca",
    temp: 20,
    status: "Nublado",
    humidity: 60,
    wind: 18,
    forecast: ["⛅", "⛅", "🌧️", "⛅", "☀️"]
  },
  {
    id: 6,
    name: "Chillan",
    temp: 20,
    status: "Nublado",
    humidity: 60,
    wind: 18,
    forecast: ["⛅", "⛅", "🌧️", "⛅", "☀️"]
  },
  {
    id: 7,
    name: "Curicó",
    temp: 20,
    status: "Nublado",
    humidity: 60,
    wind: 18,
    forecast: ["⛅", "⛅", "🌧️", "⛅", "☀️"]
  },
  {
    id: 8,
    name: "Antártica",
    temp: 20,
    status: "Nublado",
    humidity: 60,
    wind: 18,
    forecast: ["⛅", "⛅", "🌧️", "⛅", "☀️"]
  },
  {
    id: 9,
    name: "Puerto Varas",
    temp: 20,
    status: "Nublado",
    humidity: 60,
    wind: 18,
    forecast: ["⛅", "⛅", "🌧️", "⛅", "☀️"]
  },
   {
    id: 10,
    name: "Litoral Central",
    temp: 24,
    status: "Soleado",
    humidity: 40,
    wind: 12,
    forecast: ["☀️", "⛅", "🌧️", "☀️", "☀️"]
  },
      
];

const container = document.getElementById("cities-container");

if (container) {
  for (let i = 0; i < cities.length; i++) {
    container.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="card city-card">
          <div class="card-body city-card__body">
            <h5 class="city-card__name">${cities[i].name}</h5>
            <p class="city-card__info">${cities[i].temp}°C - ${cities[i].status}</p>
            <button class="btn btn-primary city-card__button"
            onclick="goToDetail(${cities[i].id})"
              >
              Ver detalle
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

function goToDetail(id) {
  localStorage.setItem("selectedCity", id);
  window.location.href = "detail.html";
}
const cityId = localStorage.getItem("selectedCity");

if (cityId) {
  for (let i = 0; i < cities.length; i++) {
    if (cities[i].id == cityId) {

      document.getElementById("city-name").innerText = cities[i].name;
      document.getElementById("temp").innerText = cities[i].temp + "°C";
      document.getElementById("humidity").innerText = cities[i].humidity + "%";
      document.getElementById("wind").innerText = cities[i].wind + " km/h";

      const forecast = document.getElementById("forecast");

      for (let j = 0; j < cities[i].forecast.length; j++) {
        forecast.innerHTML += `
          <div class="col-6 col-md-4 col-lg-2 mb-3">
            <div class="card text-center">
              <div class="card-body">
                ${cities[i].forecast[j]}
              </div>
            </div>
          </div>
        `;
      }
    }
  }
}