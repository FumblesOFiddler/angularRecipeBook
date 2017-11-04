import {Injectable} from "@angular/core";
import {RecipeService} from "../recipes/recipe.service";
import 'rxjs/Rx';
import {Recipe} from "../recipes/recipe.model";
import {AuthService} from "../auth/auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {recognize} from "@angular/router/src/recognize"; // Needed for fancy observable nonsense??

// This service not used anymore, left here for reference.

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  storeRecipes() {
    return this.http.put('https://recipe-book-jc.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      {observe: 'body',
      // headers: HttpHeaders().set('Auth', 'dicks')  // How you'd set up a header if you needed to.
      //   params: new HttpParams().set('auth', token) // Do the URL parameters w/ const token = this.authService.getToken();
        });
    // ^^ automatically JSONifies output
  }

  // This requires authentication, check out the auth.service.
  retrieveRecipes() {
    // const token = this.authService.getToken();
    // return this.http.get<Recipe[]>('https://recipe-book-jc.firebaseio.com/recipes.json?auth=' + token)
    return this.http.get('https://recipe-book-jc.firebaseio.com/recipes.json',
      {observe: 'body', responseType: 'json' }) // Makes it give us the FULL response
      .map( // HTTPClient as opposed to HTTP allows you do define what type of data you'll get back.
        (recipes: Recipe[]) => {
          for (let data of recipes) { // It's possible that a recipe has been edited and pushed to the server without
            // recipes. The back end will purge the data if the array is empty when it's pushed, which will break
            // compatibility, so if ingredients aren't found, add them.
            if (!data['ingredients']) {
              data['ingredients'] = [];
            }
          }
          return recipes;
        }
      );
  }

}
