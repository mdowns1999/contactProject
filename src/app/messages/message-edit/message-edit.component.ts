import { 
Component,
ViewChild,
ElementRef,
OnInit,
EventEmitter,
Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {

  @ViewChild('subject', {static:false}) subjectRef: ElementRef;
  @ViewChild('msgText', {static:false}) messageTxtRef: ElementRef;
  currentSender = '1';

  constructor(private messageService: MessageService){}

  onSendMessage(){
    const ingSub = this.subjectRef.nativeElement.value;
    const ingMsg = this.messageTxtRef.nativeElement.value;
    const newMessage = new Message('1', ingSub, ingMsg, this.currentSender);
    this.messageService.addMessage(newMessage);

    this.onClear();
  }

  onClear(){
    this.subjectRef.nativeElement.value = '';
    this.messageTxtRef.nativeElement.value = '';
  }
}
