import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'sm-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.scss'],
})
export class VendingMachineComponent implements OnChanges, OnInit {
  private _MAX_SUPPLY: number = 10;
  rows: string[] = ['A', 'B', 'C', 'D', 'E'];
  cols: number[] = [1, 2];
  supply: number = 2;
  supplyMap: { [location: string]: number }[] = [];

  @Input()
  order: string;

  @Input()
  resupply: number;

  ngOnInit() {
    // Zero the supplyMap.
    this.rows.forEach((row) => {
      this.supplyMap.push({
        [`${row}1`]: 0,
        [`${row}2`]: 0,
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.resupply) {
      this._resupplyStock(changes.resupply.currentValue);
    }
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
    this.supplyMap = [];

    this.rows.forEach((row) => {
      if (temp >= 2) {
        this.supplyMap.push({
          [`${row}1`]: 1,
          [`${row}2`]: 1,
        });
      } else if (temp === 1) {
        this.supplyMap.push({
          [`${row}1`]: 1,
          [`${row}2`]: 0,
        });
      } else {
        this.supplyMap.push({
          [`${row}1`]: 0,
          [`${row}2`]: 0,
        });
      }
    });

    console.log('Supply map udpated: ', this.supplyMap);
  }
}
