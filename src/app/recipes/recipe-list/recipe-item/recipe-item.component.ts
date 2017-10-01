import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from "../../recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeItem: Recipe;  // Imported model
  @Output() recipeClicked = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  recipeItemClick() {
    this.recipeClicked.emit();
  }
}
