import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '../../UI/dialogComponent/dialogModule';
import { UIModule } from '../../UI/ui.module';
import { BoardgameDetailComponent } from '../../components/boardgameDetail/boardgameDetailComponent';
import { BoardgameDetailDialog } from './boardgameDetailDialog';
import { BoardgameDetailDialogComponent } from './boardgameDetailDialogComponent';

@NgModule({
  imports: [CommonModule, DialogModule, UIModule, BoardgameDetailComponent],
  providers: [BoardgameDetailDialog],
  declarations: [BoardgameDetailDialogComponent],
})
export class BoardgameDetailDialogModule {}
