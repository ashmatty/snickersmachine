import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShelfComponent } from './shelf.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ShelfComponent],
  exports: [ShelfComponent],
})
export class ShelfModule {}
