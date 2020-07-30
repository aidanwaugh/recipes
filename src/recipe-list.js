/* eslint-disable object-curly-newline */
/* eslint-disable import/prefer-default-export */
export const allRecipes = {
  breakfast: [
    {
      name: 'bisucits',
      details: { serves: 4, type: 'ppl 3pc', difficulty: 'easy peasy', prep: 15, cook: 20 },
      nutrition: {
        serving: 1,
        type: 'slice ref',
        macros: { calories: 222, carbs: 33, fat: 22, protein: 11, fiber: 88, sugar: 999 },
      },
      ingredients: [
        {
          section: 'biscuit thing',
          content: [
            { value: 9, measurement: 'cups', ingredient: 'all-purpose flour' },
            { value: 1, measurement: 'tsp', ingredient: 'salt' },
            { value: 2.5, measurement: 'tsp', ingredient: 'baking powder' },
            { value: 4, measurement: 'tbsp', ingredient: 'chilled butter, shortening, or combo' },
          ],
        },
      ],
      tags: ['breakfast', 'waugh', 'oven'],
    },
    {
      name: 'ze',
      details: { serves: 4, difficulty: 'easy', prep: 15, cook: 20 },
      nutrition: {
        serving: 1,
        macros: { calories: 122, carbs: 3, fat: 2, protein: 1, fiber: 1, sugar: 1 },
      },
      ingredients: [
        {
          section: 'other thing',
          content: [
            { value: 9, measurement: 'cups', ingredient: 'all-purpose flour' },
            { value: 1, measurement: 'tsp', ingredient: 'salt' },
            { value: 2.5, measurement: 'tsp', ingredient: 'baking powder' },
            { value: 4, measurement: 'tbsp', ingredient: 'chilled butter, shortening, or combo' },
          ],
        },
      ],
      tags: ['breakfast', 'waugh', 'oven'],
    },
  ],
};
