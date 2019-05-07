import {Component, OnInit} from '@angular/core';
import {LentService} from '../../../../services/lent.service';
import {GlobalSettings} from '../../../../models/globalSettings';
import {Lent} from '../../../../models/lent';
import {ActivatedRoute} from '@angular/router';
import {LentObservable} from '../../../../models/lentObservable';
import {Item} from '../../../../models/item';
import {Member} from '../../../../models/member';

@Component({
  selector: 'app-lent-detail',
  templateUrl: './lent-detail.component.html',
  styleUrls: ['./lent-detail.component.css']
})
export class LentDetailComponent implements OnInit {

  lent: Lent;
  currDate: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private lentService: LentService,
    private globalSettings: GlobalSettings
  ) {
  }

  ngOnInit() {
    this.getLent();
  }

  getLent(): void {
    this.lentService.getLent(+this.route.snapshot.paramMap.get('id')).subscribe((lentObservable: LentObservable) => {
      this.lent = {
        id: lentObservable.id,
        date: lentObservable.date,
        status: lentObservable.status,
        member: {id: -1, name: '', address: '', phone: '', picn: '', status: 'Loading'},
        item: {id: -1, title: '', author: '', status: '', type: '', date: ''}
      };
      lentObservable.item.subscribe((item: Item) => this.lent.item = item);
      lentObservable.member.subscribe((member: Member) => this.lent.member = member);
    });
  }

}
