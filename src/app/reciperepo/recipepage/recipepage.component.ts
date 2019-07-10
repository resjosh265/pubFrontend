import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/_Services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/classes/recipe';

@Component({
  selector: 'app-recipepage',
  templateUrl: './recipepage.component.html',
  styleUrls: ['./recipepage.component.css']
})
export class RecipepageComponent implements OnInit {

  recipeId: number;
  curRecipe: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {
    this.route.params.subscribe( data => {
      this.recipeId = data['id'];
    }); 
  }

  ngOnInit() {
    this.getRecipe(this.recipeId);
  }

  getRecipe(id: number){
    this.recipeService.getRecipe(id).subscribe(data => {
      this.curRecipe = data;
      console.log(this.curRecipe);
    });
  }

}
