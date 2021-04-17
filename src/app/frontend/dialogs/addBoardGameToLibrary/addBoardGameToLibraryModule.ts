import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddBoardGameToLibraryDialog } from "./addBoardGameToLibraryDialog";
import { AddBoardGameToLibraryDialogComponent } from "./addBoardGameToLibraryDialogComponent";
import { FormsModule } from "@angular/forms";
import { UIModule } from "../../UI/ui.module";
import { DialogModule } from "../../UI/dialogComponent/dialogModule";

@NgModule({
    imports: [
        CommonModule,
        DialogModule,
        UIModule,
        FormsModule
    ],
    providers: [AddBoardGameToLibraryDialog],
    declarations: [
        AddBoardGameToLibraryDialogComponent
    ],
    entryComponents: [AddBoardGameToLibraryDialogComponent]
})
export class AddBoardGameToLibraryDialogModule { }
