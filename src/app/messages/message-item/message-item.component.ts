import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit{
  @Input() message: Message;
  messageSender: Contact;
  constructor(private contactService: ContactService) {}
  ngOnInit() {

    //console.log(this.contactService.getContacts().find(this.message.sender));

     const contact: Contact = this.contactService.getContactbySender(this.message.sender);
     this.messageSender.name = contact.name;
  }
}