import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Member} from '../models/member';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private apiUrl = 'http://localhost:3000/db/members/';

  constructor(
    private http: HttpClient
  ) {
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
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

}
