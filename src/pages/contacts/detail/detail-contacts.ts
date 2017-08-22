import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ContactsService } from '../contacts.service';
import { AssignResources } from '../assign-resources/assign-resources';

@Component({
  selector: 'detail-contacts',
  templateUrl: 'detail-contacts.html'
})
export class DetailContactsPage {
  private contact: object = {};
  @ViewChild('fab') fab; 

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public contactsService: ContactsService,
      public alertCtrl: AlertController,
      public modalCtrl: ModalController,
    ) {
  }

  ionViewDidLoad() {
    this.contactsService.getContact(this.navParams.data)
      .subscribe(contact => {
          this.contact = contact;
      }); 
  }

  showConfirm(assignmentKey: string) {
    let confirm = this.alertCtrl.create({
      message: 'Are you sure you want to remove this assignment?',
      buttons: [{
          text: 'Cancel',
        }, {
          text: 'Ok',
          handler: () => {
            this.contactsService.pickUpResource(assignmentKey);
          }
        }]
    });
    confirm.present();
  }

  showAssignResource(contactKey: string) {
    let assignResourcesModal = this.modalCtrl.create(AssignResources, { 'contactKey': contactKey });
    assignResourcesModal.present();

    this.fab.close();
  }

}
