import { Component, Input } from '@angular/core';

@Component({
  selector: 'sm-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss'],
})
export class CoinComponent {
  @Input()
  coin: string;
}
