import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {RecipeService} from "../recipes/recipe.service";
import 'rxjs/Rx';
import {Recipe} from "../recipes/recipe.model";
import {AuthService} from "../auth/auth.service"; // Needed for fancy observable nonsense

@Injectable()
export class DataStorageService {

  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://recipe-book-jc.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    // ^^ automatically JSONifies output
  }

  // This requires authentication, check out the auth.service.
  retrieveRecipes() {
    const token = this.authService.getToken();
    return this.http.get('https://recipe-book-jc.firebaseio.com/recipes.json?auth=' + token)
      .map(  // this isn't necessary as it will map to JSON for you, just practicing!
        (response: Response) => {
          const newData: Recipe[] = response.json();
          for (let data of newData) { // It's possible that a recipe has been edited and pushed to the server without
            // recipes. The back end will purge the data if the array is empty when it's pushed, which will break
            // compatibility, so if ingredients aren't found, add them.
            if (!data['ingredients']) {
              data['ingredients'] = [];
            }
          }
          return newData;
        }
      );
  }

}
