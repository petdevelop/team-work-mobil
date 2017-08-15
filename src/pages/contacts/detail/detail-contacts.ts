import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'detail-contacts',
  templateUrl: 'detail-contacts.html'
})
export class DetailContactsPage {

  private assignments: any[];

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
            this.assignments = data.assignments;
          });
        });
      });



    this.contactsService.getContact('-Kr4-pA3ycs7DOU0iZzU') 
     .subscribe((data) => {
         console.log(data);
     }); 
  }

}
