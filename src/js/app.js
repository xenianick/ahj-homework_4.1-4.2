import createNewElement from './createNewElement.js';
import cardsArray from './cardsArray.js';
import checkCardMatch from './checkCardMatch.js';
import luhnAlgorithm from './luhnAlgorithm.js';

// создание контейнера для иконок платежных систем и самих иконок
const cards = createNewElement('div', 'cards-icons-wrapper');
cardsArray.forEach((item) => {
  const card = createNewElement('div', 'card-icon-container', `<img src=${item.icon} alt="${item.name}">`);
  cards.appendChild(card);
  Object.assign(item, { element: card });
});

// создание символов для отметки проверки (прошел/не прошел)
const symbols = createNewElement('div', 'symbols-wrapper');
const symbolOk = createNewElement('div', 'symbol-ok hide', '<p>&#10004;</p>');
const symbolDismiss = createNewElement('div', 'symbol-dismiss hide', '<p>&#10008;</p>');
symbols.appendChild(symbolOk);
symbols.appendChild(symbolDismiss);

// создание формы для валидации
const validatorForm = createNewElement('form', 'validator_form');
const validatorInput = createNewElement('input', 'validator_input');
validatorInput.required = true;
const validatorBtn = createNewElement('button', 'validator_btn', '<p>Click to Validate</p>');
validatorForm.appendChild(validatorInput);
validatorForm.appendChild(validatorBtn);

// создание общего контейнера
const validatorContainer = createNewElement('div', 'validator-container');
validatorContainer.appendChild(cards);
validatorContainer.appendChild(symbols);
validatorContainer.appendChild(validatorForm);

// добавление всех элементов на страницу
const bodyEl = document.querySelector('body');
bodyEl.insertBefore(validatorContainer, bodyEl.firstChild);

// проверка на соответвие карточек значению поля ввода по изменению input
validatorInput.addEventListener('input', () => {
  symbolOk.classList.add('hide');
  symbolDismiss.classList.add('hide');
  cardsArray.forEach((item) => {
    const isMatched = checkCardMatch(item, validatorInput.value);
    if (isMatched) {
      item.element.classList.remove('disable');
    } else {
      item.element.classList.add('disable');
    }
  });
  if (validatorInput.value === '') {
    cardsArray.forEach((item) => item.element.classList.remove('disable'));
  }
});

// проверка номера карты по сабмиту формы
validatorForm.addEventListener('submit', (event) => {
  const isValidated = luhnAlgorithm(validatorInput.value);
  if (isValidated) {
    symbolOk.classList.remove('hide');
  } else {
    symbolDismiss.classList.remove('hide');
  }
  event.preventDefault();
});
