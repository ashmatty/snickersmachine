import { Component, Input } from '@angular/core';
import { COLUMN, VendLocation } from '../../../models';

@Component({
  selector: 'sm-arm',
  templateUrl: './arm.component.html',
  styleUrls: ['./arm.component.scss'],
})
export class ArmComponent {
  cssLocationMap = [
    { location: <VendLocation>{ row: 'A', column: COLUMN.LEFT }, x: 0, y: 0},
    { location: <VendLocation>{ row: 'A', column: COLUMN.RIGHT }, x: 0, y: 0},
    { location: <VendLocation>{ row: 'B', column: COLUMN.LEFT }, x: 0, y: 0},
    { location: <VendLocation>{ row: 'B', column: COLUMN.RIGHT }, x: 0, y: 0},
    { location: <VendLocation>{ row: 'C', column: COLUMN.LEFT }, x: 0, y: 0},
    { location: <VendLocation>{ row: 'C', column: COLUMN.RIGHT }, x: 0, y: 0},
    { location: <VendLocation>{ row: 'D', column: COLUMN.LEFT }, x: 0, y: 0},
    { location: <VendLocation>{ row: 'D', column: COLUMN.RIGHT }, x: 0, y: 0},
    { location: <VendLocation>{ row: 'E', column: COLUMN.LEFT }, x: 0, y: 0},
    { location: <VendLocation>{ row: 'E', column: COLUMN.RIGHT }, x: 0, y: 0},
  ];

  @Input()
  location: VendLocation;
}
