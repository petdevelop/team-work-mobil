import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ResourcesService } from '../resources.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AcctionType } from '../../../common/enum-types';

/**
 * Generated class for the ResourcesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'add-resources',
  templateUrl: 'add-resources.html'
})
export class AddResourcesPage {

  private form: FormGroup;
  private acctionType: string = AcctionType[AcctionType.Add];

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public ResourcesService: ResourcesService,
      private formBuilder: FormBuilder) {
      
      this.form = this.formBuilder.group({
        key: [this.navParams.data.$key],
        name: [this.navParams.data.name, Validators.required],
        author: [this.navParams.data.author, Validators.required],
        type: [this.navParams.data.type, Validators.required]
      });

      if (Object.keys(this.navParams.data).length > 0) {
        this.acctionType = AcctionType[AcctionType.Edit];
      }
  }

  submitForm(): void {
    if (this.acctionType == AcctionType[AcctionType.Edit]) {
      this.ResourcesService.editResource(this.form.getRawValue());
      this.navCtrl.pop();
    } else {
      this.ResourcesService.addResource(this.form.getRawValue());
      this.form.reset();
    }
  }

}
