import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './leftMenu/menuComponent';
import { TopBarComponent } from './topBar/topBarComponent';
import { MenuTreeComponent } from './leftMenu/menu-tree/menu-tree.component';
import { UIModule } from '../UI/ui.module';
import { DialogModule } from '../UI/dialogComponent/dialogModule';
import { BoardgameDetailComponent } from '../components/boardgameDetail/boardgameDetailComponent';
import { BoardgameDetailDialog } from '../components/boardgameDetail/boardgameDetailDialog';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        UIModule,
        DialogModule
    ],
    providers: [
      BoardgameDetailDialog
    ],
    declarations: [
        MenuComponent,
        TopBarComponent,
        MenuTreeComponent,
        BoardgameDetailComponent
    ],
    exports: [
      MenuComponent,
      TopBarComponent,
    ]
})
export class LayoutModule { }
