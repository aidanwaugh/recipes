/* eslint-disable object-curly-newline */
/* eslint-disable import/prefer-default-export */
export const allRecipes = {
  breakfast: [
    {
      name: 'Biscuits',
      details: { serves: 4, type: 'people 5pp', difficulty: 'easy peasy', prep: 99, cook: 88 },
      nutrition: { serving: 1, type: 'slice ref', macros: { calories: 222, carbs: 33, fat: 22, protein: 11, fiber: 88, sugar: 999 } },
      tags: ['breakfast', 'waugh', 'oven'],
    },
  ],
  dinner: [
    {
      name: 'Honey Garlic Chicken Wings',
      details: { serves: 4, type: 'people', difficulty: 'easy', prep: 20, cook: 50 },
      nutrition: { serving: 1, type: 'x wings', macros: { calories: 11, carbs: 11, fat: 22, protein: 33, fiber: 4, sugar: 5 } },
      tags: ['dinner', 'waugh', 'oven', 'chicken'],
    },
    {
      name: 'Pork Dumplings',
      details: { serves: 4, type: 'people', difficulty: 'easy', prep: 60, cook: 10 },
      nutrition: { serving: 1, type: 'dumpling', macros: { calories: 11, carbs: 11, fat: 22, protein: 33, fiber: 4, sugar: 5 } },
      tags: ['dinner', 'dumpling', 'chinese', 'pork', 'damndelicious'],
    },
  ],
  dessert: [
    {
      name: 'Biscotti',
      details: { serves: 6, type: 'people', difficulty: 'easy', prep: 20, cook: 10 },
      nutrition: { serving: 1, type: 'slices', macros: { calories: 11, carbs: 11, fat: 22, protein: 33, fiber: 4, sugar: 5 } },
      tags: ['waugh', 'xmas', 'dessert'],
    },
  ],
  snacks: [
    {
      name: 'Romesco',
      details: { serves: 6, type: 'people', difficulty: 'easy', prep: 20, cook: 10 },
      nutrition: { serving: 1, type: 'cup?', macros: { calories: 11, carbs: 11, fat: 22, protein: 33, fiber: 4, sugar: 5 } },
      tags: ['waugh', 'snack', 'blender'],
    },
  ],
};
