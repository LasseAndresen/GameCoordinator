import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './leftMenu/menuComponent';
import { TopBarComponent } from './topBar/topBarComponent';
import { MenuTreeComponent } from './leftMenu/menu-tree/menu-tree.component';
import { UIModule } from '../UI/ui.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        UIModule
    ],
    providers: [
    ],
    declarations: [
        MenuComponent,
        TopBarComponent,
        MenuTreeComponent,
    ],
    exports: [
      MenuComponent,
      TopBarComponent,
    ]
})
export class LayoutModule { }
