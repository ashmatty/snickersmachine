import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as bankReducer from './bank.reducer';
import * as supplyReducer from './supply.reducer';

export interface VendingMachineState {
  bankState: bankReducer.BankState;
  supplyState: supplyReducer.SupplyState;
}

export const reducers: ActionReducerMap<VendingMachineState> = {
  bankState: bankReducer.bankReducer,
  supplyState: supplyReducer.supplyReducer,
};

export const getVendingMachineState = createFeatureSelector<
  VendingMachineState
>('VendingMachineState');
