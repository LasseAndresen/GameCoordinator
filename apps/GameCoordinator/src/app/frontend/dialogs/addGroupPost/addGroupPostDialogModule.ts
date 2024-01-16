import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UIModule } from '../../UI/ui.module';
import { AddGroupPostDialogComponent } from './addGroupPostDialogComponent';
import { AddGroupPostDialog } from './addGroupPostDialog';
import { ButtonComponent, DialogModule } from '@la-ui';

@NgModule({
  imports: [CommonModule,
    UIModule,
    FormsModule,
    ButtonComponent,
    DialogModule
  ],
  providers: [AddGroupPostDialog],
  declarations: [AddGroupPostDialogComponent],
})
export class AddGroupPostDialogModule {}
