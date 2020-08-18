import * as bankActions from '../actions/bank.action';
import { Bank } from '../../models/bank.interface';

export interface BankState {
  bank: Bank;
  errorMsg: string;
  loaded: boolean;
  loading: boolean;
}

const initialBankData: Bank = {
  deposited: {
    amount: 0,
    twodollars: 0,
    onedollar: 0,
    fiftycents: 0,
    twentycents: 0,
    tencents: 0,
  },
  supply: {
    twodollars: 15,
    onedollar: 11,
    fiftycents: 5,
    twentycents: 25,
    tencents: 8,
  },
  returned: {
    amount: 0,
    twodollars: 0,
    onedollar: 0,
    fiftycents: 0,
    twentycents: 0,
    tencents: 0,
  },
};

export const initialBankState: BankState = {
  bank: initialBankData,
  errorMsg: null,
  loaded: false,
  loading: false,
};

export function bankReducer(
  state = initialBankState,
  action: bankActions.BankAction
): BankState {
  switch (action.type) {
    case bankActions.CANCEL_DEPOSIT:
    case bankActions.DEPOSIT:
    case bankActions.PURCHASE: {
      return {
        ...state,
        loading: true,
      };
    }

    case bankActions.CANCEL_DEPOSIT_FAIL:
    case bankActions.DEPOSIT_FAIL:
    case bankActions.PURCHASE: {
      return {
        ...state,
        loading: false,
      };
    }

    case bankActions.CANCEL_DEPOSIT_SUCCESS: {
      const deposited = initialBankData.deposited;

      const bank = {
        ...state.bank,
        deposited,
      };

      return {
        ...state,
        loaded: true,
        loading: false,
        bank,
      };
    }

    case bankActions.DEPOSIT_SUCCESS:
    case bankActions.PURCHASE_SUCCESS: {
      const bank = action.payload;

      return {
        ...state,
        loaded: true,
        loading: false,
        bank,
      };
    }
  }

  return state;
}
