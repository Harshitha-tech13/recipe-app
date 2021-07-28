import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesDetailsComponent } from "./recipes-details/recipes-details.component";
import { RecipesItemsComponent } from "./recipes-list/recipes-items/recipes-items.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesStartComponent } from "./recipes-start/recipes-start.component";
import { RecipesComponent } from "./recipes.component";


@NgModule({
    declarations:[
        RecipesComponent,
        RecipesListComponent,
        RecipesDetailsComponent,
        RecipesItemsComponent,
        RecipesStartComponent,
        RecipeEditComponent,
    ],
    imports:[

        RouterModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ],

})
export class RecipesModule{

}