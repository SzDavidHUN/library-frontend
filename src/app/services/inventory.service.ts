import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Item} from '../models/item';
import {Lent} from '../models/lent';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private http: HttpClient
  ) {
  }

  private apiUrl = 'http://localhost:3000/db/inventory/';

  static getEmptyItem(): Item {
    return {
      id: -1,
      title: '',
      author: '',
      type: '',
      status: '',
      date: '',
      lent: -1
    };
  }

  getAllItems(): Observable<Item[]> {
    // return of(INVENTORY);
    return this.http.get<Item[]>(this.apiUrl);
  }

  getLentableItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl + 'all/status/In');
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(this.apiUrl + id);
  }

  saveItemAsync(item: Item): Observable<object> {
    return this.http.put(this.apiUrl + item.id, item);
  }

  saveItemSync(item: Item): void {
    this.saveItemAsync(item).subscribe();
  }

  discardItemSync(id: number): void {
    this.getItem(id).subscribe((item: Item) => {
      item.status = 'Discarded';
      this.saveItemSync(item);
    });
  }

  lentItem(item: Item, lent: Lent): void {
    item.status = 'Out';
    item.lent = lent.id;
    this.saveItemSync(item);
  }

  unlentItem(item: Item): void {
    item.status = 'In';
    // item.lent = -1;
    this.saveItemSync(item);
  }
}
