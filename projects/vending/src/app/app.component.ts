import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as reducers from './store/reducers';
import * as supplyActions from './store/actions/supply.action';
import * as supplySelectors from './store/selectors/supply.selector';

import { COLUMN, VendLocation } from './models';

@Component({
  selector: 'sm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  supply$: Observable<number>;

  testOrder: VendLocation = {
    row: 'B',
    column: COLUMN.LEFT,
  };

  constructor(private _store: Store<reducers.VendingMachineState>) {}

  ngOnInit() {
    this.supply$ = this._store.select(supplySelectors.getSupply);
    // Initialise the supply with 2 Snickers bars.
    this._store.dispatch(new supplyActions.Supply(2));
  }
}
