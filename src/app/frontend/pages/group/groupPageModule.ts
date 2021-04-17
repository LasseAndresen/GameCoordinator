import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './groupPageRouting';
import { AddBoardGameToCollectionDialogModule } from '../../dialogs/addBoardGameToCollectionDialog/addBoardGameToCollectionDialogModule';
import { CreateGroupDialogModule } from '../../dialogs/createGroup/createGroupDialogModule';
import { GroupPageComponent } from './groupPageComponent';
import { AddGroupMembersDialogModule } from '../../dialogs/addGroupMembers/addGroupMembersModule';
import { UIModule } from '../../UI/ui.module';

@NgModule({
    imports: [
        CommonModule,
        UIModule,
        routing,
        AddBoardGameToCollectionDialogModule,
        CreateGroupDialogModule,
        AddGroupMembersDialogModule
    ],
    declarations: [
        GroupPageComponent
    ]
})
export class GroupPageModule { }
