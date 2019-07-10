import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserHubComponent } from './userHub.component';

const routes: Routes = [
    {path: '', component: UserHubComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {  }