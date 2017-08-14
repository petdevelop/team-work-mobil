import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResourcesPage } from './list/resources';
import { AddResourcesPage } from './add/add-resources';
import { ResourcesService } from './resources.service';

@NgModule({
  declarations: [
    ResourcesPage,
    AddResourcesPage
  ],
  imports: [
    IonicPageModule.forChild(ResourcesPage),
    IonicPageModule.forChild(AddResourcesPage)
  ],
  entryComponents: [
    ResourcesPage,
    AddResourcesPage
  ],
  providers: [ResourcesService]
})
export class ResourcesPageModule {}
