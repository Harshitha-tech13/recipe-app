import { Injectable } from "@angular/core";
import{ ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe-model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataStroageService: DataStorageService,private RecipeService:RecipeService){ }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.RecipeService.getRecipes();
        if(recipes.length == 0){
            return this.dataStroageService.fetchRecipes();
        }else{
            return recipes;
        }
        
    }
}