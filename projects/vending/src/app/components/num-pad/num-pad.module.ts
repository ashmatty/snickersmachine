import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NumPadComponent } from './num-pad.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NumPadComponent],
  exports: [NumPadComponent],
})
export class NumPadModule {}
