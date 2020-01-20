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
import { PathfindingMenuComponent } from './components/navbars/main-navbar/pathfinding-menu/pathginding-menu.component';
import { PathfindingNavbarComponent } from './components/navbars/pathfinding-navbar/pathfinding-navbar.component';
import { MainGridComponent } from './components/pathfinding/main-grid/main-grid.component';
import { GridNodeComponent } from './components/pathfinding/grid-node/grid-node.component';
import { VisualizeSpeedSettingComponent } from './components/settings/visualize-speed-setting/visualize-speed-setting.component';

@NgModule({
  declarations: [
    MainErrorAlertComponent,
    MainLoaderComponent,
    MainNavbarComponent,
    SortingMenuComponent,
    PathfindingMenuComponent,
    PathfindingNavbarComponent,
    MainGridComponent,
    GridNodeComponent,
    VisualizeSpeedSettingComponent
  ],
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
    SortingMenuComponent,
    PathfindingMenuComponent,
    PathfindingNavbarComponent,
    MainGridComponent,
    GridNodeComponent
  ],
  providers: [],
  entryComponents: []
})
export class SharedModule { }
