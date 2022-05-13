const express = require('express');
const router = express.Router();
const mockDatabase = require('../mockDatabase.js');


const data = mockDatabase.getData();
const recipes = data.recipes;

router.get('/', (req, res) => {
  if (Array.isArray(recipes)) {
    res.send(recipes);
  } else {
    res.status(404).send({error: `Unable to reach recipes`});
  }
});

router.get('/:dish', (req, res) => {
  const dish = req.params.dish;
  const recipe = recipes.find(recipe => recipe.name === dish);
  if (recipe) {
    res.send(recipe);
  } else {
    res.status(404).send({error: `Recipe not found for ${dish}`});
  }
});

router.post('/', (req, res) => {
  try {
    const newRecipe = req.body;
    recipes.push(newRecipe);
    mockDatabase.saveData(recipes);
    res.send('New recipe added');
  } catch (err) {
    res.status(500).send({error: `Unable to add recipe`});
  }
});

router.delete('/:dish', (req, res) => {
  const dish = req.params.dish;
  const recipe = recipes.find(recipe => recipe.name === dish);
  if (recipe) {
    const index = recipes.indexOf(recipe);
    recipes.splice(index, 1);
    mockDatabase.saveData(recipes);
    res.send(`${dish} deleted`);
  } else {
    res.status(404).send({error: `Recipe not found for ${dish}`});
  }
});

router.put('/:dish', (req, res) => {
  const dish = req.params.dish;
  const recipe = recipes.find(recipe => recipe.name === dish);
  if (recipe) {
    const index = recipes.indexOf(recipe);
    recipes[index] = req.body;
    mockDatabase.saveData(recipes);
    res.send("recipes updated");
  } else {
    res.status(404).send({error: `Recipe ${dish} not found`});
  }
});


module.exports = router;