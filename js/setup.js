'use strict';

var userSetup = document.querySelector('.setup');
// массивы имен и фамилий магов, цвет мантий и глаз
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон']; // имя
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']; // фамилия
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)']; // цвет мантии
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green']; // цвет глаз
var WIZARD_FIREBOL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']; // цвет файрбола
var similarListElement = userSetup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.getElementById('similar-wizard-template').content;
var wizards = toSimilarCharacters(); // список объектов. Содержит сгенерированные рандомно имена с фамилиями, цвет мантии и цвет глаз.
var fragment = document.createDocumentFragment(); // создаем фрагмент для вставки

for (var i = 0; i < 5; i++) {
  fragment.appendChild(renderWizard(wizards[i])); // прогоняем весь массив и вставляем во фрагмент
}
similarListElement.appendChild(fragment); // вставляем фрагмент на страницу
userSetup.querySelector('.setup-similar').classList.remove('hidden');

// открытие и закрытие попап окна с настройками

var setupOpen = document.querySelector('.setup-open');
var setupClose = userSetup.querySelector('.setup-close');
var setupUserName = userSetup.querySelector('.setup-user-name');
var wizard = document.querySelector('.setup-player');
var wizardCoatColor = wizard.querySelector('.wizard-coat');
var wizardEyesColor = wizard.querySelector('.wizard-eyes');
var wizardFirebolColor = userSetup.querySelector('.setup-fireball-wrap');

setupOpen.addEventListener('click', function () {
  openPopup();
});
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    openPopup();
  }
});
setupClose.addEventListener('click', function () {
  closePopup();
});
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closePopup();
  }
});
setupUserName.addEventListener('keydown', function (evt) { // если в фокусе поле ввода имя персонажа то не срабатывает esc на закрывтие окна
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
});
// выбор цвета персонажа
paintElementDOM(wizardCoatColor, WIZARD_COAT_COLOR, colorizeCoat);
paintElementDOM(wizardEyesColor, WIZARD_EYES_COLOR, colorizeEyes);
paintElementDOM(wizardFirebolColor, WIZARD_FIREBOL_COLOR, colorizeFirebol);

// конец открытие и закрытие попап окна с настройками
function toSimilarCharacters() {
  var wizardNames = [];
  var similarCharacters = [];

  for (i = 0; i < 5; i++) {
    var randomFirstName = WIZARD_FIRST_NAMES[Math.floor(Math.random() * (WIZARD_FIRST_NAMES.length))]; // получаем рандом имя
    var randomLastName = WIZARD_LAST_NAMES[Math.floor(Math.random() * (WIZARD_LAST_NAMES.length))]; // получаем рандом фамилию
    var randomCoatColor = WIZARD_COAT_COLOR[Math.floor(Math.random() * (WIZARD_COAT_COLOR.length))]; // получаем рандом цвет мантии
    var randomEyesColor = WIZARD_EYES_COLOR[Math.floor(Math.random() * (WIZARD_EYES_COLOR.length))]; // получаем рандом цвет глаз
    wizardNames[i] = randomFirstName + ' ' + randomLastName; // соединяем имя с фамилией
    similarCharacters[i] = {name: wizardNames[i], coatColor: randomCoatColor, eyesColor: randomEyesColor}; // записываем все полученные данные
  }
  return similarCharacters;
}

function renderWizard(wizard1) { // в качестве аргумента получаем обьект со именами name coatColor eyesColor
  var wizardElement = similarWizardTemplate.cloneNode(true); // копируем структуру шаблона со всеми потомками .similar-wizard-template

  wizardElement.querySelector('.setup-similar-label').textContent = wizard1.name; // записываем имя персонажа
  wizardElement.querySelector('.wizard-coat').style.fill = wizard1.coatColor; // записываем цвет мантии персонажа
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard1.eyesColor; // записываем цвет глаз персонажа

  return wizardElement;
}

function onPopupEscPress(evt) { // при нажатии esc закрываем окно
  if (evt.keyCode === 27) {
    closePopup();
  }
}

function openPopup() { // открытие окна попап
  userSetup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
}

function closePopup() { // закрытие попап
  userSetup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
}

function paintElementDOM(element, painArray, cb) { // приниает на вход элемент, который красим, массив цветов из которого красить и функцию покраски
  element.addEventListener('click', function () {
    var counter = element.counter;
    if (counter === undefined) {
      counter = 1;
    }
    var color = painArray[counter];
    cb(color);
    if (counter < painArray.length - 1) {
      counter++;
      element.counter = counter;
    } else {
      counter = 0;
      element.counter = counter;
    }
  });
}

function colorizeCoat(color) {
  wizardCoatColor.style.fill = color;
}

function colorizeEyes(color) {
  wizardEyesColor.style.fill = color;
}

function colorizeFirebol(color) {
  wizardFirebolColor.style.backgroundColor = color;
}
