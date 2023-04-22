import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '../../UI/ui.module';
import { BoardgameDetailDialogModule } from '../../dialogs/boardgameDetailsDialog/boardgameDetailDialogModule';
import { BrowsePageComponent } from './browsePageComponent';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'

@NgModule({
    declarations: [
        BrowsePageComponent
    ],
    imports: [
        CommonModule,
        UIModule,
        BoardgameDetailDialogModule,
        MatTableModule,
        MatPaginatorModule
    ]
})
export class BrowsePageModule { }
