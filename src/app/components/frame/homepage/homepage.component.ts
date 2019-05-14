import {Component, OnInit} from '@angular/core';
import {GlobalSettings} from '../../../models/globalSettings';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    private globalSettings: GlobalSettings
  ) {
  }

  ngOnInit() {
  }

}
