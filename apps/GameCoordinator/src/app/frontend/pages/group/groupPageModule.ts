import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBoardGameToCollectionDialogModule } from '../../dialogs/addBoardGameToCollectionDialog/addBoardGameToCollectionDialogModule';
import { CreateGroupDialogModule } from '../../dialogs/createGroup/createGroupDialogModule';
import { GroupPageComponent } from './groupPageComponent';
import { AddGroupMembersDialogModule } from '../../dialogs/addGroupMembers/addGroupMembersModule';
import { UIModule } from '../../UI/ui.module';
import { GameOwnersPipe } from './pipes/game-owners-pipe.pipe';
import { AddGroupPostDialogModule } from '../../dialogs/addGroupPost/addGroupPostDialogModule';
import { CardComponent } from '@la-ui';

@NgModule({
  imports: [
    CommonModule,
    UIModule,
    AddBoardGameToCollectionDialogModule,
    CreateGroupDialogModule,
    AddGroupMembersDialogModule,
    AddGroupPostDialogModule,
    CardComponent
  ],
  declarations: [GroupPageComponent, GameOwnersPipe],
})
export class GroupPageModule {}
