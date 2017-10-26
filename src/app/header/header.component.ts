import {Component} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {Response} from '@angular/http';
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: Response) => { // Response is a type that must be imported from @angular/http.
          console.log(response);
        }
      );
    }

  onRetrieveData() {
    this.dataStorageService.retrieveRecipes().subscribe(
      (response: Recipe[]) => {
        this.recipeService.updateRecipesFromDatabase(response);
        console.log(response);
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }
}
