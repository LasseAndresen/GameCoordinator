import { NgModule } from '@angular/core';
import { AddBoardGameToCollectionDialog } from './addBoardGameToCollectionDialog';
import { AddBoardGameToCollectionDialogComponent } from './addBoardGameToCollectionDialogComponent';
import { CommonModule } from '@angular/common';
import { AddBoardGameToLibraryDialogModule } from '../addBoardGameToLibrary/addBoardGameToLibraryModule';
import { DialogModule } from '../../UI/dialogComponent/dialogModule';
import { UIModule } from '../../UI/ui.module';
import { BoardgameSearchComponent } from '../../components/boardgameSearch/boardgameSearchComponent';
import { ButtonComponent } from '@la-ui';

@NgModule({
  providers: [AddBoardGameToCollectionDialog],
  declarations: [AddBoardGameToCollectionDialogComponent],
  imports: [
    CommonModule,
    DialogModule,
    AddBoardGameToLibraryDialogModule,
    UIModule,
    BoardgameSearchComponent,
    ButtonComponent
  ],
})
export class AddBoardGameToCollectionDialogModule {}
