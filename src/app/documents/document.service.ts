import {EventEmitter, Injectable} from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {

   //Emitters
    documentSelectedEvent = new EventEmitter<Document>();
    //documentChangedEvent = new EventEmitter<Document[]>();
    documentListChangedEvent = new Subject<Document[]>();

   //Other Variables
   maxDocumentId: number;
   documents: Document[] =[];

   constructor() {
      this.documents = MOCKDOCUMENTS;
      this.maxDocumentId = this.getMaxId();
   }

   //Get List of documents
   getDocuments(): Document[]{
    return this.documents.slice();
   }

   //Return on Document
   getDocument(id: string): Document {
    for(const document of this.documents){
        if(document.id == id)
        return document;
    }
    return null;
   } 

 getMaxId(): number {

   let maxId = 0

   this.documents.forEach(document => {
      let currentId = parseInt(document.id);
      if(currentId > maxId)
      {
         maxId = currentId;
      }
   });

   return maxId
}

// The addDocument() function needs to generate a unique value for the id property of the new Document 
// object being added to the documents list and then push the new document on to the document list.
addDocument(newDocument: Document) {
   if (!newDocument)
      {
         return;
      }

   this.maxDocumentId++
   newDocument.id = this.maxDocumentId.toString();
   this.documents.push(newDocument);
   let documentsListClone = this.documents.slice()
   this.documentListChangedEvent.next(documentsListClone);
}

// The udpateDocument() function is responsible for locating an existing document in the documents 
// list and replacing it with a new updated version of the same document.
updateDocument(originalDocument: Document, newDocument: Document) {
   if (!originalDocument  || !newDocument)
       return;


   let pos = this.documents.indexOf(originalDocument)
   if (pos < 0)
       return;

   newDocument.id = originalDocument.id;
   this.documents[pos] = newDocument;
   let documentsListClone = this.documents.slice();
   this.documentListChangedEvent.next(documentsListClone);
}

// The deleteDocument() function is responsible for locating and 
// deleting the document passed to it from the documents list.
deleteDocument(document: Document) {
   if (!document) {
             return;
      }
   let pos = this.documents.indexOf(document)
       if (pos < 0) {
       return;
    }
   this.documents.splice(pos, 1)
   let documentsListClone = this.documents.slice()
   this.documentListChangedEvent.next(documentsListClone);
}

//    deleteDocument(document: Document) {
//     if (!document) {
//        return;
//     }
//     const pos = this.documents.indexOf(document);
//     if (pos < 0) {
//        return;
//     }
//     this.documents.splice(pos, 1);
//     this.documentChangedEvent.emit(this.documents.slice());
    
//  }
}