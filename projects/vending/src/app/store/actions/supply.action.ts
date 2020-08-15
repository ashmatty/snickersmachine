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

export type ResupplyAction = Supply | SupplyFail | SupplySuccess;
