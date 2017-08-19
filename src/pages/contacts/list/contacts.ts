import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContactsService } from '../contacts.service';
import { AddContactsPage } from '../add/add-contacts';
import { DetailContactsPage } from '../detail/detail-contacts';

@Component({
  selector: 'list-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  private persons: any[];
  addContactsPage = AddContactsPage;
  detailContactsPage = DetailContactsPage;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public contactsService: ContactsService) {
      
  }

  ionViewDidLoad() {
    this.contactsService.getContacts()
      .subscribe(persons => {
        this.persons = persons;

        // console.log(this.persons);
      });
  }

  deleteContact(key: string): void {
    this.contactsService.deleteContact(key);
  } 

}
