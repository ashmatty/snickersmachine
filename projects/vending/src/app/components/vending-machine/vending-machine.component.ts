import { Component } from '@angular/core';

@Component({
  selector: 'sm-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.scss'],
})
export class VendingMachineComponent {
  rows: string[] = ['A', 'B', 'C', 'D', 'E'];
  cols: number[] = [1, 2];
  supply: number = 10;
}
