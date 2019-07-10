import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminIngredientsComponent } from './ingredients/ingredients.component';
import { AdminRecipesComponent } from './recipe/recipes.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeCreateComponent } from './recipe/recipe-create/recipe-create.component';

const routes: Routes = [
    {path: '', component: AdminComponent},
    {path: 'ingredientlist', component: AdminIngredientsComponent},
    {path: 'recipelist', component: AdminRecipesComponent},
    {path: 'recipeedit/:id', component: RecipeEditComponent},
    {path: 'recipecreate', component: RecipeCreateComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {  }