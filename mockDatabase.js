const fs = require('fs');

const RECIPE_FILE = './data.json';

const getData = () => {
  try {
        return JSON.parse(fs.readFileSync(RECIPE_FILE));
  } catch (err) {
        console.error(err);
  }
};

const saveData = (data) => {
  try {
        
        fs.writeFileSync(RECIPE_FILE, JSON.stringify({ "recipes": data }));
  } catch (err) {
        console.error(err);
  }
};

module.exports = mockDatabase = { getData, saveData };