import Notiflix from 'notiflix';


// Знаходимо елементи: поля форми та кнопку
const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name = "amount"]'),
  submit: document.querySelector('.form button'),
};

// Створює функцію, яка створює проміс
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
  
  
// Додаємо слухача до кнопки
refs.submit.addEventListener('click', onClick);

// колбек-функція
function onClick(event) {
  // скидує дефолтне перезавантаження сторінки
  event.preventDefault();

  // Перетворення затримки та кроку в число

  let delayValue = Number(refs.delay.value);
  let stepValue = Number(refs.step.value);

  let amountValue = Number(refs.amount.value);
  console.log(amountValue);
 
  // Цикл для перебору кількості значень, які ввів користувач

  for (let i = 0; i < amountValue; i += 1) {
  console.log( "я визиваю функц")
    createPromise(1 + i, delayValue + i * stepValue)
      .then(({ position, delay }) => {
        // використання бібліотеки Notiflix для відображення повідомлення
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // використання бібліотеки Notiflix для відображення повідомлення
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);

      });
    refs.form.reset();
  }
}
