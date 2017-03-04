import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate  } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';

import { LoginComponent } from './components/login.component';
import { RecipesListComponent } from './components/recipes-list.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'recipes-list',
        component: RecipesListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'recipes-list/:id',
        component: RecipesListComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [RecipesListComponent];
