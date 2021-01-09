import { get } from './fetch.js';
import { processData } from './data.js';
import './index.css';

const fetchWeather = async () => {
    try {
        const request = await get(
            'https://api.openweathermap.org/data/2.5/weather',
            {
                zip: '63110',
                units: 'imperial',
            }
        );
        const json = await request.json();

        return json;
    } catch (error) {
        console.log(error);
    }
};

const displayController = (() => {
    const updateMainTab = (obj) => {
        const wrapper = document.querySelector('.wrapper');

        wrapper.innerHTML = `
            <div class="city">
                <h2>${obj.city}</h2>
            </div>
            <div class="weather-container">
            <div class="right">
                <div class="current-weather">
                    <p>${obj.desc}</p>
                </div>
                <div class="image">
                <img src=${obj.icon} alt=${obj.iconAlt}>
                </div>
            </div>
            <div class="left">
                <div class="current-temp temp">
                    <div>${obj.tempNow}<span class="degrees">&#8457;</span></div>
                </div>
                <div class="flex">
                    <div class="temp-high small-temp temp">
                        <p>H: ${obj.tempMax}<span class="sm-degree">&#176</span></p>
                    </div>
                    <div class="temp-low small-temp temp">
                        <p>L: ${obj.tempMin}<span class="sm-degree">&#176</span></p>
                </div>
                </div>
                </div>
            </div>`;
    };

    return { updateMainTab };
})();

async function main() {
    const json = await fetchWeather();
    const data = await processData(json);
    displayController.updateMainTab(data);
}

main();
