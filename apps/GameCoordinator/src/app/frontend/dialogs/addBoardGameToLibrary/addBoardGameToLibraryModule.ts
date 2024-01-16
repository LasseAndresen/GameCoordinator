import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBoardGameToLibraryDialog } from './addBoardGameToLibraryDialog';
import { AddBoardGameToLibraryDialogComponent } from './addBoardGameToLibraryDialogComponent';
import { FormsModule } from '@angular/forms';
import { UIModule } from '../../UI/ui.module';
import { ButtonComponent, DialogModule } from '@la-ui';

@NgModule({
  imports: [CommonModule,
    UIModule,
    FormsModule,
    ButtonComponent,
    DialogModule
  ],
  providers: [AddBoardGameToLibraryDialog],
  declarations: [AddBoardGameToLibraryDialogComponent],
})
export class AddBoardGameToLibraryDialogModule {}
