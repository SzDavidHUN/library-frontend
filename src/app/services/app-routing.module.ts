import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from '../components/frame/homepage/homepage.component';
import {MembersListComponent} from '../components/frame/list/members-list/members-list.component';
import {MemberDetailsComponent} from '../components/frame/details/member-details/member-details.component';
import {InventoryListComponent} from '../components/frame/list/inventory-list/inventory-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: HomepageComponent},
  {path: 'members', component: MembersListComponent},
  {path: 'member/:id', component: MemberDetailsComponent},
  {path: 'inventory', component: InventoryListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
