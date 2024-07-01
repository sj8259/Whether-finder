const searchButton = document.getElementById('searchButton');
const locationInput = document.getElementById('locationInput');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const city = locationInput.value;
    if (city) {
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    fetch(`/api/weather?city=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }

            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
            
            setBackground(data.weather[0].main);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function setBackground(weather) {
    let backgroundImageUrl;

    switch (weather) {
        case 'Clear':
            backgroundImageUrl = 'url("clear.jpg")'; // Replace with actual URL or path
            console.log('Clear weather, background:', backgroundImageUrl)
            break;
        case 'Clouds':
            backgroundImageUrl = 'url("/Users/saijeevan/Desktop/webdevlopment/whether-app/cloudy.jpg")';
            break;
        case 'Rain':
            backgroundImageUrl = 'url("/Users/saijeevan/Desktop/webdevlopment/whether-app/rainy.jpg")'; 
            break;
        default:
            backgroundImageUrl = 'none';
            break;
    }

    document.body.style.backgroundImage = backgroundImageUrl;
}
