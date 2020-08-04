/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
import { allRecipes } from './recipe-list.js';

console.log(allRecipes.breakfast); // output 'testing'

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

const navElements = {};

const indexElements = {};

const recipeGenre = document.querySelector(recipeElements.genre).dataset.genre;
console.log(allRecipes[recipeGenre]);
const currentRecipe = allRecipes[recipeGenre].find((title) => title.name === 'bisucits'); // eslint-disable-line no-param-reassign
if (currentRecipe === undefined) console.error('no matching recipe');
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
// ingredientListElement.addEventListener('click', (e) => {
//   if (e.target.tagName === 'LI') {
//     e.target.classList.toggle('complete');
//   } else if (e.target.tagName === 'SPAN' || e.target.tagName === 'EM') {
//     e.target.parentElement.classList.toggle('complete');
//   }
// });

// const originalIngredients = [];

// ingredientElements.forEach((ingredient) => {
//   originalIngredients.push(ingredient.innerHTML);
// });

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

  function formatMultipliedMeasurement(measurement, measurementType) {
    let finalString = '';
    if (measurementType === 'g') finalString = `${measurement.toFixed(0).toString()}g`;
    if (measurementType === 'ml') {
      if (measurement < mlPer.tsp) {
        let x = measurement / mlPer.tsp;
        finalString = `${x.toFixed(2).toString()} tsp`;
      } else if (measurement >= mlPer.tsp && measurement < mlPer.tbsp) {
        let x = measurement / mlPer.tsp;
        if (measurement / mlPer.tsp <= 1) {
          finalString = `${x.toFixed(2).toString()} tsp`;
        } else {
          finalString = `${x.toFixed(2).toString()} tsps`;
        }
      } else if (measurement >= mlPer.tbsp && measurement < mlPer.cup / 4) {
        let x = measurement / mlPer.tbsp;
        if (measurement / mlPer.tbsp <= 1) {
          finalString = `${x.toFixed(2).toString()} tbsp`;
        } else {
          finalString = `${x.toFixed(2).toString()} tbsps`;
        }
      } else if (measurement >= mlPer.cup / 4 && measurement < mlPer.litre) {
        let x = measurement / mlPer.cup;
        if (measurement / mlPer.cup <= 1) {
          finalString = `${x.toFixed(2).toString()} cup`;
        } else {
          finalString = `${x.toFixed(2).toString()} cups`;
        }
      } else if (measurement >= mlPer.litre) {
        let x = measurement / mlPer.litre;
        if (measurement / mlPer.litre <= 1) {
          finalString = `${x.toFixed(2).toString()} litre`;
        } else {
          finalString = `${x.toFixed(2).toString()} litres`;
        }
      }
    }
    return finalString;
  }

  const adjustedIngredients = [];
  ingredientElements.forEach((x) => {
    // TODO: equalt to origional element
    let ingredient = x.dataset.ingredient;
    let numberOriginal = 0;
    // eslint-disable-next-line prefer-destructuring
    // console.log(ingredient.match(/\d\/\d|\d+\s\d\/\d/g) !== null);
    // debugger;
    if (ingredient.match(/\d\.\d|\d+\s\d\.\d/g) !== null) {
      let wholeNumber = 0;
      let numerator = 0;
      let denominator = 0;
      if (ingredient.match(/\d\.\d/g)) {
        numerator = parseInt(ingredient.match(/\d\.\d/g)[0], 10);
        denominator = parseInt(ingredient.match(/\.\d/g)[0].slice(1), 10);
        // console.log(denominator);
        numberOriginal = (numerator / denominator).toFixed(2);
        // console.log(numerator);
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
    // ingredient = newMeasurement;
    x.innerHTML = newMeasurement;
    adjustedIngredients.push(newMeasurement);
  });
  console.log(adjustedIngredients);
}

servesInputElement.addEventListener('change', () => {
  updateIngredients(parseInt(servesInputElement.value, 10));
});

console.log(ingredientElements);
window.onload = updateIngredients(4);
