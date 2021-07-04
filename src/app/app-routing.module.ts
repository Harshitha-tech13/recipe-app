import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesDetailsComponent } from "./recipes/recipes-details/recipes-details.component";
import { RecipeResolverService } from "./recipes/recipes-resolver.service";
import { RecipesStartComponent } from "./recipes/recipes-start/recipes-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";



const appRoutes:Routes = [
    {path:'', redirectTo: '/recipes', pathMatch: 'full'},
    {path:'recipes', component: RecipesComponent, children: [
        {path:'',component:RecipesStartComponent},
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipesDetailsComponent, resolve:[RecipeResolverService]},
        {path:':id/edit',component:RecipeEditComponent,resolve:[RecipeResolverService]}
    ]},
    {path: 'shopping-list', component: ShoppingListComponent},
];
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]

})
export class AppRoutingModule{


}