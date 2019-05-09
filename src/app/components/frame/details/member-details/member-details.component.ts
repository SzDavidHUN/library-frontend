import {Component, OnInit} from '@angular/core';
import {MemberService} from '../../../../services/member.service';
import {ActivatedRoute} from '@angular/router';
import {Member} from '../../../../models/member';
import {GlobalSettings} from '../../../../models/globalSettings';
import {Item} from '../../../../models/item';
import {InventoryService} from '../../../../services/inventory.service';
import {LentService} from '../../../../services/lent.service';
import {Lent} from '../../../../models/lent';
import {LentObservable} from '../../../../models/lentObservable';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  member: Member;
  lents: Lent[] = [];
  currDate: Date = new Date();

  constructor(
    private memberService: MemberService,
    private inventoryService: InventoryService,
    private activatedRoute: ActivatedRoute,
    private globalSettings: GlobalSettings,
    private lentService: LentService
  ) {
  }

  ngOnInit() {
    this.getMember();
  }

  getMember(): void {
    this.memberService.getMember(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe((member: Member) => {
      this.member = member;
      this.member.lents.forEach((id: number) => {
        this.lentService.getLent(id).subscribe((lentObservable: LentObservable) => {
          const lent: Lent = LentService.toLent(lentObservable);
          lentObservable.item.subscribe((item: Item) => lent.item = item);
          this.lents.push(lent);
        });
      });
    });
  }

}
