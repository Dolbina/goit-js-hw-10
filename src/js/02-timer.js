// Напиши скрипт таймера, который ведёт обратный отсчет до определенной даты. Такой таймер может использоваться в блогах и интернет-магазинах, страницах регистрации событий, во время технического обслуживания и т. д. Посмотри демо видео работы таймера.


import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// Вибирає кнопку та поля з днем, годинами, хвилинами, секундами
const startBtnEl = document.querySelector("[data-start]");

const inputDateEl = document.querySelector("#datetime-picker");

const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');


// Кнопка вимкнена (стан кнопки)

startBtnEl.disabled = true;

// Перетворення міллісекунд в дні, години, хвилини, секунди

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// Перетворює на рядок та додає, якщо треба нолік попереду днів, часів, минут, секунд

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
 
}


// Об'єкт параметрів

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
    //   якщо вибрана дата з минулого, то повертає повідомлення та кнопка ще не активна
    if (selectedDates[0] < new Date()) {
        
        //використовує бібліотеку Notiflix для відображення повідомлення

        return Notiflix.Notify.failure('Please choose a date in the future');
        startBtnEl.disabled = true;
      }
      else {
        //   якщо вибрана дата з майбутнього, то запускає таймер
        startBtnEl.disabled = false;
    }  
  },
};

// Виклик функції, яка дозволяє вибрати дату з календаря
 flatpickr(inputDateEl, options);

// Додає слухача на кнопку

startBtnEl.addEventListener('click', () =>{
    let timer = setInterval(() => {
        let deltaTime = new Date(inputDateEl.value) - new Date();
        startBtnEl.disabled = true;

        // перевірка на зворотній відлік
        if (deltaTime >= 0) {
            let dataEl = convertMs(deltaTime);
            days.textContent = dataEl.days;
            hours.textContent = dataEl.hours;
            minutes.textContent = dataEl.minutes;
            seconds.textContent = dataEl.seconds;
        }
    }, 1000);
    })




    