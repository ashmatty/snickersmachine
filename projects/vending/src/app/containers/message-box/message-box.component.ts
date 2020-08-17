import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MessageService } from '../../services';

@Component({
  selector: 'sm-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
})
export class MessageBoxComponent implements OnInit {
  messages$: Observable<string[]>;

  constructor(private _messageService: MessageService) {}

  ngOnInit() {
    this.messages$ = this._messageService.getMessages;
  }
}
