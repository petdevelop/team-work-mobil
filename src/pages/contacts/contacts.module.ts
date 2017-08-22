import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactsPage } from './list/contacts';
import { AddContactsPage } from './add/add-contacts';
import { ContactsService } from './contacts.service';
import { DetailContactsPage } from './detail/detail-contacts';
import { AssignResources } from './assign-resources/assign-resources';

@NgModule({
  declarations: [
    ContactsPage,
    AddContactsPage,
    DetailContactsPage,
    AssignResources
  ],
  imports: [
    IonicPageModule.forChild(ContactsPage),
    IonicPageModule.forChild(AddContactsPage),
    IonicPageModule.forChild(DetailContactsPage),
    IonicPageModule.forChild(AssignResources)
  ],
  entryComponents: [
    ContactsPage,
    AddContactsPage,
    DetailContactsPage,
    AssignResources
  ],
  providers: [ContactsService]
})
export class ContactsPageModule {}
