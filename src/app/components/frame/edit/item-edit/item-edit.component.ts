import {Component, OnInit} from '@angular/core';
import {GlobalSettings} from '../../../../models/globalSettings';
import {InventoryService} from '../../../../services/inventory.service';
import {Item} from '../../../../models/item';
import {ActivatedRoute} from '@angular/router';
import {formatDate, Location} from '@angular/common';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

  item: Item;
  new: boolean;
  currDate: Date = new Date();

  constructor(
    private globalSettings: GlobalSettings,
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') === 'new') {
      this.new = true;
      this.item = {
        id: -1,
        title: '',
        author: '',
        type: '',
        date: '',
        status: 'In'
      };
    } else {
      this.new = false;
      this.getItem();
    }
  }

  getItem(): void {
    this.inventoryService.getItem(+this.route.snapshot.paramMap.get('id')).subscribe((item: Item) => this.item = item);
  }

  saveItem(): void {
    this.inventoryService.saveItemSync(this.item);
  }

  setCurrentDate() {
    this.item.date = formatDate(this.currDate, 'yyyy. MM. dd.', 'en');
  }
}
