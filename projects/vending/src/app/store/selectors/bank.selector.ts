import { createSelector } from '@ngrx/store';

import * as reducers from '../reducers';
import * as bankReducer from '../reducers/bank.reducer';
import { Bank } from '../../models';

export const getBankState = createSelector(
  reducers.getVendingMachineState,
  (state: reducers.VendingMachineState) => state.bankState
);

export const getBank = createSelector(
  getBankState,
  (state: bankReducer.BankState) => state.bank
);

export const getCoinSupply = createSelector(
  getBank,
  (bank: Bank) => bank.supply
);

export const getDeposited = createSelector(
  getBank,
  (bank: Bank) => {
    return bank.deposited;
  }
);

export const getBankLoaded = createSelector(
  getBankState,
  (state: bankReducer.BankState) => state.loaded
);

export const getBankLoading = createSelector(
  getBankState,
  (state: bankReducer.BankState) => state.loading
);
