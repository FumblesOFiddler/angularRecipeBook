import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {HomeComponent} from "./core/home/home.component";


const appRoutes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},  // Matching works by parsing from left-right.
      // An empty path is part of every URL so you need to specify pathMatch property.
  {path: 'recipes', loadChildren: 'app/recipes/recipes.module#RecipesModule'}, // Module needs to be imported to app.mod
  {path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})], // Progressively preload.
  exports: [RouterModule] // Needs to be imported in app.module.
})
export class AppRoutingModule {

}
