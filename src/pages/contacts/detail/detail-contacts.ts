import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'detail-contacts',
  templateUrl: 'detail-contacts.html'
})
export class DetailContactsPage {
  private contact: object = {};

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public contactsService: ContactsService) {
  }

  ionViewDidLoad() {
    this.contactsService.getContact(this.navParams.data) 
      .subscribe((contact) => {
          this.contact = contact;
          console.log(this.contact);
      }); 
  }

}
