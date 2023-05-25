import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {

  documents : Document[] = [];
  documentId: string = '';

  constructor(private documentService: DocumentService){}

  ngOnInit(){
    this.documents = this.documentService.getDocuments();
  }

}
