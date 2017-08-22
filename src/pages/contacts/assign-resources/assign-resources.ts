import { Component } from '@angular/core';
import { NavParams, ViewController} from 'ionic-angular';
import { ResourcesService } from '../../resources/resources.service';

@Component({
  selector: 'assign-resources',
  templateUrl: 'assign-resources.html'
})
export class AssignResources {
  availableResources = [];
  endDate = null;
  minDate = null;
  maxDate = null;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private resourcesService: ResourcesService) {

  }
  
  ionViewDidLoad() {
    // create data
    this.resourcesService.getAvailableResources(this.params.data.contactKey)
      .subscribe(availableResources => {
        this.availableResources = availableResources.map(item => {
          item.active = false;
          return item;
        });
      });

    // calculate min and max date
    let date = new Date();

    this.minDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    ).toISOString();

    this.maxDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 31
    ).toISOString();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submit() {
    let data = {
      'endDate' : this.endDate.toString(),
      'checkeds' : this.availableResources.map(item => item.active ? item.$key : null).filter(item => item)
    };
    
    this.resourcesService.assignResource(data, this.params.data.contactKey);
    this.dismiss();
  }

  disableSubmit(): boolean {
    if (! this.endDate || this.availableResources.filter(item => item.active).length == 0) {
      return true;
    }
    return false;
  }

}