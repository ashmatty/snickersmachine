import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { COMPONENTS } from './components';
import { CONTAINERS } from './containers';

export const IMPORTS = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  ...COMPONENTS,
  ...CONTAINERS,
];
