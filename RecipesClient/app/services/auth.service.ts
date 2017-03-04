import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router }          from '@angular/router';
import { myConfig }        from '../config/auth.config';

// Avoid name not found warnings
declare var Auth0: any;

@Injectable()
export class AuthService {
    // Configure Auth0
    
    auth0 = new Auth0({
        domain: myConfig.domain,
        clientID: myConfig.clientID,
        callbackOnLocationHash: true,
        callbackURL: myConfig.callbackURL,
    }); 

    userProfile: Object;

    constructor(private router: Router) {
        var result = this.auth0.parseHash(window.location.hash);

        // Set userProfile attribute of already saved profile
        this.userProfile = JSON.parse(localStorage.getItem('profile'));

        if (result && result.idToken) {
            localStorage.setItem('id_token', result.idToken);

            // Fetch profile information
            this.auth0.getProfile(result.idToken, (error: any, profile:any) => {
                if (error) {
                    // Handle error
                    alert(error);
                    return;
                }

                localStorage.setItem('profile', JSON.stringify(profile));
                this.userProfile = profile;
            });

            this.router.navigate(['/recipes-list']);
        } else if (result && result.error) {
            alert('error: ' + result.error);
        }
    }

    public login(username:any, password:any) {
        this.auth0.login({
            connection: 'Username-Password-Authentication',
            responseType: 'token',
            email: username,
            password: password,
        }, function (err: any) {
            if (err) alert("something went wrong: " + err.message);
            this.router.navigate(['/recipes-list']);
        });
    };

    public googleLogin() {
        this.auth0.login({
            connection: 'google-oauth2'
        }, function (err: any) {
            if (err) alert("something went wrong: " + err.message);
            this.router.navigate(['/recipes-list']);
        });
    };

    public authenticated() {
        // Check if there's an unexpired JWT
        // It searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    };

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile = undefined;
        this.router.navigate(['/login']);
    };

}