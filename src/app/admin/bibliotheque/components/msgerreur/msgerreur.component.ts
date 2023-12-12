import { Component , EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-msgerreur',
  templateUrl: './msgerreur.component.html',
  styleUrls: ['./msgerreur.component.scss']
})
export class MsgerreurComponent {
  @Output() messageEvent: EventEmitter<{ msg: string; error: string }> = new EventEmitter();

  msg: string | undefined;
  error: string | undefined;

  sendMessage(msg: string, error: string) {
    this.msg = msg;
    this.error = error;
    this.messageEvent.emit({ msg, error });
  }
}

