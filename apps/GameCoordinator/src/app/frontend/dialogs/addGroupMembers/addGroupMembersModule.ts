import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddGroupMembersDialogComponent } from './addGroupMembersComponent';
import { AddGroupMembersDialog } from './addGroupMembersDialog';
import { UIModule } from '../../UI/ui.module';
import { DialogModule } from '../../UI/dialogComponent/dialogModule';

@NgModule({
  imports: [CommonModule, DialogModule, UIModule, FormsModule],
  providers: [AddGroupMembersDialog],
  declarations: [AddGroupMembersDialogComponent],
})
export class AddGroupMembersDialogModule {}
