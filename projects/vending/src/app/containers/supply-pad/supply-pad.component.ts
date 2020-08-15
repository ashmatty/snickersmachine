import { Component, EventEmitter, Output } from '@angular/core';

import { Store } from '@ngrx/store';
import * as supplyActions from '../../store/actions/supply.action';
import { VendingMachineState } from '../../store';

@Component({
  selector: 'sm-supply-pad',
  templateUrl: './supply-pad.component.html',
  styleUrls: ['./supply-pad.component.scss'],
})
export class SupplyPadComponent {
  constructor(private _store: Store<VendingMachineState>) {}

  numberSubmitted(value: number) {
    this._store.dispatch(new supplyActions.Supply(value));
  }
}
