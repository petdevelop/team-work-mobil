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

  getData(): Observable<any> {
    
    return this.db.list('/persons')
      .map(persons => {

        return this.db.list('/assignments')
          .map(assignments => {

            return this.db.list('/resources')
              .map(resources => {
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

                return {
                  'persons': persons,
                  'assignments': assignments,
                  'resources': resources
                };            
              });

          }); 

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

  getContacts(): Observable<object[]> {
    let persons: object[] = [];
    this.getData()
      .subscribe((data) => {
        data.subscribe((data) => {
          data.subscribe((data) => {
            data.persons.forEach(person => {
              persons.push(person);
            })
          });
        });
      });

    return Observable.of(persons);
  }
  
  getContact(contactKey: string): Observable<object> {
    let contact: object = {};
    this.getData()
      .subscribe((data) => {
        data.subscribe((data) => {
          data.subscribe((data) => {
            data.persons.forEach(_contact => {
              if (_contact.$key == contactKey) {
                Object.assign(contact, _contact);
              }
            })
          });
        });
      });

    return Observable.of(contact);
  }

}
