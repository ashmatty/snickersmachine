import * as supplyActions from '../actions/supply.action';

export interface SupplyState {
  supply: number;
  loaded: boolean;
  loading: boolean;
}

export const initialSupplyState: SupplyState = {
  supply: 0,
  loaded: false,
  loading: false,
};

export function supplyReducer(
  state = initialSupplyState,
  action: supplyActions.SupplyAction
): SupplyState {
  switch (action.type) {
    case supplyActions.ORDER:
    case supplyActions.SUPPLY: {
      return {
        ...state,
        loading: true,
      };
    }

    case supplyActions.ORDER_FAIL:
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

    case supplyActions.ORDER_SUCCESS: {
      const supply = state.supply - 1;

      return {
        ...state,
        supply,
        loaded: true,
        loading: false,
      };
    }
  }

  return state;
}
