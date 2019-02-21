const exportPaprikaRecipes = require('./export-recipes');
const fs = require('fs');
const request = require('request');

const download = (uri, filename, callback) => {
  request.head(uri, function(err, res, body){
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);

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
      // console.log(recipe.photo_url);
      console.log(`${photoDirectory}/${recipe.uid}.jpg`);
      download(recipe.photo_url, `${photoDirectory}/${recipe.uid}.jpg`, () => console.log(`Downloaded ${recipe.photo_url}`))
    });
};

module.exports = saveRecipes
