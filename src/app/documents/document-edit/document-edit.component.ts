import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: string;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) {

}

// this.route.params
// .subscribe(
//   (params: Params) => {
//     this.id = params['id'];
//     this.contact = this.contactService.getContact(this.id);
//   })
ngOnInit() {
  this.route.params.subscribe (
    (params: Params) => {
       this.id = params['id'];
       if(!this.id)
       {
        this.editMode = false
        return
       }

       this.originalDocument = this.documentService.getDocument(this.id)
  
       if(!this.originalDocument){
        return;
       }

       this.editMode = true;
       this. document = JSON.parse(JSON.stringify(this.originalDocument));
  }) 
}

onSubmit(form: NgForm) {
  let value = form.value // get values from form’s fields
  let newDocument = new Document(value.id, 
    value.name, 
    value.description,
    value.url, 
    value.children)
 
  if (this.editMode == true){
    this.documentService.updateDocument(this.originalDocument, newDocument);
    this.editMode = false;
  }
   
  else {
    this.documentService.addDocument(newDocument);
  }

 this.editMode = false;
  this.router.navigate(['/documents']);
}

  onCancel(){
    this.router.navigate(['/documents']);
  }
}
