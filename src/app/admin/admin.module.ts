import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminIngredientsComponent, NgbdSortableHeader } from './ingredients/ingredients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRecipesComponent, NgbdSortableHeaderRecipe } from './recipe/recipes.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeCreateComponent } from './recipe/recipe-create/recipe-create.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';


@NgModule({
  declarations: [
    AdminComponent,
    AdminIngredientsComponent,
    AdminRecipesComponent,
    NgbdSortableHeader,
    NgbdSortableHeaderRecipe,
    RecipeEditComponent,
    RecipeCreateComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule
  ]
})
export class AdminModule { }
