import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: './layouts/layouts.module#LayoutsModule'
  }
]
