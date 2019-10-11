import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LAYOUTS_ROUTES } from './layouts.routes';

@NgModule({
    declarations: [
        MainLayoutComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(LAYOUTS_ROUTES)
    ],
    exports: [
    ],
    providers: []
})
export class LayoutsModule { }
