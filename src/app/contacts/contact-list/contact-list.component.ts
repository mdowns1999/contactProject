import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];
  subscription: Subscription;
  term: string;

  constructor(private contactService: ContactService){}

  ngOnInit(){
    this.contacts = this.contactService.getContacts();
    // this.contactService.contactChangedEvent.subscribe(
    //   (contacts: Contact[]) => {
    //     this.contacts = contacts;
    //   }
    // )
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contactList: Contact[]) => {
        this.contacts = contactList;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


    search(value:string){
      this.term = value;
      console.log(this.term);
    }
}
