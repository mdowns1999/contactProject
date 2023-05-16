import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {

  

  // contacts: Contact[] = [
  //   new Contact("1", "R. Kent Jackson","jacksonk@byui.edu", "208-496-3771", "../../assets/images/jacksonk.jpg", null),
  //   new Contact("2", "Rex Barzee", "barzeer@byui.edu", "208-496-3771", "../../assets/images/barzeer.jpg", null)
  // ];
  contacts: Contact[] = [];

  constructor(private contactService: ContactService){}

  ngOnInit(){
    this.contacts = this.contactService.getContacts();
  }

  onSelected(contact: Contact){
    this.contactService.contactSelectedEvent.emit(contact);
  }
    
}
