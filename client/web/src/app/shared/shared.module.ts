import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgPipesModule } from "ngx-pipes";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { MainErrorAlertComponent } from './components/alerts/main-error-alert/main-error-alert.component';
import { MainLoaderComponent } from './components/loaders/main-loader/main-loader.component';
import { MainNavbarComponent } from './components/navbars/main-navbar/main-navbar.component';
import { SortingMenuComponent } from './components/navbars/main-navbar/sorting-menu/sorting-menu.component';
import { SearchingMenuComponent } from './components/navbars/main-navbar/searching-menu/searching-menu.component';

@NgModule({
  declarations: [
    MainErrorAlertComponent,
    MainLoaderComponent,
    MainNavbarComponent,
    SortingMenuComponent,
    SearchingMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgPipesModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule,
    MainErrorAlertComponent,
    MainLoaderComponent,
    MainNavbarComponent,
    SortingMenuComponent
  ],
  providers: [],
  entryComponents: []
})
export class SharedModule { }
