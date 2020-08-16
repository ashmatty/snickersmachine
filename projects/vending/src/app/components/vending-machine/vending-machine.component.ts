import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { RowSupply } from '../../models';

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
    if (!!changes.resupply && changes.resupply.currentValue !== '' && changes.resupply.currentValue >= 0) {
      this._resupplyStock(changes.resupply.currentValue);
    }
  }

  private _resupplyStock(amount: number) {
    if (amount > this._MAX_SUPPLY) {
      throw Error(
        `Resupply amount is too high. Please try an amount lower than ${this._MAX_SUPPLY}`
      );
    }

    if (amount > 10) {
      throw Error(`Total amount of stock will exceed ${this._MAX_SUPPLY}`);
    }

    // Run arm animation if required.
    if (amount < this.supply) {
      this._selectItem();
    }

    // Update master record.
    this.supply = amount;

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

  private _selectItem() {
    // Find supplyMap of last location in map with stock.
    let row = null;
    let col = null;

    for(let i = this.supplyMap.length - 1; i >= 0; i--) {
      if (this.supplyMap[i].right && !row && !col) {
        row = this.supplyMap[i].row;
        col = 'right';
      } else if (this.supplyMap[i].left && !row && !col) {
        row = this.supplyMap[i].row;
        col = 'left';
      }
    }
    
    console.log('Row: ', row);
    console.log('Column: ', col);
  }
}
