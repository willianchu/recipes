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
    res.status(200).send({});
  }
});

router.post('/', (req, res) => {
  try {
    const newRecipe = req.body;
    recipes.push(newRecipe);
    mockDatabase.saveData(recipes);
    res.status(201).send(newRecipe);
  } catch (err) {
    res.status(400).send({error: "Recipe already exists"});
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

router.put('/', (req, res) => {
  const newRecipe = req.body;
  const dish = newRecipe.name;
  const recipe = recipes.find(recipe => recipe.name === dish);
  if (recipe) {
    const index = recipes.indexOf(recipe);
    recipes[index] = newRecipe;
    mockDatabase.saveData(recipes);
    res.status(204).send();
  } else {
    res.status(404).send({error: "Recipe does not exist"});
  }
});


module.exports = router;