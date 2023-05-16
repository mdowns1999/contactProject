import { Component, OnInit} from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent {

  constructor(private contactService: ContactService){}

  selectedContact: Contact;


  ngOnInit(){
    this.contactService.contactSelectedEvent.subscribe(
      (contact: Contact) => {this.selectedContact = contact}
    )
  }
}
