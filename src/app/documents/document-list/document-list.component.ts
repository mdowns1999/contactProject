import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents : Document[] = [
    new Document('1', 'Tim', 'WDD 430 Assignment', 'www.google.com', null),
    new Document('2', 'Ben', 'WDD 330 Quiz', 'www.google.com', null),
    new Document('3', 'Anna', 'WDD 230 Project', 'www.google.com', null),
    new Document('4', 'Katie', 'WDD 130 Quiz', 'www.google.com', null)
  ]

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }
}
