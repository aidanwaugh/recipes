/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
import { allRecipes } from './recipe-list.js';

// console.log(allRecipes.breakfast); // output 'testing'

const recipeElements = {
  title: '[data-recipe-title]',
  genre: '[data-genre]',
  servesInput: '[data-details-serves]',
  servesType: '[data-details-serves-type]',
  difficulty: '[data-details-difficulty]',
  time: '[data-details-time]',
  nutritionInput: '[data-nutrition-serving]',
  nutritionType: '[data-nutrition-type]',
  calories: '[data-macro-calories]',
  carbs: '[data-macro-carbs]',
  fat: '[data-macro-fat]',
  protein: '[data-macro-protein]',
  fiber: '[data-macro-fiber]',
  sugar: '[data-macro-sugar]',
  tags: '[data-tags]',
  ingredientList: '[data-ingredient-list]',
  ingredients: '[data-ingredient]',
};

const indexElements = {};

const recipeGenre = document.querySelector(recipeElements.genre).dataset.genre;
const recipeTitle = document.querySelector(recipeElements.title).innerHTML;
console.log(allRecipes[recipeGenre]);
const currentRecipe = allRecipes[recipeGenre].find((title) => title.name === recipeTitle); // eslint-disable-line no-param-reassign
if (currentRecipe === undefined) console.error(`no matching recipe from title  ${recipeTitle} currRec is ${currentRecipe}`);
console.log(currentRecipe);

const servesInputElement = document.querySelector(recipeElements.servesInput);
const nutritionInputElement = document.querySelector(recipeElements.nutritionInput);

/* Initial recipe load setup --------------------- */
// set details

// document.querySelector(recipeElements.servesInput).value = currentRecipe.details.serves;
servesInputElement.value = currentRecipe.details.serves;
document.querySelector(recipeElements.servesType).innerHTML = currentRecipe.details.type;

document.querySelector(recipeElements.difficulty).innerHTML = `${currentRecipe.details.difficulty
  .charAt(0)
  .toUpperCase()}${currentRecipe.details.difficulty.slice(1)}`;
document.querySelector(recipeElements.time).innerHTML = `${currentRecipe.details.prep} min/ ${currentRecipe.details.cook} min`;

// macros
function renderMacros(multiplier) {
  document.querySelector(recipeElements.calories).innerHTML = `${currentRecipe.nutrition.macros.calories * multiplier} cal`;
  document.querySelector(recipeElements.carbs).innerHTML = `${currentRecipe.nutrition.macros.carbs * multiplier}g`;
  document.querySelector(recipeElements.fat).innerHTML = `${currentRecipe.nutrition.macros.fat * multiplier}g`;
  document.querySelector(recipeElements.protein).innerHTML = `${currentRecipe.nutrition.macros.protein * multiplier}g`;
  document.querySelector(recipeElements.fiber).innerHTML = `${currentRecipe.nutrition.macros.fiber * multiplier}g`;
  document.querySelector(recipeElements.sugar).innerHTML = `${currentRecipe.nutrition.macros.sugar * multiplier}g`;
  if (parseInt(multiplier, 10) === 1) {
    document.querySelector(recipeElements.nutritionType).innerHTML = `${currentRecipe.nutrition.type}`;
  } else {
    document.querySelector(recipeElements.nutritionType).innerHTML = `${currentRecipe.nutrition.type}s`;
  }
  // console.log(parseInt(multiplier, 10));
  nutritionInputElement.value = multiplier;
}
renderMacros(1);

// tags
let formattedTags = '';
currentRecipe.tags.forEach((tag) => {
  formattedTags += `${tag.charAt(0).toUpperCase()}${tag.slice(1)}, `;
});
// use slice -2 to remove the ', ' of last tag
document.querySelector(recipeElements.tags).innerHTML = formattedTags.slice(0, -2);

nutritionInputElement.addEventListener('change', (e) => {
  console.log('changed');
  renderMacros(nutritionInputElement.value);
});

// ingredients ------------------------
const ingredientElements = document.querySelectorAll(recipeElements.ingredients);
console.log(ingredientElements);

const ingredientListElement = document.querySelectorAll(recipeElements.ingredientList);

// toggle ingredient check mark
ingredientListElement.forEach((list) => {
  list.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('complete');
    } else if (e.target.tagName === 'SPAN' || e.target.tagName === 'EM') {
      e.target.parentElement.classList.toggle('complete');
    }
  });
});

function updateIngredients(newValue) {
  // debugger;
  console.log(typeof newValue);
  const defaultServesValue = currentRecipe.details.serves;
  const multiplier = (newValue / defaultServesValue).toFixed(2);

  // soft conversion of measurements
  const mlPer = {
    ml: 1,
    tsp: 5, // 4.2
    tbsp: 15, // 14.8
    cup: 250,
    litre: 1000,
  };

  function formatentireFraction(value, measurementType) {
    /* split value into whole, numerator, denominator
    if larger than 1 have no S, if larger have S
    return as a fraction */
    let plural = '';
    if (value > 1) plural = 's';

    const roundUp = 87;
    const defaultComparison = [0, 25, 50, 75];
    const tspComparison = [0, 12, 25, 50, 75];
    const cupComparison = [0, 25, 33, 50, 66, 75];
    const numberToFraction = {
      0: '',
      12: '1/8',
      25: '1/4',
      33: '1/3',
      50: '1/2',
      66: '2/3',
      75: '3/4',
    };
    // console.log(value.toFixed(2));
    const valueString = value.toFixed(2);
    let wholeNumber = '';
    let space = ' ';
    let fraction = '';
    let entireFraction = '';
    let closestValue;

    if (valueString.match(/\d+\./) !== null) {
      wholeNumber = valueString.match(/\d+\./)[0].slice(0, -1);
      const decimal = parseInt(valueString.match(/\.\d+/)[0].slice(1, 3), 10);
      console.log(valueString.match(/\.\d+/)[0]);
      if (decimal >= roundUp) {
        wholeNumber = parseInt(wholeNumber, 10) + 1;
        fraction = '0';
      } else if (measurementType === 'cup' && decimal < roundUp) {
        closestValue = cupComparison.reduce((prev, curr) => (Math.abs(curr - decimal) < Math.abs(prev - decimal) ? curr : prev));
        fraction = numberToFraction[closestValue.toString()];
      } else if (measurementType === 'tsp' && decimal < roundUp) {
        closestValue = tspComparison.reduce((prev, curr) => (Math.abs(curr - decimal) < Math.abs(prev - decimal) ? curr : prev));
        fraction = numberToFraction[closestValue.toString()];
      } else {
        closestValue = defaultComparison.reduce((prev, curr) => (Math.abs(curr - decimal) < Math.abs(prev - decimal) ? curr : prev));
        fraction = numberToFraction[closestValue.toString()];
      }

      console.log(wholeNumber, decimal, closestValue, fraction);

      if (wholeNumber === '0') {
        wholeNumber = '';
        space = '';
      }
      if (fraction === '0') {
        fraction = '';
        space = '';
      }
      entireFraction = `${wholeNumber}${space}${fraction} ${measurementType}${plural} `;
    } else if (valueString.match(/\d+/) !== null) {
      wholeNumber = valueString.match(/\d+/);
      entireFraction = `${wholeNumber} ${measurementType}${plural}`;
    } else {
      return console.error('no match');
    }
    return entireFraction;
  }

  function formatMultipliedMeasurement(measurement, measurementType) {
    let finalString = '';
    if (measurementType === 'g') finalString = `${measurement.toFixed(0).toString()}g`;
    if (measurementType === 'ml') {
      if (measurement < mlPer.tsp) {
        const x = measurement / mlPer.tsp;
        finalString = formatentireFraction(x, 'tsp');
      } else if (measurement >= mlPer.tsp && measurement < mlPer.tbsp) {
        const x = measurement / mlPer.tsp;
        finalString = formatentireFraction(x, 'tsp');
      } else if (measurement >= mlPer.tbsp && measurement < mlPer.cup / 4) {
        const x = measurement / mlPer.tbsp;
        finalString = formatentireFraction(x, 'tbsp');
      } else if (measurement >= mlPer.cup / 4 && measurement < mlPer.litre) {
        const x = measurement / mlPer.cup;
        finalString = formatentireFraction(x, 'cup');
      } else if (measurement >= mlPer.litre) {
        const x = measurement / mlPer.litre;
        finalString = formatentireFraction(x, 'litre');
      }
    }
    return finalString;
  }

  const adjustedIngredients = [];
  ingredientElements.forEach((x) => {
    const ingredient = x.dataset.ingredient;
    let numberOriginal = 0;
    if (ingredient.match(/\d\.\d|\d+\s\d\.\d/g) !== null) {
      let wholeNumber = 0;
      let numerator = 0;
      let denominator = 0;
      if (ingredient.match(/\d\.\d/g)) {
        numerator = parseInt(ingredient.match(/\d\.\d/g)[0], 10);
        denominator = parseInt(ingredient.match(/\.\d/g)[0].slice(1), 10);
        numberOriginal = (numerator / denominator).toFixed(2);
      }
      if (ingredient.match(/\d+\s\d\.\d/g) !== null) {
        wholeNumber = parseInt(ingredient.match(/^\d+/g)[0], 10);
        numerator = parseInt(ingredient.match(/\d\./g)[0], 10);
        denominator = parseInt(ingredient.match(/\.\d/g)[0].slice(1), 10);
        numberOriginal = (wholeNumber + numerator / denominator).toFixed(2);
      }
    } else if (ingredient.match(/\d*\.*\d+/g) !== null) {
      numberOriginal = ingredient.match(/\d*\.*\d+/g)[0];
    }
    let numberAdjusted = 0;
    let newMeasurement = '';

    if (ingredient.match(/ml/g) !== null) {
      numberAdjusted = numberOriginal * mlPer.ml * multiplier;
      newMeasurement = formatMultipliedMeasurement(numberAdjusted, 'ml');
    } else if (ingredient.match(/tsp/g) !== null) {
      numberAdjusted = numberOriginal * mlPer.tsp * multiplier;
      newMeasurement = formatMultipliedMeasurement(numberAdjusted, 'ml');
    } else if (ingredient.match(/tbsp/g) !== null) {
      numberAdjusted = numberOriginal * mlPer.tbsp * multiplier;
      newMeasurement = formatMultipliedMeasurement(numberAdjusted, 'ml');
    } else if (ingredient.match(/cup/g) !== null) {
      numberAdjusted = numberOriginal * mlPer.cup * multiplier;
      newMeasurement = formatMultipliedMeasurement(numberAdjusted, 'ml');
    } else if (ingredient.match(/litre/g) !== null) {
      numberAdjusted = numberOriginal * mlPer.litre * multiplier;
      newMeasurement = formatMultipliedMeasurement(numberAdjusted, 'ml');
    } else if (ingredient.match(/g/g) !== null) {
      numberAdjusted = numberOriginal * multiplier;
      newMeasurement = formatMultipliedMeasurement(numberAdjusted, 'g');
    }
    x.innerHTML = newMeasurement;
    adjustedIngredients.push(newMeasurement);
  });
  console.log(adjustedIngredients);
}

servesInputElement.addEventListener('change', () => {
  updateIngredients(parseInt(servesInputElement.value, 10));
});

console.log(ingredientElements);
window.onload = updateIngredients(servesInputElement.value);

/*  --------------- nav ------------- */
const navElements = {
  logo: '[data-nav-logo]',
  all: '[data-nav-all]',
  breakfast: '[data-nav-breakfast]',
  dinner: '[data-nav-dinner]',
  dessert: '[data-nav-dessert]',
  snacks: '[data-nav-snacks]',
  form: '[data-nav-form]',
  input: '[data-nav-input]',
};

const navInput = document.querySelector(navElements.input);
const navForm = document.querySelector(navElements.form);

// ingredients: '[data-ingredient]',
const breakpointWidths = {
  xl: '(max-width: 2000px)',
  lg: '(max-width: 1200px)',
  md: '(max-width: 900px)',
  sm: '(max-width: 600px)',
};

function myFunction(x) {
  if (x.matches) {
    // If media query matches
    document.querySelector(navElements.breakfast).classList.add('hide');
    document.querySelector(navElements.dinner).classList.add('hide');
    document.querySelector(navElements.dessert).classList.add('hide');
    document.querySelector(navElements.snacks).classList.add('hide');
  } else {
    document.querySelector(navElements.breakfast).classList.remove('hide');
    document.querySelector(navElements.dinner).classList.remove('hide');
    document.querySelector(navElements.dessert).classList.remove('hide');
    document.querySelector(navElements.snacks).classList.remove('hide');
  }
}

let x = window.matchMedia(breakpointWidths.md);
myFunction(x); // Call listener function at run time
x.addListener(myFunction); // Attach listener function on state changes

navForm.addEventListener('click', (e) => {
  e.preventDefault();
  navInput.value = '';
});
