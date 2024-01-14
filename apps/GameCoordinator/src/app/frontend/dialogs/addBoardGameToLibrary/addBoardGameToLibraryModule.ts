import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBoardGameToLibraryDialog } from './addBoardGameToLibraryDialog';
import { AddBoardGameToLibraryDialogComponent } from './addBoardGameToLibraryDialogComponent';
import { FormsModule } from '@angular/forms';
import { UIModule } from '../../UI/ui.module';
import { DialogModule } from '../../UI/dialogComponent/dialogModule';
import { ButtonComponent } from '@la-ui';

@NgModule({
  imports: [CommonModule, DialogModule, UIModule, FormsModule, ButtonComponent],
  providers: [AddBoardGameToLibraryDialog],
  declarations: [AddBoardGameToLibraryDialogComponent],
})
export class AddBoardGameToLibraryDialogModule {}
