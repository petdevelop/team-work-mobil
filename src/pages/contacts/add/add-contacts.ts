import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContactsService } from '../contacts.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AcctionType } from '../../../common/enum-types';

@Component({
  selector: 'add-contacts',
  templateUrl: 'add-contacts.html'
})
export class AddContactsPage {

  private form: FormGroup;
  private acctionType: string = AcctionType[AcctionType.Add];

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public contactsService: ContactsService,
      private formBuilder: FormBuilder) {
      
      this.form = this.formBuilder.group({
        key: [this.navParams.data.$key],
        firstName: [this.navParams.data.firstName, Validators.required],
        lastName: [this.navParams.data.lastName, Validators.required],
        type: [this.navParams.data.type, Validators.required]
      });

      if (Object.keys(this.navParams.data).length > 0) {
        this.acctionType = AcctionType[AcctionType.Edit];
      }
  }

  submitForm(): void {
    if (this.acctionType == AcctionType[AcctionType.Edit]) {
      this.contactsService.editContact(this.form.getRawValue());
      this.navCtrl.pop();
    } else {
      this.contactsService.addContact(this.form.getRawValue());
      this.form.reset();
    }

  }

}
