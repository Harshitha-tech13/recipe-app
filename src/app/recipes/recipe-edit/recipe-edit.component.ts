import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode=false;
  recipeForm: FormGroup;

  constructor(private route:ActivatedRoute,
    private router:Router,private recipeservices: RecipeService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id= +params['id'];
        this.editMode = params['id'] != null;
        this.inItForm();


      }
    );
  }
  onSubmit(){
  if(this.editMode){
    this.recipeservices.updatedRecipe(this.id,this.recipeForm.value);
  }else{
    this.recipeservices.addRecipe(this.recipeForm.value);
  }
  this.onCancel();

}
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  
  onAddIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount':new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

 private inItForm(){
   let recipeName = '';
   let recipeDescription='';
   let recipeImagePath='';
   let recipeIngredients= new FormArray([]);
   if(this.editMode){
     const recipe = this.recipeservices.getRecipe(this.id);
     recipeName = recipe.name;
     recipeImagePath =  recipe.imagePath;
     recipeDescription = recipe.description;
     if(recipe['ingredients']){
       for(let ingredient of recipe.ingredients){
       recipeIngredients.push(
         new FormGroup({
           'name': new FormControl(ingredient.name, Validators.required),
           'amount': new FormControl(ingredient.amount,[
             Validators.required,
             Validators.pattern(/^[1-9]+[0-9]*$/)
           ])

         })
       );
      }
     }
   }
   this.recipeForm =  new FormGroup(
     {
       'name': new FormControl(recipeName, Validators.required),
       'imagePath': new FormControl(recipeImagePath,Validators.required),
       'description': new FormControl(recipeDescription,Validators.required),
       'ingredients': recipeIngredients
     }
   );
   

 }
 get controls() { // a getter!
  return (<FormArray>this.recipeForm.get('ingredients')).controls;
}
}
