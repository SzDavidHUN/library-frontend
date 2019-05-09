import {Component, OnInit} from '@angular/core';
import {InventoryService} from '../../../../services/inventory.service';
import {GlobalSettings} from '../../../../models/globalSettings';
import {ActivatedRoute} from '@angular/router';
import {Item} from '../../../../models/item';
import {Member} from '../../../../models/member';
import {LentService} from '../../../../services/lent.service';
import {LentObservable} from '../../../../models/lentObservable';
import {Lent} from '../../../../models/lent';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  item: Item;
  lent: Lent;
  currDate: Date = new Date();

  constructor(
    private inventoryService: InventoryService,
    private globalSettings: GlobalSettings,
    private route: ActivatedRoute,
    private lentService: LentService
  ) {
  }

  ngOnInit() {
    this.getItem();
  }

  getItem(): void {
    this.inventoryService.getItem(+this.route.snapshot.paramMap.get('id')).subscribe((item: Item) => {
      this.item = item;
      if (item.status === 'Out') {
        this.lentService.getLent(item.lent).subscribe((lentObservable: LentObservable) => {
          this.lent = LentService.toLent(lentObservable);
          lentObservable.member.subscribe((member: Member) => this.lent.member = member);
        });
      }
    });
  }

}
