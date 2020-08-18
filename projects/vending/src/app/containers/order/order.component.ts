import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import * as bankActions from '../../store/actions/bank.action';
import * as supplyActions from '../../store/actions/supply.action';
import * as fromStore from '../../store';

@Component({
  selector: 'sm-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrderComponent {
  constructor(private _store: Store<fromStore.VendingMachineState>) {}

  buy() {
    this._store.dispatch(new bankActions.Purchase());
    this._store
      .select(fromStore.getTransactionValidity)
      .pipe(first())
      .subscribe((valid) => {
        if (valid) {
          this._store.dispatch(new supplyActions.Order());
        }
      });
  }

  cancel() {
    this._store.dispatch(new bankActions.CancelDeposit());
  }
}
