const express = require('express');
const bodyParser = require('body-parser');
const recipesRoutes = require('./routes/recipes.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/recipes', recipesRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(PORT, () => {
  console.log(`Server App listening on port ${PORT}`)
});