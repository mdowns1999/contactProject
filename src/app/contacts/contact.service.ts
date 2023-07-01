import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// export class ContactService {

//     contactSelectedEvent = new EventEmitter<Contact>();
//     contactListChangedEvent = new Subject<Contact[]>();

//    contacts: Contact [] =[];
//    maxContactId: number;
//    constructor(private http: HttpClient) {
//       //this.contacts = MOCKCONTACTS;
//       this.maxContactId = this.getMaxId();
//    }

//    // getContacts(): Contact[]{
//    //  return this.contacts.slice();
//    // }

//    //Get List of contactss
//   getContacts(): Contact[] {
//    console.log('FIREBASE CONTACTS')
//    this.http
//      .get<Contact[]>(
//        'https://cms-contacts-project-default-rtdb.firebaseio.com/contacts.json'
//      )
//      .subscribe(
//        // success method
//        (contacts: Contact[]) => {
//          this.contacts = contacts.sort();
//          this.maxContactId = this.getMaxId();
//          this.contactListChangedEvent.next(this.contacts.slice());
//        },
//        (error: any) => {
//          console.log(error.message);
//        }
//      );

//    return this.contacts.slice();
//  }

//  storeContacts(){
//    let contactList = JSON.stringify(this.contacts);
//    //console.log(contactList)
//    this.http.put('https://cms-contacts-project-default-rtdb.firebaseio.com/contacts.json', contactList,
//    {
//       headers: new HttpHeaders({
//          "Content-Type": "application/json"
//       })
//    }).subscribe(
//       () =>{
//          this.contactListChangedEvent.next(this.contacts.slice());
//       }
//    )
//   }



// //  storeDocuments(){
// //   let documentList = JSON.stringify(this.documents);
// //   this.http.put('https://cms-contacts-project-default-rtdb.firebaseio.com/documents.json', documentList,
// //   {
// //      headers: new HttpHeaders({
// //         "Content-Type": "application/json"
// //      })
// //   }).subscribe(
// //      () =>{
// //         this.documentListChangedEvent.next(this.documents.slice());
// //      }
// //   )
// //  }


//    ///Might be right?????????
//    getContact(id: string): Contact {
//    //  for(const contact of this.contacts){
//    //      if(contact.id == id)
//    //      {return contact;}
//    //  }
//    //  return null;
  

//     return this.contacts.find((contact)=> contact.id === id)
//    } 

//   //  deleteContact(contact: Contact) {
//   //     if(!contact){
//   //       return;
//   //     }

//   //     const pos = this.contacts.indexOf(contact);
//   //     if(pos < 0){
//   //       return;
//   //     }

//   //     this.contacts.splice(pos, 1);
//   //     this.contactChangedEvent.emit(this.contacts.slice());

//   //   }

//   getMaxId(): number {

//     let maxId = 0
 
//     this.contacts.forEach(contact => {
//        let currentId = parseInt(contact.id);
//        if(currentId > maxId)
//        {
//           maxId = currentId;
//        }
//     });
 
//     return maxId
//  }
 
//  // The addContact() function needs to generate a unique value for the id property of the new Contact 
//  // object being added to the Contacts list and then push the new Contact on to the Contact list.
//  addContact(newContact: Contact) {
//     if (!newContact)
//        {
//           return;
//        }
 
//     this.maxContactId++
//     newContact.id = this.maxContactId.toString();
//     this.contacts.push(newContact);
//     let contactsListClone = this.contacts.slice()
//     //this.contactListChangedEvent.next(contactsListClone);
//     this.storeContacts();
//  }
 
//  // The udpateContact() function is responsible for locating an existing Contact in the Contacts 
//  // list and replacing it with a new updated version of the same Contact.
//  updateContact(originalContact: Contact, newContact: Contact) {
//     if (!originalContact  || !newContact)
//         {return;}
 
 
//     let pos = this.contacts.indexOf(originalContact)
//     if (pos < 0)
//        { return;}
 
//     newContact.id = originalContact.id;
//     this.contacts[pos] = newContact;
    

//     let contactsListClone = this.contacts.slice();
//     //this.contactListChangedEvent.next(contactsListClone);
//     this.storeContacts();
//  }
 
//  // The deleteContact() function is responsible for locating and 
//  // deleting the Contact passed to it from the Contacts list.
//  deleteContact(contact: Contact) {
//     if (!contact) {
//               return;
//        }
//     let pos = this.contacts.indexOf(contact)
//         if (pos < 0) {
//         return;
//      }
//     this.contacts.splice(pos, 1)
//     let contactsListClone = this.contacts.slice()
//     //this.contactListChangedEvent.next(contactsListClone);
//     this.storeContacts();
//  }

// }



  ///////////////////////MONGODB//////////////////////////////////////////////////////




  export class ContactService {

   contactSelectedEvent = new EventEmitter<Contact>();
   contactListChangedEvent = new Subject<Contact[]>();

  contacts: Contact [] =[];
  maxContactId: number;
  constructor(private http: HttpClient) {
     this.maxContactId = this.getMaxId();
  }


  //Get List of contactss
 getContacts(): Contact[] {
  console.log('MONGO CONTACTS')
  this.http
    .get<{message: string, contacts: Contact[]}>(
      'http://localhost:3000/contacts'
    )
    .subscribe(
      // success method
      (response) => {
        this.contacts = response.contacts.sort();
        this.maxContactId = this.getMaxId();
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.log(error.message);
      }
    );
    
  return this.contacts.slice();
}

// storeContacts(){
//   let contactList = JSON.stringify(this.contacts);
//   //console.log(contactList)
//   this.http.put('https://cms-contacts-project-default-rtdb.firebaseio.com/contacts.json', contactList,
//   {
//      headers: new HttpHeaders({
//         "Content-Type": "application/json"
//      })
//   }).subscribe(
//      () =>{
//         this.contactListChangedEvent.next(this.contacts.slice());
//      }
//   )
//  }


  ///Might be right?????????
  getContact(id: string): Contact {
   return this.contacts.find((contact)=> contact.id === id)
  } 

  getContactbySender(selectedContact: Contact): Contact {
    return this.contacts.find((contact)=> contact.id === selectedContact.id)
   } 
 
 



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
// addContact(newContact: Contact) {
//    if (!newContact)
//       {
//          return;
//       }

//    this.maxContactId++
//    newContact.id = this.maxContactId.toString();
//    this.contacts.push(newContact);
//    let contactsListClone = this.contacts.slice()
//    //this.contactListChangedEvent.next(contactsListClone);
//    this.storeContacts();
// }

addContact(contact: Contact) {
        console.log('MONGO ADD CONTACTS');
        if (!contact) {
          return;
        }
    
        // make sure id of the new Document is empty
        contact.id = '';
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // add to database
        this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
          contact,
          { headers: headers })
          .subscribe(
            (responseData) => {
              // add new document to documents
              this.contacts.push(responseData.contact);
              this.sortAndSend();
            }
          );
      }

// The udpateContact() function is responsible for locating an existing Contact in the Contacts 
// list and replacing it with a new updated version of the same Contact.
// updateContact(originalContact: Contact, newContact: Contact) {
//    if (!originalContact  || !newContact)
//        {return;}


//    let pos = this.contacts.indexOf(originalContact)
//    if (pos < 0)
//       { return;}

//    newContact.id = originalContact.id;
//    this.contacts[pos] = newContact;
   

//    let contactsListClone = this.contacts.slice();
//    //this.contactListChangedEvent.next(contactsListClone);
//    this.storeContacts();
// }

 updateContact(originalContact: Contact, newContact: Contact) {
   console.log('MONGO UPDATE CONTACTS');
   if (!originalContact || !newContact) {
     return;
   }
 
   const pos = this.contacts.findIndex(d => d.id === originalContact.id);
   console.log(pos)
   if (pos < 0) {
     return;
   }
 
   // set the id of the new Document to the id of the old Document
   newContact.id = originalContact.id;
   //newDocument._id = originalDocument._id;
 
   const headers = new HttpHeaders({'Content-Type': 'application/json'});
 
   // update database
   this.http.put('http://localhost:3000/contacts/' + originalContact.id,
     newContact, { headers: headers })
     .subscribe(
       (response: Response) => {
         console.log(this.contacts[pos])
         this.contacts[pos] = newContact;
         this.sortAndSend();
       }
     );
 }

// The deleteContact() function is responsible for locating and 
// deleting the Contact passed to it from the Contacts list.
// deleteContact(contact: Contact) {
//    if (!contact) {
//              return;
//       }
//    let pos = this.contacts.indexOf(contact)
//        if (pos < 0) {
//        return;
//     }
//    this.contacts.splice(pos, 1)
//    let contactsListClone = this.contacts.slice()
//    //this.contactListChangedEvent.next(contactsListClone);
//    this.storeContacts();
// }
   deleteContact(contact: Contact) {
     console.log('MONGO DELETE Contacts');
     if (!contact) {
       return;
     }
 
     const pos = this.contacts.findIndex(c => c.id === contact.id);
 
     if (pos < 0) {
       return;
     }
 
     // delete from database
     this.http.delete('http://localhost:3000/contacts/' + contact.id)
       .subscribe(
         (response: Response) => {
           this.contacts.splice(pos, 1);
           this.sortAndSend();
         }
       );
   }

   sortAndSend() {
     this.contactListChangedEvent.next(this.contacts.slice());
   }

}

















//   export class DocumentService {
//    //Emitters
//    documentSelectedEvent = new EventEmitter<Document>();
//    //documentChangedEvent = new EventEmitter<Document[]>();
//    documentListChangedEvent = new Subject<Document[]>();
 
//    //Other Variables
//    maxDocumentId: number;
//    documents: Document[] = [];
 
//    constructor(private http: HttpClient) {
//      this.maxDocumentId = this.getMaxId();
//    }
 
  
//    getDocuments(): Document[] {
//      console.log('MONGO GET DOCUMENTS');
//      this.http
//        .get<{message: string, documents: Document[]}>(
//          'http://localhost:3000/documents'
//        )
//        .subscribe(
//          // success method
//          (response) => {
//            this.documents = response.documents.sort();
//            this.maxDocumentId = this.getMaxId();
//            this.documentListChangedEvent.next(this.documents.slice());
//          },
//          (error: any) => {
//            console.log(error.message);
//          }
//        );
 
//      return this.documents.slice();
//    }
  
 
 
//    //Return on Document
//    getDocument(id: string): Document {
//      for (const document of this.documents) {
//        if (document.id == id) {
//          return document;
//        }
//      }
//      return null;
//    }
 
//    getMaxId(): number {
//      let maxId = 0;
 
//      this.documents.forEach((document) => {
//        let currentId = parseInt(document.id);
//        if (currentId > maxId) {
//          maxId = currentId;
//        }
//      });
 
//      return maxId;
//    }
 
   
 
//    addDocument(document: Document) {
//      console.log('MONGO ADD DOCUMENTS');
//      if (!document) {
//        return;
//      }
 
//      // make sure id of the new Document is empty
//      document.id = '';
 
//      const headers = new HttpHeaders({'Content-Type': 'application/json'});
 
//      // add to database
//      this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
//        document,
//        { headers: headers })
//        .subscribe(
//          (responseData) => {
//            // add new document to documents
//            this.documents.push(responseData.document);
//            this.sortAndSend();
//          }
//        );
//    }
 
 
   
//  updateDocument(originalDocument: Document, newDocument: Document) {
//    console.log('MONGO UPDATE DOCUMENTS');
//    if (!originalDocument || !newDocument) {
//      return;
//    }
 
//    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
 
//    if (pos < 0) {
//      return;
//    }
 
//    // set the id of the new Document to the id of the old Document
//    newDocument.id = originalDocument.id;
//    //newDocument._id = originalDocument._id;
 
//    const headers = new HttpHeaders({'Content-Type': 'application/json'});
 
//    // update database
//    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
//      newDocument, { headers: headers })
//      .subscribe(
//        (response: Response) => {
//          this.documents[pos] = newDocument;
//          this.sortAndSend();
//        }
//      );
//  }
 
//    // The deleteDocument() function is responsible for locating and
//    // deleting the document passed to it from the documents list.
//    deleteDocument(document: Document) {
//      console.log('MONGO DELETE DOCUMENTS');
//      if (!document) {
//        return;
//      }
 
//      const pos = this.documents.findIndex(d => d.id === document.id);
 
//      if (pos < 0) {
//        return;
//      }
 
//      // delete from database
//      this.http.delete('http://localhost:3000/documents/' + document.id)
//        .subscribe(
//          (response: Response) => {
//            this.documents.splice(pos, 1);
//            this.sortAndSend();
//          }
//        );
//    }
 
 
//    sortAndSend() {
//      this.documentListChangedEvent.next(this.documents.slice());
//    }
//  }