import { Action } from '@ngrx/store';

import { Bank } from '../../models';

export const DEPOSIT = '[Snickers Machine] Deposit coin';
export const DEPOSIT_FAIL = '[Snickers Machine] Deposit coin fail';
export const DEPOSIT_SUCCESS = '[Snickers Machine] Deposit coin success';

export class Deposit implements Action {
  readonly type = DEPOSIT;
  constructor(public payload: number) {}
}

export class DepositFail implements Action {
  readonly type = DEPOSIT_FAIL;
  constructor(public payload: any) {}
}

export class DepositSuccess implements Action {
  readonly type = DEPOSIT_SUCCESS;
  constructor(public payload: Bank) {}
}

export const CANCEL_DEPOSIT = '[Snickers Machine] Cancel coin deposit';
export const CANCEL_DEPOSIT_FAIL =
  '[Snickers Machine] Cancel coin deposit fail';
export const CANCEL_DEPOSIT_SUCCESS =
  '[Snickers Machine] Cancel coin deposit success';

export class CancelDeposit implements Action {
  readonly type = CANCEL_DEPOSIT;
}

export class CancelDepositFail implements Action {
  readonly type = CANCEL_DEPOSIT_FAIL;
  constructor(public payload: any) {}
}

export class CancelDepositSuccess implements Action {
  readonly type = CANCEL_DEPOSIT_SUCCESS;
  constructor(public payload: Bank) {}
}

export type BankAction =
  | CancelDeposit
  | CancelDepositFail
  | CancelDepositSuccess
  | Deposit
  | DepositFail
  | DepositSuccess;
