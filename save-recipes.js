const exportPaprikaRecipes = require('./export-recipes');
const fs = require('fs');

const saveRecipes = async (username, password, filename) => {
  await exportPaprikaRecipes(username, password)
    .then(recipes => {
      fs.writeFile(filename, JSON.stringify(recipes), (err) => {
        if (err) {
          throw `Error saving file: ${err}`;
        }
        console.log(`${recipes.length} recipes were saved.`);
      });
    });
};

module.exports = saveRecipes
