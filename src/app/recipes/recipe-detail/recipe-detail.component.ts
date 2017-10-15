import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetails: Recipe;
  id: number;
  constructor(private slService: ShoppingListService,
              private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeDetails = this.recipeService.getRecipeById(this.id);
      }
    );
  }
  onAddToSL() {
    for (let entry of this.recipeDetails.ingredients) {
      this.slService.addIngredient(entry);
    }
  }
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
