import {Injectable} from '@angular/core';
import {LentObservable} from '../models/lentObservable';
import {HttpClient} from '@angular/common/http';
import {LentRaw} from '../models/lentRaw';
import {MemberService} from './member.service';
import {InventoryService} from './inventory.service';
import {Observable} from 'rxjs';
import {Lent} from '../models/lent';
import {Member} from '../models/member';
import {Item} from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class LentService {

  private apiUrl = 'http://localhost:3000/db/lents/';

  constructor(
    private memberService: MemberService,
    private inventoryService: InventoryService,
    private httpClient: HttpClient
  ) {
  }

  getLentCustom(customUrlExtension: string): Observable<LentObservable> {
    let observableLentObservable: Observable<LentObservable>;
    observableLentObservable = new Observable<LentObservable>((observer) => {
      this.httpClient.get<LentRaw>(this.apiUrl + customUrlExtension).subscribe((lentRaw: LentRaw) => {
        observer.next(this.toLentObservable(lentRaw));
        observer.complete();
      });
    });
    return observableLentObservable;
  }


  getLents(customUrlExtension: string): Observable<LentObservable[]> {
    let observableLentObservable: Observable<LentObservable[]>;
    observableLentObservable = new Observable<LentObservable[]>((observer) => {
      this.httpClient.get<LentRaw[]>(this.apiUrl + customUrlExtension).subscribe((lentRaws: LentRaw[]) => {
        observer.next(this.toLents(lentRaws));
        observer.complete();
      });
    });
    return observableLentObservable;
  }

  getAllLents(): Observable<LentObservable[]> {
    return this.getLents('');
  }

  getActiveLents(): Observable<LentObservable[]> {
    return this.getLents('all/status/Active');
  }

  getLent(id: number): Observable<LentObservable> {
    let observableLentObservable: Observable<LentObservable>;
    observableLentObservable = new Observable<LentObservable>((observer) => {
      this.httpClient.get<LentRaw>(this.apiUrl + id).subscribe((lentRaw: LentRaw) => {
        observer.next(this.toLentObservable(lentRaw));
        observer.complete();
      });
    });
    return observableLentObservable;
  }

  toLentObservable(lentraw: LentRaw): LentObservable {
    return {
      id: lentraw.id,
      item: this.inventoryService.getItem(lentraw.item),
      member: this.memberService.getMember(lentraw.member),
      date: new Date(lentraw.date),
      status: lentraw.status
    };
  }

  toLent(lentObservable: LentObservable): Lent {
    return {
      id: lentObservable.id,
      status: lentObservable.status,
      item: this.inventoryService.getEmptyItem(),
      member: this.memberService.getEmptyMember(),
      date: lentObservable.date
    };
  }

  toLents(lentraws: LentRaw[]): LentObservable[] {
    const lents: LentObservable[] = [];
    lentraws.forEach((lentraw: LentRaw) => lents.push(this.toLentObservable(lentraw)));
    return lents;
  }

  getLentsByMemberID(id: number): Observable<number> {
    return new Observable(subscriber => {
      this.httpClient.get(this.apiUrl + 'all/member/' + id.toString()).subscribe((obj: object[]) => {
        subscriber.next(obj.length);
        subscriber.complete();
      });
    });
  }

  getLentsByItemID(id: number): Observable<LentObservable> {
    return this.getLentCustom('all/item/' + id.toString());
  }

  saveLentAsync(lent: Lent): Observable<LentRaw> {
    const lentRaw: LentRaw = {
      id: lent.id,
      member: lent.member.id,
      item: lent.item.id,
      date: lent.date.toUTCString(),
      status: lent.status
    };
    return this.httpClient.put<LentRaw>(this.apiUrl + lent.id.toString(), lentRaw);
  }

  saveLentSync(lent: Lent): void {
    this.saveLentAsync(lent).subscribe();
  }

  saveNewLentSync(member: Member, item: Item): void {
    const lent: Lent = {
      member,
      item,
      id: -1,
      date: new Date(),
      status: 'Active'
    };
    this.saveLentAsync(lent).subscribe((lentRaw: LentRaw) => {
      lent.id = lentRaw.id;
      this.inventoryService.lentItem(item);
      this.memberService.addLent(member, lent);
    });
  }

  unlent(lent: Lent) {
    lent.status = 'Returned';
    this.saveLentSync(lent);
    this.inventoryService.unlentItem(lent.item);
    this.memberService.removeLent(lent);
  }
}
