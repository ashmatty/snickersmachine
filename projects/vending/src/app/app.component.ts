import { Component } from '@angular/core';

import { COLUMN, VendLocation } from './models';

@Component({
  selector: 'sm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  testOrder: VendLocation = {
    row: 'B',
    column: COLUMN.LEFT,
  }
}
