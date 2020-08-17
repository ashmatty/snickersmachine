import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as bankActions from '../actions/bank.action';
import * as services from '../../services';

@Injectable()
export class BankEffects {
  constructor(
    private _actions$: Actions,
    private _bankService: services.BankService,
    private _messageService: services.MessageService,
  ) {}

  @Effect()
  depositCoin$ = this._actions$.pipe(
    ofType(bankActions.DEPOSIT),
    switchMap((action: bankActions.Deposit) => {
      return this._bankService.depositCoin(action.payload).pipe(
        map((bank) => new bankActions.DepositSuccess(bank)),
        catchError((error) => {
          this._messageService.newMessage(error);
          return of(new bankActions.DepositFail(error));
        })
      );
    })
  );

  @Effect()
  cancelCoinDeposit$ = this._actions$.pipe(
    ofType(bankActions.CANCEL_DEPOSIT),
    switchMap(() => {
      return this._bankService.cancelOrder().pipe(
        map((bank) => new bankActions.CancelDepositSuccess(bank)),
        catchError((error) => {
          this._messageService.newMessage(error);
          return of(new bankActions.CancelDepositFail(error));
        })
      );
    })
  );
}
