import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RowSupply } from '../../../models';

@Component({
  selector: 'sm-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShelfComponent{
  @Input()
  rowSupply: RowSupply;
}
