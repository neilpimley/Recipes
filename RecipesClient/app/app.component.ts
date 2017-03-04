import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CollapseDirective } from 'ng2-bootstrap'
import './rxjs-operators';

@Component({
    selector: 'my-app',
    providers: [AuthService],
    template: `
        <header id="top">
           <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
            <div class="container">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
			  <button type="button" class="navbar-toggle collapsed" (click)="isCollapsed = !isCollapsed">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			  </button>
				<img class="logo pull-left visible-xs" src="/images/logo_grey_services.png">
			</div>
            <div class="collapse navbar-collapse" [collapse]="isCollapsed">
                <img class="logo pull-left hidden-xs" src="/images/logo_grey_services.png" alt="Recipes">
                <form class="navbar-form navbar-right">
                    <button class="btn btn-primary bt-sm pull-right hidden-xs" (click)="auth.logout()" *ngIf="auth.authenticated()">Log Out</button>
                </form>                  
               <!-- <ul class="nav navbar-nav navbar-right" *ngIf="auth.authenticated()">
                    <li><a routerLink="/recipes-list" routerLinkActive="active">Recipes</a></li>
                    <li><a class="btn btn-primary bt-tiny" (click)="auth.logout()">Logout</a></li>
                </ul>-->
            </div>
		  </div>
		</nav>           
        </header>
        <router-outlet></router-outlet>
  `,
  styles: [
      'body { padding-top: 70px;}',
      '.logo { width: auto; height: 50px; margin: 5px; }',
      '.navbar-nav li a { font-family: sans-serif; font-size: 12pt; }',
      '.navbar-right { margin-top:10px; margin-right:20px; }',
      '.btn-logout {background-color:#000000;color: #ffffff;margin-top:10px; }'
  ]
})
export class AppComponent {
    public title = 'Recipes Organiser';
    public isCollapsed: boolean = true;

    constructor(public auth: AuthService) { }
      
}