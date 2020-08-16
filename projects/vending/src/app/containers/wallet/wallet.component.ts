import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as bankActions from '../../store/actions/bank.action';
import * as reducers from '../../store/reducers';

@Component({
  selector: 'sm-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent {
  constructor(private _store: Store<reducers.VendingMachineState>) {}

  depositCoin(event) {
    this._store.dispatch(new bankActions.Deposit(+event));
  }
}
