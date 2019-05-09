import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from '../components/frame/homepage/homepage.component';
import {MembersListComponent} from '../components/frame/list/members-list/members-list.component';
import {MemberDetailsComponent} from '../components/frame/details/member-details/member-details.component';
import {InventoryListComponent} from '../components/frame/list/inventory-list/inventory-list.component';
import {ItemDetailComponent} from '../components/frame/details/item-detail/item-detail.component';
import {LentsListComponent} from '../components/frame/list/lents-list/lents-list.component';
import {LentDetailComponent} from '../components/frame/details/lent-detail/lent-detail.component';
import {MemberEditComponent} from '../components/frame/edit/member-edit/member-edit.component';
import {ItemEditComponent} from '../components/frame/edit/item-edit/item-edit.component';
import {LentEditComponent} from '../components/frame/edit/lent-edit/lent-edit.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: HomepageComponent},
  {path: 'members', component: MembersListComponent},
  {path: 'member/:id', component: MemberDetailsComponent},
  {path: 'member/edit/:id', component: MemberEditComponent},
  {path: 'inventory', component: InventoryListComponent},
  {path: 'item/:id', component: ItemDetailComponent},
  {path: 'item/edit/:id', component: ItemEditComponent},
  {path: 'lents', component: LentsListComponent},
  {path: 'lent/new', component: LentEditComponent},
  {path: 'lent/:id', component: LentDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
