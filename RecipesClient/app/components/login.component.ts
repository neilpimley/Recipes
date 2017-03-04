import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    template: `
        <div class="container">
            <form class="form-signin">
                <h2 class="form-signin-heading">Recipe Organiser</h2>
                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="text" class="form-control input-sm" #username placeholder="yours@example.com" required autofocus>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" class="form-control input-sm" #password placeholder="your password" required>
                <button type="submit" class="btn btn-primary" (click)="auth.login(username.value, password.value)">Login</button>
                <strong> - or - </strong><a (click)="auth.googleLogin()" class="google-login"><img src="images/sign-in-with-google.png" style="height:42px;"/></a>
            </form>
        </div> 
        `,
    styles: [
        '.form-signin { max-width:330px; padding:15px; margin: 50px auto 0;}',
        '.google-login {cursor: pointer;}',
        '.form-signin .form-signin-heading, .form-signin .checkbox { margin-bottom: 10px; }',
        '.form-signin .checkbox {font-weight: normal;}',
        '.form-signin .form-control { position: relative; height: auto; margin-bottom:5px; -webkit-box-sizing: border-box; -moz-box-sizing: border-box;box-sizing: border-box;}',
        '.form-signin .form-control:focus {z-index: 2;} ',
        '.form-signin input[type="email"] { margin-bottom: -1px; border-bottom-right-radius: 0; border-bottom-left-radius: 0;} ',
        '.form-signin input[type="password"] { margin-bottom: 10px; border-top-left-radius: 0; border-top-right-radius: 0;} '
    ]
})

export class LoginComponent {
    constructor(public auth: AuthService, private router: Router) {
        if (auth.authenticated) {
            this.router.navigate(['/recipes-list']);
        }            
    }
};