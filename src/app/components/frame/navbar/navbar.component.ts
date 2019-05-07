import {Component, OnInit} from '@angular/core';
import {GlobalSettings} from '../../../models/globalSettings';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private globalSettings: GlobalSettings
  ) {
  }

  ngOnInit() {
  }

  switchTheme() {
    this.globalSettings.darkmode = !this.globalSettings.darkmode;
  }

}
