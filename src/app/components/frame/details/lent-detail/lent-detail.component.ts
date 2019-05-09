import {Component, OnInit} from '@angular/core';
import {LentService} from '../../../../services/lent.service';
import {GlobalSettings} from '../../../../models/globalSettings';
import {Lent} from '../../../../models/lent';
import {ActivatedRoute} from '@angular/router';
import {LentObservable} from '../../../../models/lentObservable';
import {Item} from '../../../../models/item';
import {Member} from '../../../../models/member';
import {MemberService} from '../../../../services/member.service';
import {InventoryService} from '../../../../services/inventory.service';

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
        member: MemberService.getEmptyMember(),
        item: InventoryService.getEmptyItem()
      };
      lentObservable.item.subscribe((item: Item) => this.lent.item = item);
      lentObservable.member.subscribe((member: Member) => this.lent.member = member);
    });
  }

  unlent(): void {
    this.lentService.unlent(this.lent);
  }
}
