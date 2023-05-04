import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contactApp';
  selectedFeature = 'documents';

  switchView(selectedFeature: string){
    this.selectedFeature = selectedFeature;
  }
}
