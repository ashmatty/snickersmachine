import * as bankActions from '../actions/bank.action';
import { Bank } from '../../models/bank.interface';

export interface BankState {
  bank: Bank;
  loaded: boolean;
  loading: boolean;
}

const initialBankData: Bank = {
  deposited: 0,
  supply: {
    twodollars: 15,
    onedollar: 11,
    fiftycents: 5,
    twentycents: 25,
    tencents: 8,
  },
};

export const initialBankState: BankState = {
  bank: initialBankData,
  loaded: false,
  loading: false,
};

export function bankReducer(
  state = initialBankState,
  action: bankActions.BankAction
): BankState {
  switch(action.type) {
    case bankActions.CANCEL_DEPOSIT:
    case bankActions.DEPOSIT: {
      return {
        ...state,
        loading: true,
      }
    }

    case bankActions.CANCEL_DEPOSIT_FAIL:
    case bankActions.DEPOSIT_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }

    case bankActions.CANCEL_DEPOSIT_SUCCESS:
    case bankActions.DEPOSIT_SUCCESS: {
      const bank = action.payload;

      return {
        ...state,
        loaded: true,
        loading: false,
        bank,
      }
    }
  }

  return state;
}
