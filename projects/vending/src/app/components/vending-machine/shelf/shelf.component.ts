import { Component, Input } from '@angular/core';

@Component({
  selector: 'sm-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.scss'],
})
export class ShelfComponent {
  @Input()
  rowSupply: { left: number, right: number };
}
