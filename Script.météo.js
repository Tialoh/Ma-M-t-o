
let searchButton = document.getElementById("searchForm");

searchButton.addEventListener("submit", async (event) => {
    event.preventDefault();

    let conseille=document.getElementById("conseille");
    let temperature = document.getElementById("temperature");
    let dateDay = document.getElementById("Date");
    let timeDate = document.getElementById("time");
    let weatherIcon = document.getElementById("weatherIcon");
    let description = document.getElementById("description");
    let humidity = document.getElementById("humidity");
    let pression = document.getElementById("pression");
    let vitesse = document.getElementById("vitesse");
    let precipitationTotal = document.getElementById("Précipitation");
    let cityName = document.getElementById("cityName");
    let temperature1= document.getElementById("temperature1");
    let temperature2= document.getElementById("temperature2");
    let temperature3= document.getElementById("temperature3");
    let temperature4= document.getElementById("temperature4");
    let temperature5= document.getElementById("temperature5");

    let cityInput = document.getElementById("cityInput");
    let city = cityInput.value.trim();

    async function getWeather(city) {
        let apiKey = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=fr&format=json`);
        const datas = await apiKey.json();
        return datas;
    }


    async function getWeatherData() {
        let citys = await getWeather(city);
        let {latitude, longitude,name} = citys.results[0];
        cityName.textContent = `${name}`;

        let weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,pressure_msl,wind_speed_10m,precipitation,relative_humidity_2m&timezone=auto`);
        let weatherDatas = await weatherResponse.json();
        return weatherDatas;
    }




    let weatherData = await getWeatherData();
    let {relative_humidity_2m, temperature_2m, precipitation, wind_speed_10m, pressure_msl,weather_code} = weatherData.current;
    let {time} = weatherData.current;

    dateDay.textContent = new Date(time).toLocaleDateString();
    timeDate.textContent = new Date(time).toLocaleTimeString();
    temperature.textContent = `${temperature_2m}°C`;
    humidity.textContent = `${relative_humidity_2m}%`;
    vitesse.textContent = `${wind_speed_10m} km/h`;
    pression.textContent = `${pressure_msl} hPa`;
    precipitationTotal.textContent = `${precipitation} mm`;



    const weatherCodes = {
        0: "Ciel dégagé", 1: "Plutôt dégagé", 2: "Partiellement nuageux", 3: "Couvert",
        45: "Brouillard", 48: "Brouillard givrant",
        51: "Bruine légère", 53: "Bruine", 55: "Bruine forte",
        61: "Pluie légère", 63: "Pluie", 65: "Pluie forte",
        80: "Averses légères", 81: "Averses", 82: "Averses violentes",
        95: "Orage"
    };

    description.textContent = weatherCodes[weather_code] || "Conditions inconnues"

    const weatherIcons = {
        0: "image-removebg-preview (6).png",
        1: "image-removebg-preview (6).png",

        2: "image-removebg-preview (4).png",
        3: "image-removebg-preview (4).png",
        45: "image-removebg-preview (4).png",
        48: "image-removebg-preview (4).png",

        51: "image-removebg-preview (5).png",
        53: "image-removebg-preview (5).png",
        55: "image-removebg-preview (5).png",
        61: "image-removebg-preview (5).png",
        63: "image-removebg-preview (5).png",
        65: "image-removebg-preview (5).png",

        80: "eclair.png",
        81: "eclair.png",
        82: "eclair.png",
        95: "eclair.png"
    }

    const conseilsMeteo = {
        0: "Profite du beau temps et pense à bien t'hydrater.",
        1: "Une belle journée s'annonce, profite de tes activités extérieures.",
        2: "Le ciel est variable, prévois une petite veste au besoin.",
        3: "Pense à prendre une petite veste si nécessaire.",
        45: "La visibilité est réduite, sois prudent lors de tes déplacements.",
        48: "Attention aux surfaces glissantes, déplace-toi prudemment.",
        51: "Quelques gouttes sont possibles, garde un parapluie à proximité.",
        53: "Prévois un parapluie pour éviter de te faire mouiller.",
        55: "Protège-toi de l'humidité avec un parapluie.",
        56: "Attention au risque de glissade, déplace-toi prudemment.",
        57: "Évite les déplacements inutiles, les surfaces peuvent être glissantes.",
        61: "Garde un parapluie avec toi, quelques averses sont possibles.",
        63: "Pense à prendre ton parapluie avant de sortir.",
        65: "Limite tes déplacements et évite les zones susceptibles d'être inondées.",
        66: "Attention au risque de glissade, reste au chaud si possible.",
        67: "Évite de sortir, les conditions peuvent être dangereuses.",
        71: "Couvre-toi suffisamment pour rester au chaud.",
        73: "Porte des vêtements chauds et fais attention aux surfaces glissantes.",
        75: "Limite tes déplacements et habille-toi chaudement.",
        77: "Prévois des vêtements adaptés au froid.",
        80: "Garde ton parapluie à portée de main.",
        81: "Prévois un parapluie et protège tes affaires de la pluie.",
        82: "Évite les zones inondables et attends une accalmie avant de sortir.",
        85: "Couvre-toi bien et reste prudent sur les surfaces glissantes.",
        86: "Limite tes déplacements et reste bien au chaud.",
        95: "Reste à l'abri pendant l'orage et évite les espaces ouverts.",
        96: "Mets-toi à l'abri et protège-toi de la grêle.",
        99: "Reste à l'intérieur et éloigne-toi des fenêtres."
    };
    conseille.textContent=conseilsMeteo[weather_code] || "choix non valide";

    weatherIcon.src = `temps/${weatherIcons[weather_code[0]] || "image-removebg-preview (6).png"}`;

    async function getWeatherPrevious() {
        let citys = await getWeather(city);
        let {latitude, longitude} = citys.results[0];
        let previousWeatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max&forecast_days=5&timezone=auto`);
        let previousWeatherData = await previousWeatherResponse.json();
        return previousWeatherData;

    }


    async function getWeatherNext() {
    let previous= await getWeatherPrevious();
    let {weather_code,temperature_2m_max} = previous.daily;

    temperature1.textContent= `${temperature_2m_max[0]}`;
    temperature2.textContent= `${temperature_2m_max[1]}`;
    temperature3.textContent= `${temperature_2m_max[2]}`;
    temperature4.textContent= `${temperature_2m_max[3]}`;
    temperature5.textContent= `${temperature_2m_max[4]}`;



    let image1=document.getElementById("image1");
    let image2=document.getElementById("image2");
    let image3=document.getElementById("image3");
    let image4=document.getElementById("image4");
    let image5=document.getElementById("image5");



        image1.src = `temps/${weatherIcons[weather_code[0]]}`;
        image2.src = `temps/${weatherIcons[weather_code[1]]}`;
        image3.src = `temps/${weatherIcons[weather_code[2]]}`;
        image4.src = `temps/${weatherIcons[weather_code[3]]}`;
        image5.src = `temps/${weatherIcons[weather_code[4]]}`;
    }
await getWeatherNext()
});


