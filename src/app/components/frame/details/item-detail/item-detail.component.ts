import {Component, OnInit} from '@angular/core';
import {InventoryService} from '../../../../services/inventory.service';
import {GlobalSettings} from '../../../../models/GlobalSettings';
import {ActivatedRoute} from '@angular/router';
import {Item} from '../../../../models/item';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  item: Item;

  constructor(
    private inventoryService: InventoryService,
    private globalSettings: GlobalSettings,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getItem();
  }

  getItem(): void {
    this.inventoryService.getItem(+this.route.snapshot.paramMap.get('id')).subscribe((item: Item) => this.item = item);
  }

}
