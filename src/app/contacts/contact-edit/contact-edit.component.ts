import { Component, OnInit} from '@angular/core';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  errorMessage: string;
  
  constructor(
       private contactService: ContactService,
       private router: Router,
       private route: ActivatedRoute) {
       }


  ngOnInit(): void {
    this.route.params.subscribe (
      (params: Params) => {
         this.id = params['id'];
         if(!this.id)
         {
          this.editMode = false
          return
         }
  
         this.originalContact = this.contactService.getContact(this.id);
    
         if(!this.originalContact){
          return;
         }
  
         this.editMode = true;
         this.contact = JSON.parse(JSON.stringify(this.originalContact));


         if(this.originalContact.group && this.originalContact.group.length > 0)
         {
          console.log("Made it")
          this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
         }


    }) 
  }


  onCancel(){
    this.router.navigate(['/contacts']);
  }

  onSubmit(form: NgForm){
    let value = form.value // get values from form’s fields
    let newContact = new Contact(value.id,
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      value.group
      )
   
    if (this.editMode == true){
      console.log("EDIT CONTACT!")
      this.contactService.updateContact(this.originalContact, newContact);
      this.editMode = false;
    }
     
    else {
      console.log("ADD CONTACT!")
      this.contactService.addContact(newContact);
      this.editMode = false;
    }
  
   //this.editMode = false;
    this.router.navigate(['/contacts']);
  }


  
isInvalidContact(newContact: Contact) {
  if (!newContact) {// newContact has no value
    return true;
  }
  if (this.contact && newContact.id === this.contact.id) {
     return true;
  }
  for (let i = 0; i < this.groupContacts.length; i++){
     if (newContact.id === this.groupContacts[i].id) {
       return true;
    }
  }
  return false;
}


addToGroup($event: any) {
  const selectedContact: Contact = $event.dragData;
  const invalidGroupContact = this.isInvalidContact(selectedContact);
  if (invalidGroupContact) {
    this.errorMessage = 'Contact can not be added to the group. It is already in the group or is the current contact';
    return;
  }
  this.groupContacts.push(selectedContact);
}


onRemoveItem(index: number) {
  if (index < 0 || index >= this.groupContacts.length) {
     return;
  }
  this.groupContacts.splice(index, 1);
}


}
