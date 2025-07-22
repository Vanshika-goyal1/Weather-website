// Use environment variable (Netlify will inject this)
const apiKey = `${API_KEY}`;

// Fetch weather for a single city and update main card
const getWeather = (city) => {
  document.getElementById('cityName').innerText = city;

  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`)
    .then(response => response.json())
    .then(data => {
      const current = data.current;

      // Fill Temperature Card
      document.getElementById('temp_c').innerText = current.temp_c;
      document.getElementById('feelslike_c').innerText = current.feelslike_c;
      document.getElementById('condition_text').innerText = current.condition.text;

      // Fill Atmosphere Card
      document.getElementById('humidity').innerText = current.humidity;
      document.getElementById('cloud').innerText = current.cloud;
      document.getElementById('uv').innerText = current.uv;

      // Fill Wind & Pressure Card
      document.getElementById('wind_kph').innerText = current.wind_kph;
      document.getElementById('wind_degree').innerText = current.wind_degree;
      document.getElementById('pressure_mb').innerText = current.pressure_mb;
    })
    .catch(error => {
      alert("City not found or API error. Please try again.");
      console.error(error);
    });
};

// Fetch weather for common cities and fill the table
const commonCities = ["Shanghai", "Boston", "Lucknow", "Kolkata"];
const fetchCommonCitiesWeather = () => {
  const rows = document.querySelectorAll("table tbody tr");
  commonCities.forEach((city, index) => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`)
      .then(response => response.json())
      .then(data => {
        const current = data.current;
        const cells = rows[index].querySelectorAll("td");

        cells[0].innerText = current.temp_c;
        cells[1].innerText = current.feelslike_c;
        cells[2].innerText = current.humidity;
        cells[3].innerText = current.cloud;
        cells[4].innerText = current.wind_kph;
        cells[5].innerText = current.wind_degree;
        cells[6].innerText = current.pressure_mb;
        cells[7].innerText = current.uv;
        cells[8].innerText = current.condition.text;
      })
      .catch(error => {
        console.error(`Error fetching data for ${city}:`, error);
      });
  });
};

// Search button listener
document.getElementById('submit').addEventListener('click', (e) => {
  e.preventDefault();
  const city = document.getElementById('city').value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

// Initialize with default
getWeather("Delhi");
fetchCommonCitiesWeather();
