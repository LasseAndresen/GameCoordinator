import { NgModule } from '@angular/core';
import { DialogComponent } from './dialogComponent';
import { DialogHandle } from './dialogHandle';

@NgModule({
  imports: [],
  declarations: [DialogComponent],
  providers: [DialogHandle],
  exports: [DialogComponent],
})
export class DialogModule {}
