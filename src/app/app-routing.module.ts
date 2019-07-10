import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { RecipeListComponent } from './reciperepo/recipe-list/recipe-list.component';
import { RecipepageComponent } from './reciperepo/recipepage/recipepage.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'callback', component: CallbackComponent},
    {path: 'home', component: HomeComponent},
    {path: 'recipes', component: RecipeListComponent},
    {path: 'recipe/:id', component: RecipepageComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
    {path: 'hub', loadChildren: './user/user.module#UserModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{ useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {  }