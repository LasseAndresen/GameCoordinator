import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateGroupDialog } from './createGroupDialog';
import { CreateGroupDialogComponent } from './createGroupDialogComponent';
import { UIModule } from '../../UI/ui.module';
import { DialogModule } from '../../UI/dialogComponent/dialogModule';

@NgModule({
  imports: [CommonModule, DialogModule, UIModule, FormsModule],
  providers: [CreateGroupDialog],
  declarations: [CreateGroupDialogComponent],
})
export class CreateGroupDialogModule {}
