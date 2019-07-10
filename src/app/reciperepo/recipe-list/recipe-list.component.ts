import { Component, OnInit, HostListener } from '@angular/core';
import { RecipeService } from 'src/app/_Services/recipe.service';
import { RecipeCard, Recipe } from 'src/app/classes/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: RecipeCard[];
  isMobile: boolean;

  nameFilter: string;
  ingredientFilter: string;

  pageNumber: number = 0;
  stopScroll: boolean = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.getRecipes();
    this.isMobile = this.getMobile();
    
  }

  getMobile(): boolean{
    if (window.innerWidth < 880){
      return true;
    }
  }

  getRecipes(){
    this.recipeService.getRecipeList(this.pageNumber).subscribe(data => {
      if (data.length == 0){
        return;
      }

      if (this.recipes != null){
        this.recipes = this.recipes.concat(data);
      }else{
        this.recipes = data;
      }
      this.pageNumber++;
      this.stopScroll = false;
    });
  }

  @HostListener('window:scroll', ['$event']) 
    checkScrollPosition() {
      let scrollPercentage = window.pageYOffset / document.body.scrollHeight * 100;
      if (!this.stopScroll){
        if (scrollPercentage >= 60){
          this.stopScroll = true;
          this.getRecipes();
        }
      }
    }
  }
