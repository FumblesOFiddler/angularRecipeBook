import {Actions, Effect} from "@ngrx/effects";
import * as recipeActions from '../store/recipe.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {Recipe} from "../recipe.model";
import {Injectable} from "@angular/core";
import {RecipeActions} from "./recipe.actions";
import {Store} from "@ngrx/store";
import * as fromRecipe from './recipe.reducers'

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(recipeActions.FETCH_RECIPES)
    .switchMap((action: recipeActions.FetchRecipes) => {
      return this.http.get<Recipe[]>('https://recipe-book-jc.firebaseio.com/recipes.json',
        {observe: 'body', responseType: 'json' }); // Makes it give us the FULL response
    })
    .map( // HTTPClient as opposed to HTTP allows you do define what type of data you'll get back.
      (recipes) => {
        for (let data of recipes) { // It's possible that a recipe has been edited and pushed to the server without
          // recipes. The back end will purge the data if the array is empty when it's pushed, which will break
          // compatibility, so if ingredients aren't found, add them.
          if (!data['ingredients']) {
            data['ingredients'] = [];
          }
        }
        return {
          type: recipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    );

  @Effect({dispatch: false})
  recipeSaveToDB = this.actions$
    .ofType(recipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', 'https://recipe-book-jc.firebaseio.com/recipes.json',
        state.recipes, {reportProgress: true});
      return this.http.request(req);
      }

    );
  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {}
}
