import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/_Services/recipe.service';
import { RecipeCard } from 'src/app/classes/recipe';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit {
  
  recipes: RecipeCard[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    
  }
}
