import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';

@Injectable()
export class ContactsService {

  constructor(private db: AngularFireDatabase) { }

  assignResource(popUpResult: any, personKey: string): void {
    let itemObservable: FirebaseListObservable<any> = this.db.list(environment.dbKeys.assignmentPaths);
    itemObservable.push({
      'personKey' : personKey,
      'startDate' : (new Date()).toString(),
      'endDate' : popUpResult.endDate.toString(),
      'resourceKeys' : popUpResult.checkeds
    });
  }

  getContacts(): Observable<any> {
    return this.db.list(environment.dbKeys.personPaths)
      .map(persons => {

        this.db.list(environment.dbKeys.assignmentPaths)
          .subscribe(assignments => {

            this.db.list(environment.dbKeys.resourcePaths)
              .subscribe(resources => {
                // iterate over persons
                persons.forEach(person => {
                  // add to persons the assignments array only for actual data
                  person.assignments = assignments.filter(item => item.personKey == person.$key && !item.pickedUp);
                  // iterate over assignment
                  person.assignments.forEach(assignment => {
                    // adding resources to assignments
                    assignment.resources = [];
                    assignment.isReady = false;
                    // calculate pick up is ready  
                    let endDate = new Date(assignment.endDate);
                    let today = new Date();

                    if (endDate <= today) {
                      assignment.isReady = true;
                    }
                    // concat to person.assignments.resources
                    assignment.resourceKeys.forEach(resourceKey => {
                      assignment.resources = assignment.resources.concat(resources.filter(resource => resource.$key == resourceKey));
                    });
                  });  
                });  
              });
          }); 
      
      return persons;
    });
  }

  addContact(data): void {
    let itemObservable: FirebaseListObservable<any> = this.db.list(environment.dbKeys.personPaths);
    itemObservable.push(data);
  }

  editContact(data): void {
    let itemObservable: FirebaseListObservable<any> = this.db.list(environment.dbKeys.personPaths);
    itemObservable.update(data.key, data);
  }

  deleteContact(key: string): void {
    let itemObservable: FirebaseListObservable<any> = this.db.list(environment.dbKeys.personPaths);
    itemObservable.remove(key);
  }

  getContact(contactKey: string): Observable<Object> {
    return this.getContacts()
      .map(contacts => contacts.filter(contact => contact.$key == contactKey)[0])
  }

  pickUpResource(assignmentKey: string): void {
    let itemObservable: FirebaseListObservable<any> = this.db.list(environment.dbKeys.assignmentPaths);
    itemObservable.update(assignmentKey, {'pickedUp': new Date()});
  }

}
