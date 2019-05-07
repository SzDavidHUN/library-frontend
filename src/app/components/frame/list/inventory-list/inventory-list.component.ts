import {Component, OnInit} from '@angular/core';
import {InventoryService} from '../../../../services/inventory.service';
import {Item} from '../../../../models/item';
import {GlobalSettings} from '../../../../models/globalSettings';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  allItems: Item[];
  items: Item[];
  showDiscarded: boolean;
  showAvailable = true;
  showLented: boolean;

  constructor(
    private inventoryService: InventoryService,
    private globalSettings: GlobalSettings
  ) {
  }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.inventoryService.getAllItems().subscribe((items: Item[]) => this.allItems = items,
      () => {
      },
      () => this.updateFilter()
    );
  }

  changeAvailable(): void {
    this.showAvailable = !this.showAvailable;
    this.updateFilter();
  }

  changeLented(): void {
    this.showLented = !this.showLented;
    this.updateFilter();
  }

  changeDiscarded(): void {
    this.showDiscarded = !this.showDiscarded;
    this.updateFilter();
  }

  updateFilter(): void {
    this.items = this.allItems.filter((item: Item) => {
      return (this.showAvailable ? item.status === 'In' : false) ||
        (this.showLented ? item.status === 'Out' : false) ||
        (this.showDiscarded ? item.status === 'Discarded' : false);
    });
  }

  discardItem(id: number) {

  }
}
