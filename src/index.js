// import { fetchCountries } from './fetchCountries';
import './css/styles.css';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

// Пошук поля вводу та місця для додавання списку в DOM
const refs = {
    name: document.querySelector('#search-box'),
    countriesList: document.querySelector('.country-list'),
    countriesInfo: document.querySelector('.country-info'),
};


console.log(refs.name);
console.log(refs.countriesList);
console.log(refs.countriesInfo);


// Додає слухача та використовує функцію debounce, яка робить HTTP-запит через 300мс після того, як користувач перестав вводити текст
refs.name.addEventListener('input', debounce (fetchCountries, DEBOUNCE_DELAY));

