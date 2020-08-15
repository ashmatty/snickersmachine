import { createSelector } from '@ngrx/store';

import * as reducers from '../reducers';
import * as supplyReducer from '../reducers/supply.reducer';

export const getSupplyState = createSelector(
  reducers.getVendingMachineState,
  (state: reducers.VendingMachineState) => state.supplyState
);

export const getSupply = createSelector(
  getSupplyState,
  (state: supplyReducer.SupplyState) => state.supply
);

export const getSupplyLoaded = createSelector(
  getSupplyState,
  (state: supplyReducer.SupplyState) => state.loaded
);

export const getSupplyLoading = createSelector(
  getSupplyState,
  (state: supplyReducer.SupplyState) => state.loading
);
