# export-paprika-recipes

Exports recipes from Paprika using their API.

## Install

```sh
npm install export-paprika-recipes
```

## exportRecipes

To get an array of recipes:

```js
const paprika = require('export-paprika-recipes');

paprika.exportRecipes(username, password)
  .then(recipes => {
    console.log(recipes);
  });
```

## saveRecipes

To save the recipes to a json file:

```js
const paprika = require('export-paprika-recipes');

paprika.saveRecipes(username, password, 'recipes.json');
```

## Related

- [paprika-api](https://github.com/joshstrange/paprika-api)

## License

MIT
