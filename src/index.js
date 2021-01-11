import { get } from './fetch.js';
import { processData } from './data.js';
import './index.css';

const searchLocation = document.querySelector('form[class="searchbar"] button');

const weatherController = (() => {
    const _fetchWeather = async (params) => {
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        const units = { units: 'imperial' };
        const requestParams = { ...params, ...units };
        try {
            const request = await get(url, requestParams);
            const json = await request.json();

            return json;
        } catch (error) {
            console.log(error);
        }
    };

    const getByZipcode = (location) => _fetchWeather({ zip: location });

    const getByCityName = (location) => _fetchWeather({ q: location });

    return {
        getByCityName,
        getByZipcode,
    };
})();

const inputController = (() => {
    const _locationInputHandler = (e) => {
        console.log(e.target.value);
    };

    const getLocationInput = () => {
        const input = document.querySelector('input[type="text"]');
        input.addEventListener('input', _locationInputHandler);
    };

    return { getLocationInput };
})();

const formValidation = (() => {
    const _validateSingleInput = (element) => {
        if (element.validity.valid) {
            return true;
        }

        return false;
    };

    const isCityName = (input) => isNaN(input);

    const location = (element) => _validateSingleInput(element);

    return {
        location,
        isCityName,
    };
})();

const displayController = (() => {
    const _clearInput = () => {
        document.querySelector(
            'form[class="searchbar"] input[type="text"]'
        ).value = '';
    };

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
        _clearInput();
    };

    return { updateMainTab };
})();

async function main() {
    // const json = await weatherController.getByZipcode('63122');
    const json = await weatherController.getByCityName('Los Angeles');
    const data = await processData(json);
    displayController.updateMainTab(data);
}

main();

async function handleSearchForLocation(e) {
    // const input = e.target.closest('form').location
    const input = e.target.closest('form').querySelector('input');
    const { value } = input;
    if (formValidation[input.name](input)) {
        if (formValidation.isCityName(value)) {
            const json = await weatherController.getByCityName(value);
            const data = await processData(json);
            displayController.updateMainTab(data);
        }
    } else {
        console.log('empty!');
    }
}

inputController.getLocationInput();
searchLocation.addEventListener('click', handleSearchForLocation);
