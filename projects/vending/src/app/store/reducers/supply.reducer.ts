import * as supplyActions from '../actions/supply.action';

export interface SupplyState {
  supply: number;
  loaded: boolean;
  loading: boolean;
}

export const initialSupplyState: SupplyState = {
  supply: 2,
  loaded: false,
  loading: false,
};

export function supplyReducer(
  state = initialSupplyState,
  action: supplyActions.ResupplyAction
): SupplyState {
  switch (action.type) {
    case supplyActions.SUPPLY: {
      return {
        ...state,
        loading: true,
      };
    }

    case supplyActions.SUPPLY_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
      };
    }

    case supplyActions.SUPPLY_SUCCESS: {
      return {
        ...state,
        supply: action.payload,
        loaded: true,
        loading: false,
      };
    }
  }

  return state;
}
