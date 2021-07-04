import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Recipe } from '../recipe-model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  recipes: Recipe[];
  subscription: Subscription;
    constructor(private recipeServices : RecipeService,
      private router: Router,
      private route:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.subscription = this.recipeServices.recipeChanges.subscribe(
      (recipes:Recipe[])=>{
        this.recipes =recipes;

      }
    );
    this.recipes = this.recipeServices.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'] , {relativeTo: this.route});

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
