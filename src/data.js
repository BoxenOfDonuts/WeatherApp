class Weather {
    constructor(city, tempNow, tempMin, tempMax, desc, icon, iconAlt) {
        this.city = city;
        this.tempNow = tempNow;
        this.tempMin = tempMin;
        this.tempMax = tempMax;
        this.desc = desc;
        this.icon = icon;
        this.iconAlt = iconAlt;
    }
}

const processData = async (data) => {
    const { name: city, main, weather } = data;
    const iconURL = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

    const today = new Weather(
        city,
        Math.round(main.temp),
        Math.round(main.temp_min),
        Math.round(main.temp_max),
        weather[0].main,
        iconURL,
        weather[0].description
    );
    console.log(today);
    return today;
};

export { processData };
