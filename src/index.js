import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
// const lili = document.querySelector(".list");

// lili.style.listStyle = none;

const refs = {
  input: document.querySelector('input#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;
const CLEAR = '';

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
// refs.list.

function onInput(event) {
  event.preventDefault();

  const inputCountry = event.target.value.trim();

  // clearMarkup();

  if (!inputCountry) {
    return;
  }

  fetchCountries(inputCountry)
    .then(countries => {
      console.log(countries);
      const countriesLength = countries.length;
      console.log(countriesLength);
      if (countriesLength === 1) {
        clearMarkup();
        const markupCard = createContryCard(countries);
        console.log(markupCard); // alert('1');
        refs.info.insertAdjacentHTML('beforeend', markupCard);

        return;
      }
      if (countriesLength >= 2 && countriesLength <= 10) {
        clearMarkup();
        const markup = createContryList(countries);
        refs.list.insertAdjacentHTML('beforeend', markup);
        return;
      }

      if (countriesLength > 10) {
        clearMarkup();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
    })
    .catch(error => {
      clearMarkup();
      Notiflix.Notify.failure(
        `Oops, there is no country with that name${error.status}`
      );
    });
}

function clearMarkup() {
  refs.list.innerHTML = CLEAR;
  refs.info.innerHTML = CLEAR;
}

function createContryList(countries = []) {
  return countries.map(
    country =>
      `<li class="country-list__item list">
         <img class="country-list__flags" src="${country.flags.svg}" alt="Flag of " width="80" height="60" />
        <p class="country-list__name-official">${country.name.official}</p>
        
       
       
       </li>`
  );
  // .join('');
  // refs.list.insertAdjacentHTML('beforeend', countryListMarkup);
}

function createContryCard(countries = []) {
  return countries
    .map(
      country =>
        `<div class="flag-and-name">
        <img
          src="${country.flags.svg}"
          alt="Flag of ${country.name.official}"
          width="60"
          height="40"
          class="flags"
        />
        <p class="country-name">${country.name.official}</p>
      </div>
      <ul class="country-info-list">
        <li class="country-info-item list">
          <p class="country-info-text">Capital:&nbsp</p>
          <p class="country-list__capital">${country.capital}</p>
        </li>
        <li class="country-info-item list">
          <p class="country-info-text">Population:&nbsp</p>
          <p class="country-list__population">${country.population}</p> 
        </li>
        <li class="country-info-item list">
          <p class="country-info-text">Languages:&nbsp</p>
          <p class="country-list__languages">${Object.values(
            country.languages
          )}</p>
        </li>
      </ul>`
    )
    .join('');
}
