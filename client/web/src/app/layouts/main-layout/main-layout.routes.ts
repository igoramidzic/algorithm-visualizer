import { Routes } from '@angular/router';
import { PathfindingComponent } from './pathfinding/pathfinding.component';

export const MAINLAYOUT_ROUTES: Routes = [
  // {
  //   path: 'sorting/:algorithm',
  //   component: SortingComponent
  // },
  {
    path: 'pathfinding/:algorithm',
    component: PathfindingComponent
  },
  {
    path: '**',
    redirectTo: 'pathfinding/bfs'
  }
]