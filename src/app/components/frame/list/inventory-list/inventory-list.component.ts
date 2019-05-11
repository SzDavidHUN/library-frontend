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
  itemidFilter: string;
  titleFilter: string;
  authorFilter: string;

  constructor(
    private inventoryService: InventoryService,
    private globalSettings: GlobalSettings
  ) {
  }

  ngOnInit() {
    this.getItems();
    this.itemidFilter = '';
    this.titleFilter = '';
    this.authorFilter = '';
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
      return (
        (this.itemidFilter === '' ? true : item.id === (+this.itemidFilter)) &&
        (this.titleFilter === '' ? true : item.title.includes(this.titleFilter)) &&
        (this.authorFilter === '' ? true : item.author.includes(this.authorFilter))
      ) && ((this.showAvailable ? item.status === 'In' : false) ||
        (this.showLented ? item.status === 'Out' : false) ||
        (this.showDiscarded ? item.status === 'Discarded' : false));
    });
  }

  discardItem(id: number) {
    this.inventoryService.discardItemSync(id);
  }
}
