import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private _messages: string[] = [];
  private _messages$: Subject<string[]> = new Subject();

  newMessage(message: string) {
    this._messages.push(message);
    this._messages$.next(this._messages);
  }

  get getMessages(): Observable<string[]> {
    return this._messages$;
  }
}
