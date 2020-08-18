import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as bankActions from '../../store/actions/bank.action';
import * as supplyActions from '../../store/actions/supply.action';
import * as bankSelectors from '../../store/selectors/bank.selector';
import * as fromStore from '../../store';
import { CoinSet } from '../../models';

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
    this._store.dispatch(new supplyActions.Order());
  }

  cancel() {
    this._store.dispatch(new bankActions.CancelDeposit());
  }
}
