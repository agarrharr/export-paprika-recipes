const PaprikaApi = require('paprika-api').PaprikaApi;

const exportRecipes = async (username, password) => {
  const paprikaApi = new PaprikaApi(username, password);
  const recipes = await paprikaApi.recipes();
  const categories = await paprikaApi.categories();
  const categoryHash = categories.reduce((hash, category) => ({
    ...hash,
    [category.uid]: category
  }), {});

  const recipesDetails = await Promise.all(recipes.map(recipe =>
    paprikaApi.recipe(recipe.uid))
  );
  return recipesDetails.map(recipe => ({
    ...recipe,
    categories: recipe.categories.map(uid => categoryHash[uid])
  }));
}

module.exports = exportRecipes;
