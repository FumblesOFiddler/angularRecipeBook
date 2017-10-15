import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";

export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Nachos',
      'Delicious nachos',
      'https://search.chow.com/thumbnail/800/600/www.chowstatic.com/assets/recipe_photos/30080_breakfast_nachos.jpg',
      [
        new Ingredient('Corn Chips - bag', 1),
        new Ingredient('Beef - grams', 500)
      ]),
    new Recipe('MA DICK',
      'MY PENIS',
      'https://i.pinimg.com/originals/a2/15/6e/a2156efe67d397874dc1b6db4518408b.jpg',
      [
        new Ingredient('Inches', 16),
        new Ingredient('Pubes', 1000)
      ])
  ]; // Recipe is a class from recipe.model.ts

  getRecipes() {
    return this.recipes.slice(); // Returns a copy of the array so we don't return byref.
  }
  getRecipeById(id: number) {
    return this.recipes[id];
  }
}