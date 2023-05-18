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
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = 'Mike';

  constructor(private messageService: MessageService){}

  onSendMessage(){
    const ingSub = this.subjectRef.nativeElement.value;
    const ingMsg = this.messageTxtRef.nativeElement.value;
    const newMessage = new Message('1', ingSub, ingMsg, this.currentSender);
    //this.addMessageEvent.emit(newMessage);
    this.messageService.addMessage(newMessage);
  }

  onClear(){
    this.subjectRef.nativeElement.value = '';
    this.messageTxtRef.nativeElement.value = '';
  }
}
