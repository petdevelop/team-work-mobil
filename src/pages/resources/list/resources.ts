import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ResourcesService } from '../resources.service';
import { AddResourcesPage } from '../add/add-resources';

/**
 * Generated class for the ResourcesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'list-resources',
  templateUrl: 'resources.html',
})
export class ResourcesPage {

  private resources: Object[];
  addResourcesPage = AddResourcesPage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ResourcesService: ResourcesService) {
  }

  ionViewDidLoad() {
    this.ResourcesService.getResources()
      .subscribe(resources => this.resources = resources);
  }

  deleteResource(key: string): void {
    this.ResourcesService.deleteResource(key);
  }

}
