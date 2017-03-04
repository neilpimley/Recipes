import { Component, NgModule, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RecipesService } from '../services/recipes.service';
import { AuthService }      from '../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'recipe-detail',
    template: `
        <div class="row">
          <div class="col-md-12">
            <div class="thumbnail">
              <img src="{{recipe?.photoUrl}}" alt="...">
              <div class="caption">
                <h5>{{recipe?.name}}</h5>
                <p>{{recipe?.description}}</p>
                <h4>Ingredients</h4>
                <ul>
                 <li *ngFor="let ingredient of recipe?.ingredients">
                        {{ ingredient.description }}
                      </li>
                </ul>
                <h4>Cooking steps</h4>
                <ol>
                 <li *ngFor="let step of recipe?.steps">
                        {{ step.description }}
                      </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        `
})
export class RecipeDetailComponent {
    @Input('RecipeId') recipeId: number;
    @Output() messageOut = new EventEmitter();
    private recipe: any;
    constructor(private recipesService: RecipesService) { }

    ngOnChanges(changes: any) {
        console.log('recipeId:' + this.recipeId);
        this.recipesService.getRecipe(this.recipeId)
            .subscribe(recipe => {
                this.recipe = recipe;
            }, error => this.messageOut.emit(error)
            );
    }
}