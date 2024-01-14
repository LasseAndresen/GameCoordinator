import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  providers: [],
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
})
export class UIModule {}
