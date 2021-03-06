import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Member} from '../models/member';
import {HttpClient} from '@angular/common/http';
import {Lent} from '../models/lent';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private apiUrl = 'http://localhost:3000/db/members/';

  constructor(
    private http: HttpClient
  ) {
  }

  static getEmptyMember(): Member {
    return {id: -1, name: '', address: '', phone: '', picn: '', status: 'active', lents: []};
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  getActiveMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl + 'all/status/active');
  }

  getMember(id: number): Observable<Member> {
    return this.http.get<Member>(this.apiUrl + id.toString());
  }

  saveMemberObservable(member: Member): Observable<object> {
    return this.http.put(this.apiUrl + member.id, member);
  }

  saveMemberSync(member: Member): void {
    this.saveMemberObservable(member).subscribe();
  }

  removeMemberSync(id: number): void {
    this.getMember(id).subscribe((member: Member) => {
      member.status = 'Removed';
      this.saveMemberSync(member);
    });
  }

  addLent(member: Member, lent: Lent): void {
    member.lents.push(lent.id);
    this.saveMemberSync(member);
  }

  removeLent(lent: Lent) {
    lent.member.lents.splice(lent.member.lents.indexOf(lent.id), 1);
    this.saveMemberSync(lent.member);
  }
}
