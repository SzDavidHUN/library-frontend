import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from '../components/frame/homepage/homepage.component';
import {MembersListComponent} from '../components/frame/list/members-list/members-list.component';
import {MemberDetailsComponent} from '../components/frame/details/member-details/member-details.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: HomepageComponent},
  {path: 'members', component: MembersListComponent},
  {path: 'member/:id', component: MemberDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
