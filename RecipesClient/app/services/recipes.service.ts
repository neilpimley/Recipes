﻿import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RecipesService {
    private baseref: string = 'http://localhost:'
    private port: string = '62101'; 
    //private baseref: string = ''
    //private port: string = ''; 
    private recipesUrl: string = this.baseref + this.port +'/Api/Recipes';

    constructor(private authHttp: AuthHttp) { }

    getRecipes(): Observable<any[]>{
        return this.authHttp.get(this.recipesUrl).map(this.extractData)
            .catch(this.handleError);
    }

    getRecipe(id: number): Observable<any[]> {
        return this.authHttp.get(this.recipesUrl + '/' + id).map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}