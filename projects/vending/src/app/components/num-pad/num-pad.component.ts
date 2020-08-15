import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sm-num-pad',
  templateUrl: './num-pad.component.html',
  styleUrls: ['./num-pad.component.scss'],
})
export class NumPadComponent {
  output: string = '';

  @Output()
  submittedValue: EventEmitter<number> = new EventEmitter<number>();

  writeNumber(event) {
    this.output = `${this.output}${event}`;
  }

  backspace() {
    if(this.output !== '') {
      this.output = this.output.substr(0, this.output.length - 1);
    }
  }

  submitNumber() {
    const value = +this.output;
    this.output = '';
    this.submittedValue.emit(value);
  }
}
