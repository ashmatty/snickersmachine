import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects, reducers } from './store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../environments/environment';
import { COMPONENTS } from './components';
import { CONTAINERS } from './containers';

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];


export const IMPORTS = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  StoreModule.forRoot({}, { metaReducers }),
  EffectsModule.forRoot(effects),
  StoreModule.forFeature('VendingMachineState', reducers),
  !environment.production ? StoreDevtoolsModule.instrument() : [],
  ...COMPONENTS,
  ...CONTAINERS,
];
