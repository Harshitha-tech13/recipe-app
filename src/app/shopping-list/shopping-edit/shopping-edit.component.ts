import { Component, ElementRef, OnInit, ViewChild , OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
//@ViewChild('nameInput') nameInputeRef: ElementRef;
//@ViewChild('amountInput') amountInputeRef: ElementRef;
@ViewChild('f') slForm: NgForm;
subscription : Subscription;
editMode = false;
editedItemIndex:number;
editItem:Ingredient;


  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription=this.slService.startedEditing
    .subscribe(
      (index:number) => {
        this.editedItemIndex=index;
        this.editMode = true;
        this.editItem =  this.slService.getIngredients(index);
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount

        })
      }
    );
  }
  onSubmit(form: NgForm){
    //const ingName =  this.nameInputeRef.nativeElement.value;
    //const ingAmount =  this.amountInputeRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name , value.amount);
    if(this.editMode){
      this.slService.updateIngredients(this.editedItemIndex,newIngredient);
    }else{
      this.slService.addIngredients(newIngredient);
    }
    this.editMode = false;
    form.reset();
    

  }
  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
    this.slService.deleteIngredients(this.editedItemIndex);
    this.onClear();
  }
  
  ngOnDestory(){
    this.subscription.unsubscribe();
   
  }

}
