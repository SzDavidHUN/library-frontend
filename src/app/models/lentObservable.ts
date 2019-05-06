import {Member} from './member';
import {Item} from './item';
import {Observable} from 'rxjs';

export class LentObservable {
  id: number;
  member: Observable<Member>;
  item: Observable<Item>;
  date: Date;
  status: string;
}
