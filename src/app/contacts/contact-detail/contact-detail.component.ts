import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {

  @Input() contact: Contact;
  //contact = new Contact("1", "Name Here", "Email Here", "555-5555", "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg", null);
}
