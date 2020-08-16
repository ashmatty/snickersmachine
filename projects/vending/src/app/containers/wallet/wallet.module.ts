import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoinModule } from '../../components';

import { WalletComponent } from './wallet.component';

@NgModule({
  imports: [CoinModule, CommonModule],
  declarations: [WalletComponent],
  exports: [WalletComponent],
})
export class WalletModule {}
