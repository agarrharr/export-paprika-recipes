const exportPaprikaRecipes = require('./export-recipes');
const fs = require('fs');
const request = require('request');

const download = (uri, filename, callback) => {
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

const saveRecipes = async (username, password, filename, photoDirectory) => {
  const recipes = await exportPaprikaRecipes(username, password);

    fs.writeFile(filename, JSON.stringify(recipes), (err) => {
      if (err) {
        throw `Error saving file: ${err}`;
      }
      console.log(`${recipes.length} recipes were saved.`);
    });

    recipes.map(recipe => {
      download(recipe.photo_url, `${photoDirectory}/${recipe.uid}.jpg`, () => {})
    });
};

module.exports = saveRecipes
