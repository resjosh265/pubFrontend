export interface Ingredient {
    IngredientId: number,
    MeasurementId?: number,
    AllergenId?: number,
    AllergenCategory?: string,
    MeasurementType?: string,
    Name: string
}

export interface RecipeIngredient {
    RecipeIngredientId?: number,
    IngredientId: number,
    MeasurementId?: number,
    AllergenId?: number,
    Measurement?: number,
    AllergenCategory?: string,
    MiscInstructions?: string,
    MeasurementType?: string,
    Name: string
}
