import { Component, Input } from '@angular/core';
import { Bank } from '../../models';

@Component({
  selector: 'sm-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
})
export class BankComponent {
  @Input()
  bank: Bank;
}
