import { get } from './fetch.js';
import { processData } from './data.js'
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
            <div class="current-weather">
                <p>${obj.desc}</p>
            </div>
            <div class="current-temp">
                ${obj.tempNow}
            </div>
            <div class="temp-high">
                <p>H ${obj.tempMax}</p>
            </div>
            <div class="temp-low">
                <p>L ${obj.tempMin}</p>
            </div>
            <div class="image">
                <img src=${obj.icon} alt=${obj.iconAlt}>
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
