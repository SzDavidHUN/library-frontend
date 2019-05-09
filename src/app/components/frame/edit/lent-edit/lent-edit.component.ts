import {Component, OnInit} from '@angular/core';
import {GlobalSettings} from '../../../../models/globalSettings';
import {MemberService} from '../../../../services/member.service';
import {InventoryService} from '../../../../services/inventory.service';
import {LentService} from '../../../../services/lent.service';
import {Member} from '../../../../models/member';
import {Item} from '../../../../models/item';

@Component({
  selector: 'app-lent-edit',
  templateUrl: './lent-edit.component.html',
  styleUrls: ['./lent-edit.component.css']
})
export class LentEditComponent implements OnInit {

  members: Member[];
  items: Item[];
  selectedMember: Member;
  selectedItem: Item;
  countOfLentsOfSelectedMember: number;

  constructor(
    private globalSettings: GlobalSettings,
    private memberService: MemberService,
    private inventoryService: InventoryService,
    private lentService: LentService
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

  private getMembers(): void {
    this.memberService.getMembers().subscribe((members: Member[]) =>
      this.members = members.filter((member: Member) => member.status === 'active'));
  }

  private getItems(): void {
    this.inventoryService.getLentableItems().subscribe((items: Item[]) => this.items = items);
  }
}
