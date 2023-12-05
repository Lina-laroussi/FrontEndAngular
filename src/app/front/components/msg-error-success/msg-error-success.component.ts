import { Component , EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-msg-error-success',
  templateUrl: './msg-error-success.component.html',
  styleUrls: ['./msg-error-success.component.scss']
})
export class MsgErrorSuccessComponent {


  @Output() messageEvent: EventEmitter<{ msg: string; error: string }> = new EventEmitter();

  msg: string | undefined;
  error: string | undefined;

  sendMessage(msg: string, error: string) {
    this.msg = msg;
    this.error = error;
    this.messageEvent.emit({ msg, error });
  }
}
