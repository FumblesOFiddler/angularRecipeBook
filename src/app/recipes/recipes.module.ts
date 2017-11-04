import {NgModule} from "@angular/core";
import {RecipesComponent} from "./recipes.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {SharedModule} from "../shared/shared.module";
import {StoreModule} from "@ngrx/store";
import {recipeReducer} from "./store/recipe.reducers";
import {EffectsModule} from "@ngrx/effects";
import {RecipeEffects} from "./store/recipe.effects";

@NgModule({
  declarations: [ // The same thing cannot be declared by more than one module.
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeStartComponent
  ],
  // It's important to understand that this imports array has nothing to do with the imports at the top of the source
  // file. These are the imports angular uses to figure out dependencies for the components in this module.
  // The other import statements are a language feature of typescript so it knows how to generate your JS.
  imports: [
    CommonModule,  // Needs to be imported to make common directives work, e.g. ngif, lifecycle hooks,
                    // instead of BrowserModule which can be used but is more weighty.
    FormsModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
    StoreModule.forFeature('recipes', recipeReducer),
    EffectsModule.forFeature([RecipeEffects])
  ]
})
export class RecipesModule {}
