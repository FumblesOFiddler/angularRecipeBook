import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {AuthGuard} from "../auth/auth-guard.service";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {NgModule} from "@angular/core";

const recipesRoutes: Routes = [
  {path: 'recipes', component: RecipesComponent, children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard]},
    {path: ':id', component: RecipeDetailComponent},  // Be careful how you order routes, the router tries to parse them
    // sequentially.
    {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard]}
  ] },
]

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes) // You need to use forChild instead of forRoot, forRoot can only be used once.
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
