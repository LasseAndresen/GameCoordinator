import { NgModule } from '@angular/core';
import { AddBoardGameToCollectionDialog } from './addBoardGameToCollectionDialog';
import { AddBoardGameToCollectionDialogComponent } from './addBoardGameToCollectionDialogComponent';
import { CommonModule } from '@angular/common';
import { AddBoardGameToLibraryDialogModule } from '../addBoardGameToLibrary/addBoardGameToLibraryModule';
import { UIModule } from '../../UI/ui.module';
import { BoardgameSearchComponent } from '../../components/boardgameSearch/boardgameSearchComponent';
import { ButtonComponent, DialogModule } from '@la-ui';

@NgModule({
  providers: [AddBoardGameToCollectionDialog],
  declarations: [AddBoardGameToCollectionDialogComponent],
  imports: [
    CommonModule,
    AddBoardGameToLibraryDialogModule,
    UIModule,
    BoardgameSearchComponent,
    ButtonComponent,
    DialogModule
  ],
})
export class AddBoardGameToCollectionDialogModule {}
