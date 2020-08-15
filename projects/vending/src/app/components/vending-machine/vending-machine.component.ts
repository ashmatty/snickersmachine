import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { RowSupply, VendLocation } from '../../models';

@Component({
  selector: 'sm-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.scss'],
})
export class VendingMachineComponent implements OnChanges, OnInit {
  private _MAX_SUPPLY: number = 10;
  rows: string[] = ['A', 'B', 'C', 'D', 'E'];
  cols: number[] = [1, 2];
  supply: number = 0;
  supplyMap: RowSupply[] = [];

  @Input()
  order: VendLocation;

  @Input()
  resupply: number;

  ngOnInit() {
    // Zero the supplyMap.
    this.rows.forEach((row) => {
      this.supplyMap.push({
        row,
        left: false,
        right: false,
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.resupply && changes.resupply.currentValue !== '' && changes.resupply.currentValue > 0) {
      this._resupplyStock(changes.resupply.currentValue);
    } else if (!!changes.order) {
      this._selectItem(changes.order.currentValue);
    }
  }

  private _selectItem(location: VendLocation) {
    
  }

  private _resupplyStock(amount: number) {
    if (amount > this._MAX_SUPPLY) {
      throw Error(
        `Resupply amount is too high. Please try an amount lower than ${this._MAX_SUPPLY}`
      );
    }

    if (amount + this.supply > 10) {
      throw Error(`Total amount of stock will exceed ${this._MAX_SUPPLY}`);
    }

    // Update master record.
    this.supply += amount;

    // Update mapping.
    let temp = this.supply;

    // Rebuild map
    this.supplyMap = [];

    this.rows.forEach((row) => {
      if (temp >= 2) {
        this.supplyMap = [
          ...this.supplyMap,
          {
            row,
            left: true,
            right: true,
          },
        ];
        temp -= 2;
      } else if (temp === 1) {
        this.supplyMap = [
          ...this.supplyMap,
          {
            row,
            left: true,
            right: false,
          },
        ];
        temp -= 1;
      } else {
        this.supplyMap = [
          ...this.supplyMap,
          {
            row,
            left: false,
            right: false,
          },
        ];
      }
    });
  }
}
