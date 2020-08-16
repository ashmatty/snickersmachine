import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

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
    this._store.dispatch(new supplyActions.Order());
  }
}
