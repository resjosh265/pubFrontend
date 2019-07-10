import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { CallComponent } from './call/call.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageRecipesComponent } from './home/homepagerecipes/homepagerecipes.component';
import { FooterComponent } from './footer/footer.component';
import { RecipeListComponent } from './reciperepo/recipe-list/recipe-list.component';
import { RecipeSearchComponent } from './reciperepo/recipe-search/recipe-search.component';
import { AuthService } from './_Services/auth.service';
import { RecipepageComponent } from './reciperepo/recipepage/recipepage.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CallbackComponent,
    ProfileComponent,
    CallComponent,
    HomeComponent,
    CarouselComponent,
    HomepageRecipesComponent,
    FooterComponent,
    RecipeListComponent,
    RecipeSearchComponent,
    RecipepageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FlexLayoutModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
