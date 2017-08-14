import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ResourcesPage } from '../resources/list/resources';
import { ContactsPage } from '../contacts/list/contacts';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ResourcesPage;
  tab3Root = ContactsPage;

  constructor() {

  }
}
