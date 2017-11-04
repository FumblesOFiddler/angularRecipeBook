import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs/Subject";
import {Store} from "@ngrx/store";

export class RecipeService {

  // Recipe service no longer used.


  recipesChanged = new Subject<Recipe[]>();
  recipes: any;

  getRecipes() {
    return this.recipes.slice(); // Returns a copy of the array so we don't return byref.
  }
  // The below methods have been replaced by NgRx state management which while being a faff does make life easier.

 /* getRecipeById(id: number) {
    return this.recipes[id];
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }*/
  updateRecipesFromDatabase(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
