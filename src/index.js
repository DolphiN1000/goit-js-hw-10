import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector("#search-box"),
    list: document.querySelector(".country-list"),
    info: document.querySelector(".counrty-info"),
}


const DEBOUNCE_DELAY = 300;

function fetchCountries(name) {
    return fetch("https://restcountries.com/v3.1/name/${name}?fields=name,capital,currencies,population,flags,lenguages").then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
}

refs.info.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput (event){
    event.preventDefault();

    inputCountry = event.target.value.trim();

    if (inputCountry === '') {clearMarkup();
    return;}

    
}