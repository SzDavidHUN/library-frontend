import {Component, OnInit} from '@angular/core';
import {GlobalSettings} from '../../../../models/globalSettings';
import {MemberService} from '../../../../services/member.service';
import {InventoryService} from '../../../../services/inventory.service';
import {LentService} from '../../../../services/lent.service';
import {Member} from '../../../../models/member';
import {Item} from '../../../../models/item';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lent-edit',
  templateUrl: './lent-edit.component.html',
  styleUrls: ['./lent-edit.component.css']
})
export class LentEditComponent implements OnInit {

  members: Member[];
  allMembers: Member[];
  items: Item[];
  allItems: Item[];
  selectedMember: Member;
  selectedItem: Item;
  countOfLentsOfSelectedMember: number;

  memberidFilter = '';
  nameFilter = '';

  itemidFilter = '';
  titleFilter = '';
  authorFilter = '';

  constructor(
    private globalSettings: GlobalSettings,
    private memberService: MemberService,
    private inventoryService: InventoryService,
    private lentService: LentService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getMembers();
    this.getItems();
  }

  selectMember(member: Member) {
    this.selectedMember = member;
    this.lentService.getLentsByMemberID(member.id).subscribe((count: number) => this.countOfLentsOfSelectedMember = count);
  }

  unselectMember() {
    this.selectedMember = undefined;
  }

  selectItem(item: Item) {
    this.selectedItem = item;
  }

  unselectItem(): void {
    this.selectedItem = undefined;
  }

  save(): void {
    this.lentService.saveNewLentSync(this.selectedMember, this.selectedItem);
  }

  updateMemberFilter(): void {
    this.members = this.allMembers.filter((member: Member) => {
      return (this.memberidFilter === '' ? true : member.id === (+this.memberidFilter)) &&
        (this.nameFilter === '' ? true : member.name.includes(this.nameFilter));
    });

  }

  updateInventoryFilter(): void {
    this.items = this.allItems.filter((item: Item) => {
      return (
        (this.itemidFilter === '' ? true : item.id === (+this.itemidFilter)) &&
        (this.titleFilter === '' ? true : item.title.includes(this.titleFilter)) &&
        (this.authorFilter === '' ? true : item.author.includes(this.authorFilter))
      );
    });

  }

  private getMembers(): void {
    this.memberService.getMembers().subscribe((members: Member[]) => {
      this.allMembers = members.filter((member: Member) => member.status === 'active');
      this.updateMemberFilter();
    });
  }

  private getItems(): void {
    this.inventoryService.getLentableItems().subscribe((items: Item[]) => {
      this.allItems = items;
      this.updateInventoryFilter();
    });
  }

}
