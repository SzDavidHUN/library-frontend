import {Component, OnInit} from '@angular/core';
import {GlobalSettings} from '../../../../models/GlobalSettings';
import {Lent} from '../../../../models/lent';
import {LentService} from '../../../../services/lent.service';
import {LentObservable} from '../../../../models/lentObservable';
import {Member} from '../../../../models/member';
import {Item} from '../../../../models/item';

@Component({
  selector: 'app-lents-list',
  templateUrl: './lents-list.component.html',
  styleUrls: ['./lents-list.component.css']
})
export class LentsListComponent implements OnInit {

  lents: Lent[] = [];
  maxDaysOfLent = 30;
  currDate: Date = new Date();

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
        this.lents.push({
          id: lentObservable.id,
          status: lentObservable.status,
          date: lentObservable.date,
          member: {id: -1, name: '', address: '', phone: '', picn: '', status: 'Loading'},
          item: {id: -1, title: '', author: '', status: '', type: '', date: ''}
        });
        lentObservable.member.subscribe((subscribedMember: Member) => this.lents[index].member = subscribedMember);
        lentObservable.item.subscribe((subscribedItem: Item) => this.lents[index].item = subscribedItem);
      });
    });
  }

}
