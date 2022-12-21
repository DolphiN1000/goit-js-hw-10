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
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,currencies,population,flags,lenguages`).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
}

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput (event){
    event.preventDefault();

   let    inputCountry = event.target.value.trim();

    if (!inputCountry !== '') {clearMarkup();
    return;} else {
        fetchCountries(inputCountry)
        .then(countries => {
            if (countries.length === 1) {
                clearMarkup();
                createContryCard(countries);
                return;
            }
            if (countries.length <= 10 && countries.length >= 2 ) {
                clearMarkup();
                createContrylist(countries);
                return;
            }
            if (countries.length > 10) {
                clearMarkup();
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                return;
            }
        })
        .catch(error => {
            Notiflix.Notify.failure("Oops, there is no country with that name")
        } );
    }
console.log(inputCountry);

    
}


function clearMarkup () {
    refs.info.innerHTML = '';
    refs.list.innerHTML = '';
}


function  createContrylist(countries) {
    const countriesListMarkup = countries
      .map(country => {
        return `<li class="country-list__item"><img class="country-list__item-img" src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="60" height="40" /><p class="country-list__item-name">${country.name.official}</p></li>`;
      })
      .join(' ');
    refs.list.insertAdjacentHTML('beforeend', countriesListMarkup);
  }
  
  function createContryCard(countries) {
    const countryCardMarkup = countries
      .map(country => {
        return `<div class="flag-and-name">
        <img
          src="${country.flags.svg}"
          alt="Flag of ${country.name.official}"
          width="60"
          height="40"
          class="flag-img"
        />
        <p class="country-name">${country.name.official}</p>
      </div>
      <ul class="country-info-list">
        <li class="country-info-item">
          <p class="country-info-text">Capital:&nbsp</p>
          <span class="country-info-span">${country.capital}</span>
        </li>
        <li class="country-info-item">
          <p class="country-info-text">Population:&nbsp</p>
          <span class="country-info-span">${country.population}</span>
        </li>
        <li class="country-info-item">
          <p class="country-info-text">Languages:&nbsp</p>
          <span class="country-info-span">${Object.values(
            country.languages
          )}</span>
        </li>
      </ul>`;
      })
      .join(' ');
    refs.info.innerHTML = countryCardMarkup;
  }