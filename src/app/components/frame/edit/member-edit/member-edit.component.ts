import {Component, OnInit} from '@angular/core';
import {GlobalSettings} from '../../../../models/globalSettings';
import {MemberService} from '../../../../services/member.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Member} from '../../../../models/member';
import {Location} from '@angular/common';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  member: Member;
  new: boolean;

  constructor(
    private globalSettings: GlobalSettings,
    private memberService: MemberService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') === 'new') {
      this.new = true;
      this.member = this.memberService.getEmptyMember();
    } else {
      this.getMember();
      this.new = false;
    }
  }

  save(): void {
    this.memberService.saveMemberObservable(this.member).subscribe(
      () => {
      },
      () => {
      },
      () => this.router.navigate(['/members']));
  }

  private getMember() {
    this.memberService.getMember(+this.route.snapshot.paramMap.get('id')).subscribe((member: Member) => this.member = member);
  }
}
