import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoinModule } from '../../components';

import { BankComponent } from './bank.component';

@NgModule({
  imports: [CoinModule, CommonModule],
  declarations: [BankComponent],
  exports: [BankComponent],
})
export class BankModule {}
