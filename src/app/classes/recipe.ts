import { Time } from '@angular/common';
import { Ingredient, RecipeIngredient } from './ingredient';
import { Directions } from './Direction';
import { NutritionalFact } from './NutritionalFact';
import { DishType } from './dishType';

export class RecipeCard {
    public RecipeId: number;
    public Title: string;
    public Description: string;
    public StarRating: number;
    public Reviews: number;
    public MinutesReady: number;
    public CuisineId: number;
    public RecommendedServings: number;
    public ImageReference: string;
    public CreateDate: Time;
    public LastModified: Time;
}

export interface Recipe {
    RecipeId?: number;
    Title: string;
    Description: string;
    StarRating?: number;
    Reviews?: number;
    MinutesReady: number;
    CuisineId?: number;
    RecommendedServings: number;
    ImageReference?: string;
    CreateDate?: Time;
    LastModified?: Time;
    Ingredients: RecipeIngredient[];
    Directions: Directions[];
    NutritionalFacts: NutritionalFact[];
    DishTypes?: DishType[];
}
