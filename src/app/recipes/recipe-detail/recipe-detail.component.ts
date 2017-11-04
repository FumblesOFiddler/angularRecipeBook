import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../../shopping-list/store-ngrx/shopping-list.actions';
import {Observable} from "rxjs/Observable";
import * as fromRecipe from '../store/recipe.reducers';
import * as recipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;
  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];  // + casts as number
        this.recipeState = this.store.select('recipes');
      }
    );
  }
  onAddToSL() {
    // let tempArray: Ingredient[] = [];
    this.store.select('recipes')
      .take(1)
      .subscribe((recipeState: fromRecipe.State) => {
        this.store.dispatch(new ShoppingListActions.AddIngredients(
          recipeState.recipes[this.id].ingredients)
        );
      });
    // for (let entry of this.recipeDetails.ingredients) {
    //  tempArray.push(entry);
    // }
    // this.store.dispatch(new ShoppingListActions.AddIngredients(tempArray));
  }
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
  this.store.dispatch(new recipeActions.DeleteRecipe(this.id));
   this.router.navigate(['../'], {relativeTo: this.route});
  }
}
