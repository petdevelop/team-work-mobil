import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class ContactsService {

  static readonly assignmentPaths: string = '/assignments';
  static readonly resourcePaths: string = '/resources';
  static readonly personPaths: string = '/persons';

  constructor(private db: AngularFireDatabase) { }

  assignResource(popUpResult: any, personKey: string): void {
    let itemObservable: FirebaseListObservable<any> = this.db.list(ContactsService.assignmentPaths);
    itemObservable.push({
      'personKey' : personKey,
      'startDate' : (new Date()).toString(),
      'endDate' : popUpResult.endDate.toString(),
      'resourceKeys' : popUpResult.checkeds
    });
  }

  pickUpResource(assignmentKey: string): void {
    let itemObservable: FirebaseListObservable<any> = this.db.list(ContactsService.assignmentPaths);
    itemObservable.update(assignmentKey, {'pickedUp': new Date()});
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

  getAvailableResources(personKey): Observable<any> {
    return this.db.list('/resources')
      .map(resources => {

        return this.db.list('/assignments')
          .map(assignments => {
            // get the list of unavailable resources
            let unAvailableResourceKeys: any[] = [];
            assignments.forEach(element => {

              if (! element.pickedUp) {
                unAvailableResourceKeys = unAvailableResourceKeys.concat(element.resourceKeys);
              }
              
              resources = resources.filter(e => unAvailableResourceKeys.indexOf(e.$key) == -1);
              
              // check if the resource was previously borrowed
              if (element.personKey == personKey) {
                resources = resources.map(resource => {
                  if (element.resourceKeys.filter(e => e == resource.$key).length > 0) {
                    resource.borrowed = true;
                  }
                  return resource;
                });
              }
            });

            return resources;
          });
      });

  }

  addContact(data): void {
    console.log(data);
    
    // let itemObservable: FirebaseListObservable<any> = this.db.list('/persons');
    // itemObservable.push(data);
  }

}
