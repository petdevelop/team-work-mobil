import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContactsService } from '../contacts.service';
import { AddContactsPage } from '../add/add-contacts';

/**
 * Generated class for the ContactsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'list-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  private persons: any[];
  addContactsPage = AddContactsPage;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public contactsService: ContactsService) {
      
  }

  ionViewDidLoad() {
    this.contactsService.getData()
      .subscribe((data) => {
        data.subscribe((data) => {
          data.subscribe((data) => {
            this.persons = data.persons;
          });
        });
      });
  }

  deleteContact(key: string): void {
    this.contactsService.deleteContact(key);
  } 

}
