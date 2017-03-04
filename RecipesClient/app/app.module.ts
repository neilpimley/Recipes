import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ng2-modal';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { SimpleNotificationsModule, NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications'

import './rxjs-operators';
import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';

import { RecipesService } from './services/recipes.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthProvider } from './services/auth.provider';

import { LoginComponent } from './components/login.component';
import { RecipesListComponent } from './components/recipes-list.component';
import { RecipeDetailComponent } from "./components/recipe-detail.component";

import { CollapseModule } from 'ng2-bootstrap';

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      HttpModule,
      SimpleNotificationsModule,
      ModalModule,
      Ng2BootstrapModule,
      Ng2TableModule,
      CollapseModule
  ],
  declarations: [
      AppComponent,
      routedComponents,
      LoginComponent,
      RecipesListComponent,
      RecipeDetailComponent
  ],
  providers: [
      RecipesService,
      NotificationsService,
      AuthService,
      AuthGuard,
      AuthProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


