import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms";
import { UIModule } from "../../UI/ui.module";
import { DialogModule } from "../../UI/dialogComponent/dialogModule";
import { AddGroupPostDialogComponent } from "./addGroupPostDialogComponent";
import { AddGroupPostDialog } from "./addGroupPostDialog";

@NgModule({
    imports: [
        CommonModule,
        DialogModule,
        UIModule,
        FormsModule
    ],
    providers: [AddGroupPostDialog],
    declarations: [
      AddGroupPostDialogComponent
    ],
    entryComponents: [AddGroupPostDialogComponent]
})
export class AddGroupPostDialogModule { }
