import {Component, OnInit} from '@angular/core';
import {GlobalSettings} from '../../../../models/globalSettings';
import {Lent} from '../../../../models/lent';
import {LentService} from '../../../../services/lent.service';
import {LentObservable} from '../../../../models/lentObservable';
import {Member} from '../../../../models/member';
import {Item} from '../../../../models/item';
import {MemberService} from '../../../../services/member.service';
import {InventoryService} from '../../../../services/inventory.service';

@Component({
  selector: 'app-lents-list',
  templateUrl: './lents-list.component.html',
  styleUrls: ['./lents-list.component.css']
})
export class LentsListComponent implements OnInit {

  lents: Lent[] = [];
  allLents: Lent[] = [];
  maxDaysOfLent = 30;
  currDate: Date = new Date();

  showIntime = true;
  showLate = true;
  showReturned = false;

  titleFilter = '';
  authorFilter = '';
  memberFilter = '';

  constructor(
    private globalSettings: GlobalSettings,
    private lentService: LentService
  ) {
  }

  ngOnInit() {
    this.getLents();
  }

  getLents(): void {
    this.lentService.getAllLents().subscribe((lentObservables: LentObservable[]) => {
      lentObservables.forEach((lentObservable: LentObservable, index: number) => {
        this.allLents.push({
          id: lentObservable.id,
          status: lentObservable.status,
          date: lentObservable.date,
          member: MemberService.getEmptyMember(),
          item: InventoryService.getEmptyItem()
        });
        lentObservable.member.subscribe((subscribedMember: Member) => {
          this.allLents[index].member = subscribedMember;
          this.updateFilter();
        });
        lentObservable.item.subscribe((subscribedItem: Item) => {
          this.allLents[index].item = subscribedItem;
          this.updateFilter();
        });
        // Ha az első oldalbetöltéskor hiba lép fel, akkor a két observable lefutása után meg kell hívni az updateFiler() metódust
      });
    });
  }

  changeIntime(): void {
    this.showIntime = !this.showIntime;
    this.updateFilter();
  }

  changeLate(): void {
    this.showLate = !this.showLate;
    this.updateFilter();
  }

  changeReturned(): void {
    this.showReturned = !this.showReturned;
    this.updateFilter();
  }

  updateFilter(): void {
    this.lents = this.allLents.filter((lent: Lent) => {
      return (
        (this.titleFilter === '' ? true : lent.item.title.includes(this.titleFilter)) &&
        (this.authorFilter === '' ? true : lent.item.author.includes(this.authorFilter)) &&
        (this.memberFilter === '' ? true : lent.member.name.includes(this.memberFilter))
      ) && ((this.showIntime ? this.isInTime(lent) && lent.status === 'Active' : false) ||
        (this.showLate ? (!this.isInTime(lent) && lent.status === 'Active') : false) ||
        (this.showReturned ? lent.status === 'Returned' : false));
    });

  }

  isInTime(lent: Lent): boolean {
    return +((this.currDate.valueOf() - lent.date.valueOf()) / 86400000).toFixed(0) < this.maxDaysOfLent;
  }

}
