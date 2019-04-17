import {Component, OnInit} from '@angular/core';
import {MemberService} from '../../../../services/member.service';
import {Member} from '../../../../models/member';
import {GlobalSettings} from '../../../../models/GlobalSettings';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  members: Member[];

  constructor(
    private memberService: MemberService,
    private globalSettings: GlobalSettings
  ) {
  }

  ngOnInit() {
    this.getMembers();
  }

  getMembers(): void {
    this.memberService.getMembers().subscribe((members: Member[]) => this.members = members);
  }

  removeMember(id: number): void {
  }
}
