'use strict';
var userSetup = document.querySelector('.setup');
userSetup.classList.remove('hidden'); // открываем окно установок перед игрой
// массивы имен и фамилий магов, цвет мантий и глаз
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон']; // имя
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']; // фамилия
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)']; // цвет мантии
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green']; // цвет глаз
var similarListElement = userSetup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.getElementById('similar-wizard-template').content;

var toSimilarCharacters = function () {
  var wizardNames = [];
  var similarCharacters = [];

  for (var i = 0; i < WIZARD_FIRST_NAMES.length; i++) {
    var randomFirstName = WIZARD_FIRST_NAMES[Math.floor(Math.random() * (WIZARD_FIRST_NAMES.length))]; // получаем рандом имя
    var randomLastName = WIZARD_LAST_NAMES[Math.floor(Math.random() * (WIZARD_LAST_NAMES.length))]; // получаем рандом фамилию
    var randomCoatColor = WIZARD_COAT_COLOR[Math.floor(Math.random() * (WIZARD_COAT_COLOR.length))]; // получаем рандом цвет мантии
    var randomEyesColor = WIZARD_EYES_COLOR[Math.floor(Math.random() * (WIZARD_EYES_COLOR.length))]; // получаем рандом цвет глаз
    wizardNames[i] = randomFirstName + ' ' + randomLastName; // соединяем имя с фамилией
    similarCharacters[i] = {name: wizardNames[i], coatColor: randomCoatColor, eyesColor: randomEyesColor}; // записываем все полученные данные
  }
  return similarCharacters;
};

var wizards = toSimilarCharacters(); // список объектов. Содержит сгенерированные рандомно имена с фамилиями, цвет мантии и цвет глаз.

var renderWizard = function (wizard) { // в качестве аргумента получаем обьект со именами name coatColor eyesColor
  var wizardElement = similarWizardTemplate.cloneNode(true); // копируем структуру шаблона со всеми потомками .similar-wizard-template

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // записываем имя персонажа
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor; // записываем цвет мантии персонажа
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor; // записываем цвет глаз персонажа

  return wizardElement;
};

var fragment = document.createDocumentFragment(); // создаем фрагмент для вставки
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i])); // прогоняем весь массив и вставляем во фрагмент
}
similarListElement.appendChild(fragment); // вставляем фрагмент на страницу
userSetup.querySelector('.setup-similar').classList.remove('hidden');