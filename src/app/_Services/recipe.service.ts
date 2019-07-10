import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipeCard, Recipe } from '../classes/recipe';
import { Ingredient, RecipeIngredient } from '../classes/ingredient';
import { Measuremet } from '../classes/measurement';
import { Allergen } from '../classes/allergen';
import { Cuisine } from '../classes/cuisine';
import { PostStatus } from '../classes/postStatus';
import { environment } from 'src/environments/environment';
import { DishType } from '../classes/dishType';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`);
  
  constructor(private authService: AuthService, private http: HttpClient) { }
  
  getHomepageRecipes(){    
    return this.http.get<RecipeCard[]>(`${environment.APIURL}recipe/gethomepagerecipes`);
  }

  getIngredientsList(){    
    return this.http.get<Ingredient[]>(`${environment.APIURL}recipe/getingredientslist`);
  }

  getRecipeIngredient(id: number){    
    return this.http.get<RecipeIngredient>(`${environment.APIURL}recipe/getrecipeingredient?id=${id}`);
  }

  getRecipeList(page: number){    
    return this.http.get<RecipeCard[]>(`${environment.APIURL}recipe/getrecipelist?page=${page}`);
  }

  getRecipeCardList(){    
    return this.http.get<RecipeCard[]>(`${environment.APIURL}recipe/getrecipeCardlist`);
  }

  getRecipe(id: number){    
    return this.http.get<Recipe>(`${environment.APIURL}recipe/getrecipe?id=${id}`);
  }

  editIngredient(i: Ingredient){  
    return this.http.post<PostStatus>(`${environment.APIURL}recipe/editingredient`, {IngredientId: i.IngredientId, Name: i.Name, AllergenId: i.AllergenId, MeasurementId: i.MeasurementId}, { headers: this.headers});
  }

  editRecipe(r: Recipe){  
    return this.http.post<PostStatus>(`${environment.APIURL}recipe/editrecipe`, {RecipeId: r.RecipeId, Title: r.Title, Description: r.Description, MinutesReady: r.MinutesReady, CuisineId: 1, RecommendedServings: r.RecommendedServings, ImageReference: r.ImageReference, Ingredients: r.Ingredients, Directions: r.Directions, NutritionalFacts: r.NutritionalFacts, DishTypes: r.DishTypes}, { headers: this.headers});
  }

  newRecipe(r: Recipe){  
    return this.http.post<PostStatus>(`${environment.APIURL}recipe/newrecipe`, {Title: r.Title, Description: r.Description, MinutesReady: r.MinutesReady, CuisineId: 1, RecommendedServings: r.RecommendedServings, ImageReference: r.ImageReference, Ingredients: r.Ingredients, Directions: r.Directions, NutritionalFacts: r.NutritionalFacts, DishTypes: r.DishTypes}, { headers: this.headers});
  }

  newIngredient(i: Ingredient){    
    return this.http.post<PostStatus>(`${environment.APIURL}recipe/newingredient`, {Name: i.Name, AllergenId: i.AllergenId, MeasurementId: i.MeasurementId}, { headers: this.headers});
  }

  getMeasurementsList(){    
    return this.http.get<Measuremet[]>(`${environment.APIURL}recipe/getmeasurementslist`);
  }

  getAllergenList(){    
    return this.http.get<Allergen[]>(`${environment.APIURL}recipe/getallergenlist`);
  }

  getCuisineList(){    
    return this.http.get<Cuisine[]>(`${environment.APIURL}recipe/getcuisinelist`);
  }

  getDishTypeList(){    
    return this.http.get<DishType[]>(`${environment.APIURL}recipe/getdishtypes`);
  }
}
