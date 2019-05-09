import {Component, OnInit} from '@angular/core';
import {MemberService} from '../../../../services/member.service';
import {Member} from '../../../../models/member';
import {GlobalSettings} from '../../../../models/globalSettings';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  allMembers: Member[];
  members: Member[];
  name: string;
  showRemoved: boolean;

  constructor(
    private memberService: MemberService,
    private globalSettings: GlobalSettings
  ) {
  }

  ngOnInit() {
    this.getMembers();
  }

  getMembers(): void {
    this.name = '';
    this.showRemoved = false;
    this.memberService.getMembers().subscribe((members: Member[]) => this.allMembers = members, () => {
    }, () => this.updateFilter());
  }

  removeMember(id: number): void {
    this.memberService.removeMemberSync(id);
  }

  updateFilter(): void {
    this.members = this.allMembers.filter((member: Member) => {
      return (this.name === '' ? true : member.name.includes(this.name)) &&
        (this.showRemoved ? true : member.status !== 'Removed');
    });
  }

  changeRemoved(): void {
    this.showRemoved = !this.showRemoved;
    this.updateFilter();
  }
}
