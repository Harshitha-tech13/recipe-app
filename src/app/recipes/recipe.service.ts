import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe-model';

@Injectable()
export class RecipeService{
    
recipeChanges = new Subject<Recipe[]>();

 //   private recipes: Recipe[] =[
    //    new Recipe('Mothagam',
    //     'I am tasty Mothagam cook me eat me ',
     //   'https://upload.wikimedia.org/wikipedia/commons/a/a1/Kollukattai-Vinayagar-Chathurthi-Recipes.jpg',
      //  [
      //      new Ingredient('Riceflour', 1),
       //     new Ingredient('suger', 1)
       // ]
       //  ),
        //new Recipe('Another Test Recipe', 'I am just a test recipe',
        //'https://upload.wikimedia.org/wikipedia/commons/a/a1/Kollukattai-Vinayagar-Chathurthi-Recipes.jpg',
       // [
         //   new Ingredient('Riceflour', 1),
         //   new Ingredient( 'suger',1)
       // ])
   // ];
   private recipes : Recipe[] = [];

    constructor(private slService : ShoppingListService){ }
    setRecipes(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipeChanges.next(this.recipes.slice());
    }
   getRecipes() {
       return this.recipes.slice();
   }
   
   getRecipe(index: number){
    return this.recipes[index];
}
   addIngredientsToShoppingList(ingredients : Ingredient[]){
       this.slService.addIngredient(ingredients);

   }
   addRecipe(recipe:Recipe){
       this.recipes.push(recipe);
       this.recipeChanges.next(this.recipes.slice());

   }
   updatedRecipe(index:number,newRecipe:Recipe){
       this.recipes[index]=newRecipe;
       this.recipeChanges.next(this.recipes.slice());


   }
   deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanges.next(this.recipes.slice());
  }
   
}