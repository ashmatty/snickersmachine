import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArmModule } from './arm';
import { ShelfModule } from './shelf';

import { VendingMachineComponent } from './vending-machine.component';

@NgModule({
  imports: [ArmModule, CommonModule, ShelfModule],
  declarations: [VendingMachineComponent],
  exports: [VendingMachineComponent],
})
export class VendingMachineModule {}
