import { Routes } from '@angular/router';
import { SortingComponent } from './sorting/sorting.component';
import { SearchingComponent } from './searching/searching.component';

export const MAINLAYOUT_ROUTES: Routes = [
  {
    path: 'sorting/:algorithm',
    component: SortingComponent
  },
  {
    path: 'searching/:algorithm',
    component: SearchingComponent
  },
  {
    path: '**',
    redirectTo: 'sorting/insertionsort'
  }
]