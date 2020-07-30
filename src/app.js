/* eslint-disable import/extensions */
import { allRecipes } from './recipe-list.js';

console.log(allRecipes.breakfast); // output 'testing'

const recipeElements = {
  titleElement: '[data-recipe-title]',
  genreElement: '[data-genre]',
  servesInputElement: '[data-details-serves]',
  servesTypeElement: '[data-details-serves-type]',
  difficultyElement: '[data-details-difficulty]',
  timeElement: '[data-details-time]',
  nutritionInputElement: '[data-nutrition-serving]',
  nutritionTypeElement: '[data-nutrition-type]',
  caloriesElement: '[data-macro-calories]',
  carbsElement: '[data-macro-carbs]',
  fatElement: '[data-macro-fat]',
  proteinElement: '[data-macro-protein]',
  fiberElement: '[data-macro-fiber]',
  sugarElement: '[data-macro-sugar]',
  tagsElement: '[data-tags]',
};

const navElements = {};

const indexElements = {};

// if the title matches a content in
// console.log(allRecipes.find((title) => (title = 'biscuits')));
const recipeGenre = document.querySelector(recipeElements.genreElement).dataset.genre;
console.log(allRecipes[recipeGenre]);
// debugger;
const currentRecipe = allRecipes[recipeGenre].find((title) => title.name === 'bisucits'); // eslint-disable-line no-param-reassign
if (currentRecipe === undefined) console.error('no matching recipe');
console.log(currentRecipe);
// set details
document.querySelector(recipeElements.servesInputElement).value = currentRecipe.details.serves;
console.log(document.querySelector(recipeElements.servesInputElement));

document.querySelector(recipeElements.servesTypeElement).innerHTML = currentRecipe.details.type;
document.querySelector(recipeElements.difficultyElement).innerHTML = currentRecipe.details.difficulty;
document.querySelector(recipeElements.timeElement).innerHTML = `${currentRecipe.details.prep} min/ ${currentRecipe.details.cook} min`;
// nutrition
document.querySelector(recipeElements.nutritionTypeElement).innerHTML = currentRecipe.nutrition.type;

// macros
document.querySelector(recipeElements.caloriesElement).innerHTML = `${currentRecipe.nutrition.macros.calories} cal`;
document.querySelector(recipeElements.carbsElement).innerHTML = `${currentRecipe.nutrition.macros.carbs}g`;
document.querySelector(recipeElements.fatElement).innerHTML = `${currentRecipe.nutrition.macros.fat}g`;
document.querySelector(recipeElements.proteinElement).innerHTML = `${currentRecipe.nutrition.macros.protein}g`;
document.querySelector(recipeElements.fiberElement).innerHTML = `${currentRecipe.nutrition.macros.fiber}g`;
document.querySelector(recipeElements.sugarElement).innerHTML = `${currentRecipe.nutrition.macros.sugar}g`;

// tags
let formattedTags = '';
currentRecipe.tags.forEach((tag) => {
  // formattedTags += tag.charAt(0).toUpperCase() + tag.slice(1) + ', ';
  formattedTags += `${tag.charAt(0).toUpperCase()}${tag.slice(1)}, `;
});
// use slice -2 to remove the ', ' of last tag
document.querySelector(recipeElements.tagsElement).innerHTML = formattedTags.slice(0, -2);
