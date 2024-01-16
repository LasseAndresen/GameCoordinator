import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateGroupDialog } from './createGroupDialog';
import { CreateGroupDialogComponent } from './createGroupDialogComponent';
import { UIModule } from '../../UI/ui.module';
import { ButtonComponent, DialogModule } from '@la-ui';

@NgModule({
  imports: [CommonModule,
    UIModule,
    FormsModule,
    ButtonComponent,
    DialogModule
  ],
  providers: [CreateGroupDialog],
  declarations: [CreateGroupDialogComponent],
})
export class CreateGroupDialogModule {}
