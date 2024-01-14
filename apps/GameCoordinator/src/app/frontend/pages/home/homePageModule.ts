import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBoardGameToCollectionDialogModule } from '../../dialogs/addBoardGameToCollectionDialog/addBoardGameToCollectionDialogModule';
import { CreateGroupDialogModule } from '../../dialogs/createGroup/createGroupDialogModule';
import { HomePageComponent } from './homePageComponent';
import { UIModule } from '../../UI/ui.module';
import { BoardgameDetailDialogModule } from '../../dialogs/boardgameDetailsDialog/boardgameDetailDialogModule';
import { CreateEventComponent } from '../../components/createEvent/createEventComponent';
import { CardComponent, ButtonComponent } from '@la-ui';


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    AddBoardGameToCollectionDialogModule,
    CreateGroupDialogModule,
    UIModule,
    BoardgameDetailDialogModule,
    CreateEventComponent,
    CardComponent,
    ButtonComponent
  ],
})
export class HomePageModule {}
