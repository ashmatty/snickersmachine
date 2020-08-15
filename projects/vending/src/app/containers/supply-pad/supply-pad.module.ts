import { NgModule } from '@angular/core';

import { NumPadModule } from '../../components';

import { SupplyPadComponent } from './supply-pad.component';

@NgModule({
  imports: [NumPadModule],
  declarations: [SupplyPadComponent],
  exports: [SupplyPadComponent],
})
export class SupplyPadModule {}
