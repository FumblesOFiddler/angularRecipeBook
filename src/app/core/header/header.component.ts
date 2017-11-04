import {Component, OnInit} from '@angular/core';
import {DataStorageService} from "../../shared/data-storage.service";
import {Response} from '@angular/http';
import {RecipeService} from "../../recipes/recipe.service";
import {AuthService} from "../../auth/auth.service";
import {Store} from "@ngrx/store";
import * as fromAuth from '../../auth/store/auth.reducer'
import * as fromApp from '../../store/app.reducer'
import {Observable} from "rxjs/Observable";
import * as AuthActions from "../../auth/store/auth.actions"
import * as RecipeActions from '../../recipes/store/recipe.actions'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isAuthenticated: Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService, // not used, for reference
              private recipeService: RecipeService, // not used, for reference
              public authService: AuthService, // not used, for reference
              private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.isAuthenticated = this.store.select('auth'); // Name of the key in the object AppState in the App store.
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
    /*this.dataStorageService.storeRecipes()
      .subscribe(
        (response: Response) => { // Response is a type that must be imported from @angular/http.
          console.log(response);
        }
      );*/
    }

  onRetrieveData() {
  this.store.dispatch(new RecipeActions.FetchRecipes());
    /*this.dataStorageService.retrieveRecipes().subscribe(
      (response: Recipe[]) => {
        this.recipeService.updateRecipesFromDatabase(response);
        console.log(response);
      }
    );*/
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
