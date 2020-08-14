import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendingMachineComponent } from './vending-machine.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VendingMachineComponent],
  exports: [VendingMachineComponent],
})
export class VendingMachineModule {}
