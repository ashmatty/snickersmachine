import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as supplyReducer from './supply.reducer';

export interface VendingMachineState {
  supplyState: supplyReducer.SupplyState;
}

export const reducers: ActionReducerMap<VendingMachineState> = {
  supplyState: supplyReducer.supplyReducer,
};

export const getVendingMachineState = createFeatureSelector<
  VendingMachineState
>('VendingMachineState');
