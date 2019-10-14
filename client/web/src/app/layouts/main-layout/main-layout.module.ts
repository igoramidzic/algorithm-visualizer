import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAINLAYOUT_ROUTES } from './main-layout.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { SortingComponent } from './sorting/sorting.component';
import { PathfindingComponent } from './pathfinding/pathfinding.component';

@NgModule({
  declarations: [
    PathfindingComponent,
    SortingComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(MAINLAYOUT_ROUTES)
  ],
  exports: [
  ],
  providers: []
})
export class MainLayoutModule { }
