import * as ShoppingListActions from './shopping-list.actions';
import {Ingredient} from "../../shared/ingredient.model";



export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [ new Ingredient('Corn chips', 100),
    new Ingredient('Mince', 500)],
  editedIngredient: null,
  editedIngredientIndex: -1
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state, // Spread operator, retains all existing properties of 'state'.
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state, // Spread operator, retains all existing properties of 'state'.
        // The payload is an array of ingredients.
        ingredients: [...state.ingredients, ...action.payload] // Have to spread both arrays to join them.
      }
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex]; // Accessing an element of the ingredients array
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state, // Spread operator, retains all existing properties of 'state'.
        // The payload is an array of ingredients.
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1); // Payload is the index.
      return {...state, ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1}; // Spread works on objects too!
    case ShoppingListActions.START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]}; // ingredients is an array of objects, you're returning one object.
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      }
      case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    default:
      return state;
  }
}
