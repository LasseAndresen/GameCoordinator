import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateGroupDialog } from './createGroupDialog';
import { CreateGroupDialogComponent } from './createGroupDialogComponent';
import { UIModule } from '../../UI/ui.module';
import { DialogModule } from '../../UI/dialogComponent/dialogModule';
import { ButtonComponent } from '@la-ui';

@NgModule({
  imports: [CommonModule, DialogModule, UIModule, FormsModule, ButtonComponent],
  providers: [CreateGroupDialog],
  declarations: [CreateGroupDialogComponent],
})
export class CreateGroupDialogModule {}
