import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as reducers from './store/reducers';
import * as supplySelectors from './store/selectors/supply.selector';

import { COLUMN, VendLocation } from './models';

@Component({
  selector: 'sm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private _store: Store<reducers.VendingMachineState>){}

  supply$: Observable<number> = this._store.select(supplySelectors.getSupply);

  testOrder: VendLocation = {
    row: 'B',
    column: COLUMN.LEFT,
  }
}
