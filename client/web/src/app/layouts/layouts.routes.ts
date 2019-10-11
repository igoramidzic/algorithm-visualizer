import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';

export const LAYOUTS_ROUTES: Routes = [

    {
        path: '',
        component: MainLayoutComponent,
        loadChildren: './main-layout/main-layout.module#MainLayoutModule'
    }
]
