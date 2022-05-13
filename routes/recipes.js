const express = require('express');

const router = express.Router();

const recipes = [
  {
    name: "scrambledEggs",
    ingredients: [
      "1 tsp oil",
      "2 eggs",
      "salt"
    ],
    instructions: [
      "Beat eggs with salt",
      "Heat oil in pan",
      "Add eggs to pan when hot",
      "Gather eggs into curds, remove when cooked",
      "Salt to taste and enjoy"
    ]
  },
  {
    name: "garlicPasta",
    ingredients: [
      "500mL water",
      "100g spaghetti",
      "25mL olive oil",
      "4 cloves garlic",
      "Salt"
    ],
    instructions: [
      "Heat garlic in olive oil",
      "Boil water in pot",
      "Add pasta to boiling water",
      "Remove pasta from water and mix with garlic olive oil",
      "Salt to taste and enjoy"
    ]
  }
];

router.get('/', (req, res) => {
  res.send(recipes);
});

router.get('/:dish', (req, res) => {
  const dish = req.params.dish;
  const recipe = recipes.find(recipe => recipe.name === dish);
  if (recipe) {
    res.send(recipe);
  } else {
    res.status(404).send({error: "Recipe not found"});
  }
});

router.post('/', (req, res) => {
  console.log('Incoming POST request');
  const newRecipe = req.body;
  recipes.push(newRecipe);
  res.send(recipes);
});


module.exports = router;