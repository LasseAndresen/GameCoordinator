import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UIModule } from '../../UI/ui.module';
import { BoardgameDetailComponent } from '../../components/boardgameDetail/boardgameDetailComponent';
import { BoardgameDetailDialog } from './boardgameDetailDialog';
import { BoardgameDetailDialogComponent } from './boardgameDetailDialogComponent';
import { DialogModule } from '@la-ui';

@NgModule({
  imports: [CommonModule,
    UIModule,
    BoardgameDetailComponent,
    DialogModule
  ],
  providers: [BoardgameDetailDialog],
  declarations: [BoardgameDetailDialogComponent],
})
export class BoardgameDetailDialogModule {}
