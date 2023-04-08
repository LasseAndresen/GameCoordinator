import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBoardGameToCollectionDialogModule } from '../../dialogs/addBoardGameToCollectionDialog/addBoardGameToCollectionDialogModule';
import { CreateGroupDialogModule } from '../../dialogs/createGroup/createGroupDialogModule';
import { HomePageComponent } from './homePageComponent';
import { UIModule } from '../../UI/ui.module';
import { BoardgameDetailDialogModule } from '../../dialogs/boardgameDetailsDialog/boardgameDetailDialogModule';

@NgModule({
    imports: [
        CommonModule,
        AddBoardGameToCollectionDialogModule,
        CreateGroupDialogModule,
        UIModule,
        BoardgameDetailDialogModule
    ],
    declarations: [
        HomePageComponent
    ]
})
export class HomePageModule { }
