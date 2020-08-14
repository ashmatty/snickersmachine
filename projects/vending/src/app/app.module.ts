import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { IMPORTS } from './app.import';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: IMPORTS,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
