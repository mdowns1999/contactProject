import { Component, OnInit } from '@angular/core';
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

         if(this.originalContact['group'])
         {
          this.groupContacts = this.originalContact['group'];
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
    }
  
   this.editMode = false;
    this.router.navigate(['/contacts']);
  }
}
