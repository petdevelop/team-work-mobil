import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactsPage } from './list/contacts';
import { AddContactsPage } from './add/add-contacts';
import { ContactsService } from './contacts.service';
import { DetailContactsPage } from './detail/detail-contacts';

@NgModule({
  declarations: [
    ContactsPage,
    AddContactsPage,
    DetailContactsPage
  ],
  imports: [
    IonicPageModule.forChild(ContactsPage),
    IonicPageModule.forChild(AddContactsPage),
    IonicPageModule.forChild(DetailContactsPage)
  ],
  entryComponents: [
    ContactsPage,
    AddContactsPage,
    DetailContactsPage
  ],
  providers: [ContactsService]
})
export class ContactsPageModule {}
