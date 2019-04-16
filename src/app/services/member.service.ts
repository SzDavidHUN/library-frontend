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
}
