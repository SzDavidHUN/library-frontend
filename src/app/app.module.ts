import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/frame/navbar/navbar.component';
import {HomepageComponent} from './components/frame/homepage/homepage.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './services/app-routing.module';
import {MembersListComponent} from './components/frame/list/members-list/members-list.component';
import {HttpClientModule} from '@angular/common/http';
import {MemberDetailsComponent} from './components/frame/details/member-details/member-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    MembersListComponent,
    MemberDetailsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
