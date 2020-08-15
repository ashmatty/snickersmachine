import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sm-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShelfComponent implements OnChanges{
  @Input()
  rowSupply: { left: number, right: number };

  ngOnChanges(changes) {
    console.log(changes);
  }
}
