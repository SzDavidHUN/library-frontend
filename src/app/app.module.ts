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
import {InventoryListComponent} from './components/frame/list/inventory-list/inventory-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GlobalSettings} from './models/globalSettings';
import {ItemDetailComponent} from './components/frame/details/item-detail/item-detail.component';
import {LentsListComponent} from './components/frame/list/lents-list/lents-list.component';
import {LentDetailComponent} from './components/frame/details/lent-detail/lent-detail.component';
import {MemberEditComponent} from './components/frame/edit/member-edit/member-edit.component';
import {ItemEditComponent} from './components/frame/edit/item-edit/item-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    MembersListComponent,
    MemberDetailsComponent,
    InventoryListComponent,
    ItemDetailComponent,
    LentsListComponent,
    LentDetailComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [GlobalSettings],
  bootstrap: [AppComponent]
})
export class AppModule {
}
