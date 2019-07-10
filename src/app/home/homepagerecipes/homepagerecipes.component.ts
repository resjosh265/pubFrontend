import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/_Services/recipe.service';
import { RecipeCard } from 'src/app/classes/recipe';

@Component({
  selector: 'app-homepagerecipes',
  templateUrl: './homepagerecipes.component.html',
  styleUrls: ['./homepagerecipes.component.css']
})
export class HomepageRecipesComponent implements OnInit {

  recipes: RecipeCard[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.getHomepageRecipes();
  }

  getHomepageRecipes(){
    this.recipeService.getHomepageRecipes().subscribe(data => {
        this.recipes = data;
      }
    )
  }

}
