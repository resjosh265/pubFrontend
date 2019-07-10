import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/_Services/recipe.service';
import { Recipe } from 'src/app/classes/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ingredient, RecipeIngredient } from 'src/app/classes/ingredient';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Directions } from 'src/app/classes/Direction';
import { Cuisine } from 'src/app/classes/cuisine';
import { DishType } from 'src/app/classes/dishType';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeId: number;
  curRecipe: Recipe;
  curIngredient: RecipeIngredient;
  ingredients: Ingredient[];
  cuisines: Cuisine[];
  typeaheadIngredients: string[] = [];
  curDirection: Directions;

  curDirectionStep: number;
  isEditing: boolean;
  loading: boolean;
  private ModalRef;

  //selectedDishTypes = [];

  IngredientDropdown = [];
  IngredientDropdownSettings = {};
  //dishTypeSelectedItems = [];
  dishTypeDropdown = [];
  dropdownSettings = {};
  
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private modalService: NgbModal, private router: Router) {
    this.route.params.subscribe( data => {
      this.recipeId = data['id'];
    }); 
  }

  ngOnInit() {
    this.getDishTypeList();
    this.getRecipe(this.recipeId);
    this.getIngredientsList();
    

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

  getIngredientsList(){
    this.recipeService.getIngredientsList().subscribe(data => {
      this.ingredients = data;

      data.forEach(d => {
        this.IngredientDropdown.push({IngredientId: d.IngredientId, Name: d.Name});
      });

      for(let i = 0; i < this.ingredients.length; i++){
        this.typeaheadIngredients.push(this.ingredients[i].Name.toLowerCase());
      }
      console.log(this.IngredientDropdown);
    });
  }

  getDishTypeList(){
    this.recipeService.getDishTypeList().subscribe(data => {
      this.dishTypeDropdown = data;
    })
  }

  getRecipe(id: number){
    this.recipeService.getRecipe(id).subscribe(data => {
      this.curRecipe = data;
      this.curDirectionStep = this.curRecipe.Directions.length + 1;
      
      let dishTypes: DishType[] = this.curRecipe.DishTypes;

      /*
      if (dishTypes != null){
        dishTypes.forEach(d => {
          this.dishTypeSelectedItems.push({item_id: d.DishTypeId, item_text: d.Type});
        });
      }
      */
      
    });
  }

  newIngredient(content) {
    this.isEditing = false;
    this.curIngredient = {} as Ingredient;
    this.ModalRef = this.modalService.open(content, {windowClass: 'modaltest'});
  }

  newDirection(content) {
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
    this.ModalRef = this.modalService.open(content, {windowClass: 'modaltest'});
  }

  editDirection(content, index: number){
    this.isEditing = true;
    this.curDirection = this.curRecipe.Directions[index];
    this.ModalRef = this.modalService.open(content, {windowClass: 'modaltest'});
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
    this.loading = true;
    this.recipeService.editRecipe(this.curRecipe).subscribe(data => {
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
