import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient} from '../shared/ingredient.model';

export class ShoppingListService {
    ingredientsChnaged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
   private ingredients: Ingredient[] = [
        new Ingredient( "Apples" , 10),
        new Ingredient( "Tomatos", 5)
      ];
      getIngredients(index:number){
        return this.ingredients[index];
      }
   
      getIngredient(){
         return this.ingredients.slice();
      }
      addIngredients(ingredients:Ingredient){
        this.ingredients.push(ingredients);
        this.ingredientsChnaged.next(this.ingredients.slice())

      }
      addIngredient(ingredient : Ingredient[]){

        this.ingredients.push(...ingredient);
        this.ingredientsChnaged.next(this.ingredients.slice());
      }
      updateIngredients(index:number, newIngredient: Ingredient ){
        this.ingredients[index]=newIngredient;
        this.ingredientsChnaged.next(this.ingredients.slice());

      }
      deleteIngredients(index:number){
        this.ingredients.splice(index,1);
        this.ingredientsChnaged.next(this.ingredients.slice());
      }
}