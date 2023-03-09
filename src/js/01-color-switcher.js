// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.
// Учти, на кнопку «Start» можно нажать бесконечное количество раз. Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна (disabled).

// Для генерации случайного цвета используй функцию getRandomHexColor.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// Вибирає кнопки
const startBtnEl = document.querySelector("[data-start]");
const stopBtnEl = document.querySelector("[data-stop]");

// Додає слухача на кнопку "Start"
startBtnEl.addEventListener("click", onChangeBackgroundColor);


let timerId = null;
// Колбєк-функція, яка змінює колір фона
function onChangeBackgroundColor(event) {
  startBtnEl.disabled = true;
  timerId = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = color;
  }, 1000);
};

stopBtnEl.addEventListener("click", onStopChangeBackgroudColor);

function onStopChangeBackgroudColor(event){
    startBtnEl.disabled = false;
clearInterval(timerId);
}