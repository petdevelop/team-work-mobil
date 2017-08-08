import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContactsService } from '../contacts.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the ContactsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'add-contacts',
  templateUrl: 'add-contacts.html'
})
export class AddContactsPage {

  private form: FormGroup;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public contactsService: ContactsService,
      private formBuilder: FormBuilder) {
      
      this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        type: ['', Validators.required]
      });
  }

  submitForm(): void {
    // this.contactsService.addContact();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

}
