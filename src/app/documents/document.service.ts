import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  //Emitters
  documentSelectedEvent = new EventEmitter<Document>();
  //documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  //Other Variables
  maxDocumentId: number;
  documents: Document[] = [];

  constructor(private http: HttpClient) {
    //this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  //Get List of documents
  getDocuments(): Document[] {
    console.log('MADE IT');
    this.http
      .get<Document[]>(
        'https://cms-contacts-project-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe(
        // success method
        (documents: Document[]) => {
          this.documents = documents.sort();
          this.maxDocumentId = this.getMaxId();
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.log(error.message);
        }
      );

    return this.documents.slice();
  }

  storeDocuments(){
   let documentList = JSON.stringify(this.documents);
   this.http.put('https://cms-contacts-project-default-rtdb.firebaseio.com/documents.json', documentList,
   {
      headers: new HttpHeaders({
         "Content-Type": "application/json"
      })
   }).subscribe(
      () =>{
         this.documentListChangedEvent.next(this.documents.slice());
      }
   )
  }

  //Return on Document
  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id == id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    this.documents.forEach((document) => {
      let currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  // The addDocument() function needs to generate a unique value for the id property of the new Document
  // object being added to the documents list and then push the new document on to the document list.
  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    this.storeDocuments();
    //this.documentListChangedEvent.next(documentsListClone);
  }

  // The udpateDocument() function is responsible for locating an existing document in the documents
  // list and replacing it with a new updated version of the same document.
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    //this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
  }

  // The deleteDocument() function is responsible for locating and
  // deleting the document passed to it from the documents list.
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    let pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    let documentsListClone = this.documents.slice();
    //this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
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
