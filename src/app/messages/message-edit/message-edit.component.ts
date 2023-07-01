import { 
Component,
ViewChild,
ElementRef,
OnInit,
EventEmitter,
Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subject', {static:false}) subjectRef: ElementRef;
  @ViewChild('msgText', {static:false}) messageTxtRef: ElementRef;
  currentSender: Contact;

  constructor(private messageService: MessageService, private contactService: ContactService){}

  ngOnInit(): void {
    let contact = this.contactService.getContact('101');
    this.currentSender = contact;
  }

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
