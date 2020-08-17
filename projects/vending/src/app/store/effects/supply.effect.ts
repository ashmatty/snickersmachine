import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as supplyActions from '../actions/supply.action';
import * as services from '../../services';

@Injectable()
export class SupplyEffects {
  constructor(
    private _actions$: Actions,
    private _messageService: services.MessageService,
    private _supplyService: services.SupplyService
  ) {}

  @Effect()
  resupplyStock$ = this._actions$.pipe(
    ofType(supplyActions.SUPPLY),
    switchMap((action: supplyActions.Supply) => {
      return this._supplyService.resupplyMachine(action.payload).pipe(
        map((supply) => new supplyActions.SupplySuccess(supply)),
        catchError((error) => {
          this._messageService.newMessage(error);
          return of(new supplyActions.SupplyFail(error));
        })
      );
    })
  );

  @Effect()
  order$ = this._actions$.pipe(
    ofType(supplyActions.ORDER),
    switchMap(() => {
      return this._supplyService.consumeItem().pipe(
        map((supply) => new supplyActions.OrderSuccess()),
        catchError((error) => {
          this._messageService.newMessage(error);
          return of(new supplyActions.OrderFail(error));
        })
      );
    })
  );
}
