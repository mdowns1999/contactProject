import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

    contactSelectedEvent = new EventEmitter<Contact>();
    contactListChangedEvent = new Subject<Contact[]>();

   contacts: Contact [] =[];
   maxContactId: number;
   constructor(private http: HttpClient) {
      //this.contacts = MOCKCONTACTS;
      this.maxContactId = this.getMaxId();
   }

   // getContacts(): Contact[]{
   //  return this.contacts.slice();
   // }

   //Get List of contactss
  getContacts(): Contact[] {
   console.log('MADE IT');
   this.http
     .get<Contact[]>(
       'https://cms-contacts-project-default-rtdb.firebaseio.com/contacts.json'
     )
     .subscribe(
       // success method
       (contacts: Contact[]) => {
         this.contacts = contacts.sort();
         this.maxContactId = this.getMaxId();
         this.contactListChangedEvent.next(this.contacts.slice());
       },
       (error: any) => {
         console.log(error.message);
       }
     );

   return this.contacts.slice();
 }

 storeContacts(){
   let contactList = JSON.stringify(this.contacts);
   //console.log(contactList)
   this.http.put('https://cms-contacts-project-default-rtdb.firebaseio.com/contacts.json', contactList,
   {
      headers: new HttpHeaders({
         "Content-Type": "application/json"
      })
   }).subscribe(
      () =>{
         this.contactListChangedEvent.next(this.contacts.slice());
      }
   )
  }



//  storeDocuments(){
//   let documentList = JSON.stringify(this.documents);
//   this.http.put('https://cms-contacts-project-default-rtdb.firebaseio.com/documents.json', documentList,
//   {
//      headers: new HttpHeaders({
//         "Content-Type": "application/json"
//      })
//   }).subscribe(
//      () =>{
//         this.documentListChangedEvent.next(this.documents.slice());
//      }
//   )
//  }


   ///Might be right?????????
   getContact(id: string): Contact {
   //  for(const contact of this.contacts){
   //      if(contact.id == id)
   //      {return contact;}
   //  }
   //  return null;
  

    return this.contacts.find((contact)=> contact.id === id)
   } 

  //  deleteContact(contact: Contact) {
  //     if(!contact){
  //       return;
  //     }

  //     const pos = this.contacts.indexOf(contact);
  //     if(pos < 0){
  //       return;
  //     }

  //     this.contacts.splice(pos, 1);
  //     this.contactChangedEvent.emit(this.contacts.slice());

  //   }

  getMaxId(): number {

    let maxId = 0
 
    this.contacts.forEach(contact => {
       let currentId = parseInt(contact.id);
       if(currentId > maxId)
       {
          maxId = currentId;
       }
    });
 
    return maxId
 }
 
 // The addContact() function needs to generate a unique value for the id property of the new Contact 
 // object being added to the Contacts list and then push the new Contact on to the Contact list.
 addContact(newContact: Contact) {
    if (!newContact)
       {
          return;
       }
 
    this.maxContactId++
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice()
    //this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
 }
 
 // The udpateContact() function is responsible for locating an existing Contact in the Contacts 
 // list and replacing it with a new updated version of the same Contact.
 updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact  || !newContact)
        {return;}
 
 
    let pos = this.contacts.indexOf(originalContact)
    if (pos < 0)
       { return;}
 
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    

    let contactsListClone = this.contacts.slice();
    //this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
 }
 
 // The deleteContact() function is responsible for locating and 
 // deleting the Contact passed to it from the Contacts list.
 deleteContact(contact: Contact) {
    if (!contact) {
              return;
       }
    let pos = this.contacts.indexOf(contact)
        if (pos < 0) {
        return;
     }
    this.contacts.splice(pos, 1)
    let contactsListClone = this.contacts.slice()
    //this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
 }

}
