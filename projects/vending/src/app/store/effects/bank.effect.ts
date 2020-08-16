import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as bankActions from '../actions/bank.action';
import * as bankService from '../../services/bank.service';

@Injectable()
export class BankEffects {
  constructor(
    private actions$: Actions,
    private bankService: bankService.BankService
  ) {}

  @Effect()
  depositCoin$ = this.actions$.pipe(
    ofType(bankActions.DEPOSIT),
    switchMap((action: bankActions.Deposit) => {
      return this.bankService.depositCoin(action.payload).pipe(
        map((bank) => new bankActions.DepositSuccess(bank)),
        catchError((error) => of(new bankActions.DepositFail(error)))
      );
    })
  );

  @Effect()
  cancelCoinDeposit$ = this.actions$.pipe(
    ofType(bankActions.CANCEL_DEPOSIT),
    switchMap(() => {
      return this.bankService.cancelOrder().pipe(
        map((bank) => new bankActions.CancelDepositSuccess(bank)),
        catchError((error) => of(new bankActions.CancelDepositFail(error)))
      );
    })
  );
}
