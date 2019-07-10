import { Component, OnInit, ViewChildren, QueryList, Directive, Input, Output, EventEmitter } from '@angular/core';
import { RecipeService } from 'src/app/_Services/recipe.service';
import { Ingredient } from 'src/app/classes/ingredient';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Measuremet } from 'src/app/classes/measurement';
import { Allergen } from 'src/app/classes/allergen';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

interface Country {
  id: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class AdminIngredientsComponent implements OnInit {

  _ingredients: Ingredient[];
  ingredients: Ingredient[];
  curIngredient: Ingredient;
  measurements: Measuremet[];
  allergens: Allergen[];
  ingredientForm: FormGroup;
  private ModalRef;

  closeResult: string;
  modalTitle: string;
  isEditing: boolean;
  submitted: boolean;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private recipeService: RecipeService, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getIngredientsList();
    this.getMeasurementsList();
    this.getAllergenList();
    this.setupIngredientForm();
  }

  setupIngredientForm(){
    this.ingredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      measurement: [1, Validators.required],
      allergen: [1, Validators.required]
    });
  }

  get f(){ return this.ingredientForm.controls;}

  getIngredientsList(){
    this.recipeService.getIngredientsList().subscribe(data => {
      this._ingredients = data;
      this.ingredients = this._ingredients;
    })
  }

  getMeasurementsList(){
    this.recipeService.getMeasurementsList().subscribe(data => {
      this.measurements = data;
    })
  }

  getAllergenList(){
    this.recipeService.getAllergenList().subscribe(data => {
      this.allergens = data;
    })
  }

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting ingredients
    if (direction === '') {
      this.ingredients = this._ingredients;
    } else {
      this.ingredients = [...this._ingredients].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  open(content, i: Ingredient, isEdit: boolean) {
    this.isEditing = isEdit;
    this.curIngredient = i;
    this.ingredientForm.controls['name'].setValue(i.Name);
    this.ingredientForm.controls['measurement'].setValue(i.MeasurementId);
    this.ingredientForm.controls['allergen'].setValue(i.AllergenId);

    console.log(this.ingredientForm.value);
    if (isEdit == true){
      this.modalTitle = 'Edit Ingredient';
    }else{
      this.modalTitle = 'Add Ingredient';
    }

    this.ModalRef = this.modalService.open(content, {windowClass: 'modaltest'});
  }

  
  onSubmit(){
    this.submitted = true;
    if (this.ingredientForm.invalid){
      return;
    }

    this.curIngredient.Name = this.ingredientForm.value.name;
    this.curIngredient.MeasurementId = this.ingredientForm.value.measurement;
    this.curIngredient.AllergenId = this.ingredientForm.value.allergen;
    console.log(this.curIngredient);
    if (this.isEditing){
      this.editIngredient();
    }else{
      this.addIngredient();
    }
  }

  editIngredient(){
    this.recipeService.editIngredient(this.curIngredient).subscribe(data =>{
      if (data.Status.toLowerCase() == "success"){
        this.ModalRef.close();
        this.getIngredientsList();
      }
    });
  }

  addIngredient(){
    this.recipeService.newIngredient(this.curIngredient).subscribe(data =>{
      if (data.Status.toLowerCase() == "success"){
        this.ModalRef.close();
        this.getIngredientsList();
      }
    });
  }
}
