import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { IMPORTS, PROVIDERS } from './app.import';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: IMPORTS,
  providers: PROVIDERS,
  bootstrap: [AppComponent]
})
export class AppModule { }
