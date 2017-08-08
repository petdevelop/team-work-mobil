import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactsPage } from './list/contacts';
import { AddContactsPage } from './add/add-contacts';
import { ContactsService } from './contacts.service';

@NgModule({
  declarations: [
    ContactsPage,
    AddContactsPage
  ],
  imports: [
    IonicPageModule.forChild(ContactsPage),
    IonicPageModule.forChild(AddContactsPage)
  ],
  entryComponents: [
    ContactsPage,
    AddContactsPage
  ],
  providers: [ContactsService]
})
export class ContactsPageModule {}
