import tabJoursEnOrdre from "./Utilitaire/gestionTemps.js";

const CLEFAPI = 'API KEY'
let resultatsAPI;

// Toutes les const utilisées qui vise les cases à remplir
const temps = document.querySelector('.temps')
const temperature = document.querySelector('.temperature')
const localisation = document.querySelector('.localisation')
const heure = document.querySelectorAll('.heure-nom-prevision')
const tempPourH = document.querySelectorAll('.heure-prevision-valeur')
const joursDiv = document.querySelectorAll('.jour-prevision-nom')
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp')

// Pour les icônes
const imgIcone = document.querySelector('.logo-meteo')

// Pour faire disparaitre le loader une fois que l'appli est chargée
const chargementContainer = document.querySelector('.overlay-icone-chargement')

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat);

    }, () => {
        alert(`Vous avez refusé la géolocation, l'application ne peut pas fonctionner, veuillez l'activer !`)
    })
}

function AppelAPI(long, lat) {
    
    // Fetch retourne une promesse et sera résout lors de l'appel à l'api
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    // Reçoit une réponse qui doit être transformée au format json
    .then((reponse) => {
        return reponse.json();
    })
    // On utilise les data transformées
    .then((data) => {
        // console.log(data);
        resultatsAPI = data;

        temps.innerText = resultatsAPI.current.weather[0].description
        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`
        localisation.innerText = resultatsAPI.timezone;

        // les heures, par tranche de trois, avec leurs temperature
        let heureActuelle = new Date().getHours();

        for (let i = 0; i < heure.length; i++) {
            let heureIncr = heureActuelle + i * 3;

            if(heureIncr > 24) {
                heure[i].innerText = `${heureIncr - 24} h`;
            } else if (heureIncr === 24) {
                heure[i].innerText = '00 h'
            } else {
                heure[i].innerText = `${heureIncr} h`
            }
        }

        // Temperature pour 3h
        for (let j = 0; j < tempPourH.length; j++) {
            tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j*3].temp)}°`
        }

        // Trois première lettres des jours
        for (let k = 0; k < tabJoursEnOrdre.length; k++) {
            joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3);
        }

        // Temperature par jour
        for (let m = 0; m < 7; m++) {
            tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1 ].temp.day)}°`
        }

        // Icone dynamique 
            // Si il est plus de 6h et moins de 21h, c'est la journée donc on utilise telle icône
        if (heureActuelle >= 6 && heureActuelle < 21) {
            imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
            // Sinon, c'est la nuit, on utilise une autre icône
        } else {
            imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
        }

        // Pour faire disparaitre le loader une fois que l'appli est chargée
        chargementContainer.classList.add('disparition')

    })
}