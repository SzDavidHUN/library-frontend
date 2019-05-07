import {Component} from '@angular/core';
import {GlobalSettings} from './models/globalSettings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'library-frontend';

  constructor(
    private globalSettings: GlobalSettings
  ) {

  }
}
