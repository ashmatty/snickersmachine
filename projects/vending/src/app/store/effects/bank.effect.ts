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
  purchased$ = this._actions$.pipe(
    ofType(bankActions.PURCHASE),
    switchMap((action: bankActions.Purchase) => {
      return this._bankService.purchase(action.payload).pipe(
        map((bank) => new bankActions.PurchaseSuccess(bank)),
        catchError((error) => {
          this._messageService.newMessage(error);
          return of(new bankActions.PurchaseFail(error))
        })
      )
    })
  )

  @Effect()
  cancelCoinDeposit$ = this._actions$.pipe(
    ofType(bankActions.CANCEL_DEPOSIT),
    switchMap(() => {
      return this._bankService.cancelOrder().pipe(
        map((deposited) => {
          this._messageService.newMessage(`
          Returned coins: 
          $2: ${deposited.twodollars},
          $1: ${deposited.onedollar},
          50c: ${deposited.fiftycents},
          20c: ${deposited.twentycents},
          10c: ${deposited.tencents},
          5c: ${deposited.fivecents}
          
          Total amount: $${deposited.amount}
          `);
          return new bankActions.CancelDepositSuccess(deposited)
        }),
        catchError((error) => {
          this._messageService.newMessage(error);
          return of(new bankActions.CancelDepositFail(error));
        })
      );
    })
  );
}
