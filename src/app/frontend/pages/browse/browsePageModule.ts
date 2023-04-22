import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '../../UI/ui.module';
import { BoardgameDetailDialogModule } from '../../dialogs/boardgameDetailsDialog/boardgameDetailDialogModule';
import { BrowsePageComponent } from './browsePageComponent';

@NgModule({
    declarations: [
        BrowsePageComponent
    ],
    imports: [
        CommonModule,
        UIModule,
        BoardgameDetailDialogModule,
    ]
})
export class BrowsePageModule { }
