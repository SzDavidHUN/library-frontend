import {Member} from './member';
import {Item} from './item';

export class Lent {
  id: number;
  member: Member;
  item: Item;
  date: Date;
  status: string;
}
