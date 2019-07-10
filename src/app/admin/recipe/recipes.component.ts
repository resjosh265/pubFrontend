import { Component, OnInit, ViewChildren, QueryList, Directive, Input, Output, EventEmitter } from '@angular/core';
import { RecipeService } from 'src/app/_Services/recipe.service';
import { Ingredient } from 'src/app/classes/ingredient';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Measuremet } from 'src/app/classes/measurement';
import { Allergen } from 'src/app/classes/allergen';
import { Recipe, RecipeCard } from 'src/app/classes/recipe';

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
export class NgbdSortableHeaderRecipe {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-adminrecipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class AdminRecipesComponent implements OnInit {

  _recipes: RecipeCard[];
  recipes: RecipeCard[];
  curRecipe: Recipe;
  private ModalRef;

  closeResult: string;
  modalTitle: string;
  isEditing: boolean;
  isMobile: boolean;

  @ViewChildren(NgbdSortableHeaderRecipe) headers: QueryList<NgbdSortableHeaderRecipe>;

  constructor(private recipeService: RecipeService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getRecipeList();
    this.isMobile = this.getMobile();
  }

  getMobile(): boolean{
    if (window.innerWidth < 880){
      return true;
    }
  }

  getRecipeList(){
    this.recipeService.getRecipeList(-1).subscribe(data => {
      this._recipes = data;
      this.recipes = this._recipes;
    });
  }

  getRecipe(id: number){
    this.recipeService.getRecipe(id).subscribe(data => {
      console.log(data);
    });
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
      this.recipes = this._recipes;
    } else {
      this.recipes = [...this._recipes].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  open(content, id: number, isEdit: boolean) {
    this.isEditing = isEdit;

    if (!isEdit){
      this.curRecipe = {} as Recipe;
      this.modalTitle = 'Add New Recipe';
      this.ModalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'recipeModal'});
      return;
    }else{
      this.recipeService.getRecipe(id).subscribe(data => {
        this.curRecipe = data;
  
        console.log(this.curRecipe);
        this.modalTitle = 'Edit ' + this.curRecipe.Title;
  
        this.ModalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'recipeModal'});
      });
    }
  }

  openIngredient(content) {
    this.ModalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
}
