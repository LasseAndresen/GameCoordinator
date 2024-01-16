import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddGroupMembersDialogComponent } from './addGroupMembersComponent';
import { AddGroupMembersDialog } from './addGroupMembersDialog';
import { UIModule } from '../../UI/ui.module';
import { ButtonComponent, DialogModule } from '@la-ui';

@NgModule({
  imports: [CommonModule,
    UIModule,
    FormsModule,
    ButtonComponent,
    DialogModule
  ],
  providers: [AddGroupMembersDialog],
  declarations: [AddGroupMembersDialogComponent],
})
export class AddGroupMembersDialogModule {}
