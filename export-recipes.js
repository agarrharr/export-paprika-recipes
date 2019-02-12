const PaprikaApi = require('paprika-api').PaprikaApi;

const exportRecipes = async (username, password) => {
  const paprikaApi = new PaprikaApi(username, password);
  const recipes = await paprikaApi.recipes();

  return await Promise.all(recipes.map(recipe => paprikaApi.recipe(recipe.uid)));
}

module.exports = exportRecipes;
