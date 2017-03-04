import { Component, Injectable, NgModule, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RecipesService } from '../services/recipes.service';
import { AuthService }      from '../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from "ng2-modal";
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications'

@Component({
    selector: 'recipes-list',
    template: `
        <div class="container page-container">
            <div class="row">
                <div class="col-md-12">
                    <h3>{{title}}</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <ng-table [config]="config" (tableChanged)="onChangeTable(config)" (cellClicked)="onCellClick($event)"
                              [rows]="rows" [columns]="columns"></ng-table>
                    <table class="table table-stripped">
                    <thead>
                        <tr>
                             <th>Name</th>
                            <th>Difficulty Level</th>
                            <th>Description</th>
                            <th>Preperation Time</th>
                            <th>Created Date</th>
                        </tr>
                    </thead>
                    <tbody>
                         <tr *ngFor="let recipe of recipes">
                            <td>{{ recipe.name}}</td>
                            <td>{{ recipe.diffLevel }}</td>
                            <td>{{ recipe.description}}</td>
                            <td>{{ recipe.prepTime }}</td>
                            <td>{{ recipe.createdDate }}</td>
                          </tr>
                    </tbody>
                    </table>
                </div>
                <div class="col-md-4">
                    <div class="row">
                        <table>
                         </table>
                    </div>
                    <div class="row">
                        <h3>Basket</h3>
                        <table>
                            <tr>
                                <td></td>
                            </tr>
                         </table>
                    </div>
                </div>
            </div>
        </div>
        <simple-notifications [options]="toastOptions"></simple-notifications>
        <modal #allocateSiteModal modalClass="modal-sm">
            <modal-header>
                <h3>Allocate worker</h3>
            </modal-header>
                <modal-content>
                    <button *ngFor="let site of sites; let i = index;"
                            class="btn btn-default btn-block btn-sm"
                            [style.backgroundColor]="site.bgColour"
                            [style.color]="site.fgColour"
                            (click)="addWork(site.id);allocateSiteModal.close()">
                        {{site.siteName}}
                    </button>
                </modal-content>
                <modal-footer>
                    <button class="btn btn-sm btn-danger btn-block"
                            (click)="removeWork();allocateSiteModal.close()">
                        Not working
                    </button>
                </modal-footer>
        </modal>
        `
})
export class RecipesListComponent {
    public title: string = 'Recipes'
    public rows: Array<any> = [];
    public columns: Array<any> = [
        { title: 'Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by name' } },
        { title: 'Description', name: 'Description' },
        { title: 'Prep. time', name: 'PrepTime', filtering: { filterString: '', placeholder: 'Filter by prep time' } },
        { title: 'Diff. Level', name: 'DiffLevel', filtering: { filterString: '', placeholder: 'Filter by diff. level' } },
        { title: 'Date', name: 'createdDate', filtering: { filterString: '', placeholder: 'Filter Date' } }
    ];
    public page: number = 1;
    public itemsPerPage: number = 10;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;

    public config: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '' },
        className: ['table-striped', 'table-bordered']
    };

    public recipes: any[] = [];
    public allocateSiteModal: any;
    public toastOptions = {
        position: ["bottom", "right"],
        timeOut: 2000,
        lastOnBottom: true
    };

    public loadingRecipes: boolean = false;

    constructor(private recipesService: RecipesService,
        private notificationsService: NotificationsService,
        public authService: AuthService) { }

    getRecipes() {
        this.loadingRecipes = true;
        this.recipesService.getRecipes()
            .subscribe(recipes => {
                this.recipes = recipes as any[];
                this.length = recipes.length;
                this.loadingRecipes = false;
            }, error => {
                this.notificationsService.error('Error', error, { timeOut: 0 });
            });
    };

    ngOnInit() {
        this.getRecipes();
        this.onChangeTable(this.config);
    }

    public changePage(page: any, data: Array<any> = this.recipes): Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }

    public changeSort(data: any, config: any): any {
        if (!config.sorting) {
            return data;
        }

        let columns = this.config.sorting.columns || [];
        let columnName: string = void 0;
        let sort: string = void 0;

        for (let i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }

        if (!columnName) {
            return data;
        }

        // simple sorting
        return data.sort((previous: any, current: any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }

    public changeFilter(data: any, config: any): any {
        let filteredData: Array<any> = data;
        this.columns.forEach((column: any) => {
            if (column.filtering) {
                filteredData = filteredData.filter((item: any) => {
                    return item[column.name].match(column.filtering.filterString);
                });
            }
        });

        if (!config.filtering) {
            return filteredData;
        }

        if (config.filtering.columnName) {
            return filteredData.filter((item: any) =>
                item[config.filtering.columnName].match(this.config.filtering.filterString));
        }

        let tempArray: Array<any> = [];
        filteredData.forEach((item: any) => {
            let flag = false;
            this.columns.forEach((column: any) => {
                if (item[column.name].toString().match(this.config.filtering.filterString)) {
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;

        return filteredData;
    }

    public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }

        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        this.recipesService.getRecipes()
            .subscribe(recipes => {
                this.recipes = recipes;
                this.length = this.recipes.length;
                let filteredData = this.changeFilter(this.recipes, this.config);
                let sortedData = this.changeSort(filteredData, this.config);
                this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
                this.length = sortedData.length;
            }, error => this.notificationsService.error('Error', 'Unexepected error: ' + error)
        );
  
    }

    public onCellClick(data: any): any {
        console.log(data);
    }

}