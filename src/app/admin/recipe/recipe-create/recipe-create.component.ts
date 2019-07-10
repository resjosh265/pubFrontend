import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/classes/recipe';
import { RecipeIngredient, Ingredient } from 'src/app/classes/ingredient';
import { Cuisine } from 'src/app/classes/cuisine';
import { Directions } from 'src/app/classes/Direction';
import { RecipeService } from 'src/app/_Services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { DishType } from 'src/app/classes/dishType';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  
  recipeId: number;
  
  curIngredient: RecipeIngredient = {} as RecipeIngredient;
  ingredients: RecipeIngredient[];
  cuisines: Cuisine[];
  typeaheadIngredients: string[] = [];
  curDirection: Directions = {} as Directions;
  curRecipe: Recipe;
  curDirectionStep: number = 0;
  isEditing: boolean;
  private ModalRef;

  //selectedDishTypes = [];

  IngredientDropdown = [];
  IngredientDropdownSettings = {};

  dishTypeDropdown = [];
  //dishTypeSelectedItems = [];
  dropdownSettings = {};
  
  constructor(private recipeService: RecipeService, private modalService: NgbModal, private router: Router) {}

  ngOnInit() {
    this.getDishTypeList();
    this.getIngredientsList();

    this.curRecipe = {
      Title: '',
      Description: '',
      MinutesReady: 0,
      RecommendedServings: 0,
      Ingredients: [],
      Directions: [],
      NutritionalFacts: []
    };

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'DishTypeId',
      textField: 'Type',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.IngredientDropdownSettings = {
      singleSelection: true,
      idField: 'IngredientId',
      textField: 'Name',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  getDishTypeList(){
    this.recipeService.getDishTypeList().subscribe(data => {
      this.dishTypeDropdown = data;
    })
  }

  getIngredientsList(){
    this.recipeService.getIngredientsList().subscribe(data => {
      this.ingredients = data;

      data.forEach(d => {
        this.IngredientDropdown.push({IngredientId: d.IngredientId, Name: d.Name});
      });
      
      for(let i = 0; i < this.ingredients.length; i++){
        this.typeaheadIngredients.push(this.ingredients[i].Name.toLowerCase());
      }
    });
  }

  newIngredient(content) {
    this.isEditing = false;
    this.curIngredient = {} as Ingredient;
    this.ModalRef = this.modalService.open(content, {windowClass: 'modaltest'});
  }

  newDirection(content) {
    this.curDirectionStep = this.curDirectionStep + 1;
    this.isEditing = false;
    this.curDirection = {} as Directions;
    this.ModalRef = this.modalService.open(content, {windowClass: 'modaltest'});
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.typeaheadIngredients.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  fillNewIngredientMeasurementType(){
    let ing = this.ingredients.find(x => x.Name == this.curIngredient.Name);
    this.curIngredient.MeasurementType = ing.MeasurementType;
  }

  addNewIngredient(i: RecipeIngredient){
    this.curRecipe.Ingredients.push(i);
    this.ModalRef.close();
  }

  addNewDirection(d: Directions){
    d.Step = this.curDirectionStep;
    if (this.isEditing){
      this.curDirection.Step += 1;
    }else{
      this.curDirectionStep += 1;
    }
    this.curRecipe.Directions.push(d);
    this.ModalRef.close();
  }

  removeIngredient(index: number){
    this.curRecipe.Ingredients.splice(index, 1);
  }

  removeDirection(index: number){
    this.curRecipe.Directions.splice(index, 1);

    for(let i=0; i < this.curRecipe.Directions.length; i++){
      this.curRecipe.Directions[i].Step = i + 1;
    }

    this.curDirectionStep = this.curRecipe.Directions.length + 1;
  }

  editIngredient(content, index: number){
    this.isEditing = true;
    this.curIngredient = this.curRecipe.Ingredients[index];
    this.ModalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  editDirection(content, index: number){
    this.isEditing = true;
    this.curDirection = this.curRecipe.Directions[index];
    this.ModalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  changeImage(file: File){
   let reader = new FileReader();
   reader.readAsDataURL(file[0]);
   reader.onload = function () {
     console.log(reader.result);
     this.curRecipe.ImageReference = reader.result;
   }.bind(this);
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
  }

  closeModal(){
    this.ModalRef.close();
  }

  closeDirectionModal(){
    if (this.isEditing){
      this.curDirection.Step = this.curRecipe.Directions.length + 1;
    }else{
      this.curDirectionStep = this.curRecipe.Directions.length + 1;
    }
    this.ModalRef.close();
  }

  saveRecipe(){
    console.log(this.curRecipe);
    this.recipeService.newRecipe(this.curRecipe).subscribe(data => {
      if (data.Status.toLowerCase() == "success"){
        this.router.navigateByUrl('/admin/recipelist');
      }
    });
  }

  onItemSelect(item: any) {
    this.curIngredient = this.ingredients.find(x => x.IngredientId == item.IngredientId);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
