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

const ingredientListElement = document.querySelector(recipeElements.ingredientList);
// toggle ingredient check mark
ingredientListElement.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('complete');
  } else if (e.target.tagName === 'SPAN' || e.target.tagName === 'EM') {
    e.target.parentElement.classList.toggle('complete');
  }
});

function updateIngredients(newValue) {
  const defaultValue = currentRecipe.details.serves;
  const multiplier = (newValue / defaultValue).toFixed(2);
  // console.log(multiplier);

  /*   TODO: convert measurements
1 take value to ml
multimply ML value and round to right value
convert to proper measurement
add proper ending 'cup', 'tsp'
*/

  /*   function multiplyBaseMeasurement(ingredient, numberOriginal) {
    // all to mL except grams (last one)
    if (ingredient.match(/tsp/g) !== null) {
      return numberOriginal * 4.2 * multiplier;
    } else if (ingredient.match(/tbsp/g) !== null) {
      return numberOriginal * 14.8 * multiplier;
    } else if (ingredient.match(/cup/g) !== null) {
      return numberOriginal * 250 * multiplier;
    } else if (ingredient.match(/ml/g) !== null) {
      return numberOriginal * multiplier;
    } else if (ingredient.match(/g/g) !== null) {
      return numberOriginal * multiplier;
    }
  } */
  const mlPer = {
    ml: 1,
    tsp: 4.2,
    tbsp: 14.8,
    cup: 250,
    litre: 1000,
  };

  function formatMultipliedMeasurement(measurement, measurementType) {
    let finalString = '';
    if (measurementType === 'g') finalString = `${measurement.toFixed(0).toString()}g`;
    if (measurementType === 'ml') {
      if (measurement > mlPer.cup / 4 && measurement < mlPer.litre) {
        let x = measurement / mlPer.cup;
        if (measurement / mlPer.cup <= 1) {
          finalString = `${x.toString()} cup`;
        } else {
          finalString = `${x.toString()} cups`;
        }
      } else if (measurement >= mlPer.litre) {
        let x = measurement / mlPer.litre;
        if (measurement / mlPer.litre <= 1) {
          finalString = `${x.toString()} litre`;
        } else {
          finalString = `${x.toString()} litres`;
        }
      }
    }
    return finalString;
  }

  const adjustedIngredients = [];
  ingredientElements.forEach((x) => {
    let ingredient = x.innerHTML;
    let numberOriginal = ingredient.match(/\d*\.*\d+/g)[0];
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

    adjustedIngredients.push(newMeasurement);
  });
  console.log(adjustedIngredients);
}

servesInputElement.addEventListener('change', () => {
  updateIngredients(servesInputElement.value);
});
