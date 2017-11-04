import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import * as recipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';

export interface FeatureState extends fromApp.AppState { // effectively injecting the app state and auth state
  recipes: State;
}

export interface  State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
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
  ]// Recipe is a class from recipe.model.ts
};


export function recipeReducer(state = initialState, action: recipeActions.RecipeActions) {
  switch (action.type) {
    case (recipeActions.SET_RECIPES):
      return {...state, recipes: [...action.payload]}; // Overwrite recipes with new recipes
    case (recipeActions.ADD_RECIPE):
      return {
        ...state, recipes: [...state.recipes, action.payload]};
    case (recipeActions.UPDATE_RECIPE):
      const modifiedRecipe = state.recipes[action.payload.index]; // Copy the recipe to be updated from the state.
      const updatedRecipe = {
        ...modifiedRecipe, ...action.payload.updatedRecipe // Create an updated version of the recipe offline
      };
      const recipes = [...state.recipes] // Create an offline copy of recipes array from the state
      recipes[action.payload.index] = updatedRecipe; // Modify the recipes array offline
      return {
        ...state, recipes: recipes // Update the online state with the new recipes array.
      };
    case (recipeActions.DELETE_RECIPE):
      const recipeBuffer = [...state.recipes]; // Copy the state.
      recipeBuffer.splice(action.payload, 1); // Don't try and use the return value of splice() dickhead
      return {
        ...state, recipes: recipeBuffer // overwrite the recipes element of the state object
      }
    default:
      return state;
  }
}
