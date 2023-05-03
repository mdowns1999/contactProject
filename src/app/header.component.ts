import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  selectedFeatureEvent = new EventEmitter<string>();

  onSelected(selectedEvent:string){
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
