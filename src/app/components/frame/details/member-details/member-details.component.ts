import {Component, OnInit} from '@angular/core';
import {MemberService} from '../../../../services/member.service';
import {ActivatedRoute} from '@angular/router';
import {Member} from '../../../../models/member';
import {GlobalSettings} from '../../../../models/GlobalSettings';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  member: Member;

  constructor(
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute,
    private globalSettings: GlobalSettings
  ) {
  }

  ngOnInit() {
    this.getMember();
  }

  getMember(): void {
    this.memberService.getMember(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe((member: Member) => this.member = member);
  }

}
