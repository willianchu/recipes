const express = require('express');
const router = express.Router();
const fs = require('fs');


const RECIPE_FILE = './data.json';
const getData = () => {
  try {
        return JSON.parse(fs.readFileSync(RECIPE_FILE));
  } catch (err) {
        console.error(err);
  }
};

const recipes = getData().recipes;

router.get('/', (req, res) => {
  console.log("recipes logging", recipes);
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
  const newRecipe = req.body;
  recipes.push(newRecipe);
  res.send(recipes);
});

router.delete('/:dish', (req, res) => {
  const dish = req.params.dish;
  const recipe = recipes.find(recipe => recipe.name === dish);
  if (recipe) {
    const index = recipes.indexOf(recipe);
    recipes.splice(index, 1);
    res.send("recipe deleted");
  } else {
    res.status(404).send({error: "Recipe not found"});
  }
});



module.exports = router;