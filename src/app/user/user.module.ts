import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHubComponent } from './userHub.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserHubComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
