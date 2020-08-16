import { Action } from '@ngrx/store';

export const SUPPLY = '[Snickers Machine] Supply machine';
export const SUPPLY_FAIL = '[Snickers Machine] Supply machine fail';
export const SUPPLY_SUCCESS = '[Snickers Machine] Supply machine success';

export class Supply implements Action {
  readonly type = SUPPLY;
  constructor(public payload: number) {}
}

export class SupplyFail implements Action {
  readonly type = SUPPLY_FAIL;
  constructor(public payload: any) {}
}

export class SupplySuccess implements Action {
  readonly type = SUPPLY_SUCCESS;
  constructor(public payload: number) {}
}

export const ORDER = '[Snickers Machine] Order snickers bar';
export const ORDER_FAIL = '[Snickers Machine] Order snickers bar fail';
export const ORDER_SUCCESS = '[Snickers Machine] Order snickers bar success';

export class Order implements Action {
  readonly type = ORDER;
}

export class OrderFail implements Action {
  readonly type = ORDER_FAIL;
  constructor(public payload: any) {}
}

export class OrderSuccess implements Action {
  readonly type = ORDER_SUCCESS;
}

export type SupplyAction = Order | OrderFail | OrderSuccess | Supply | SupplyFail | SupplySuccess;
