import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Plant } from './plant-model';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

// interface NewPlant {
//   name: string;
//   latinName; string;
//   hearts: 0;
//   time: number;
// }

@Injectable()
export class PlantService {

  plantsCollection: AngularFirestoreCollection<Plant>;
  plantDocument:   AngularFirestoreDocument<Node>;

  constructor(private afs: AngularFirestore) {
    this.plantsCollection = this.afs.collection('plants', (ref) => ref.orderBy('time', 'desc').limit(6));
  }

  getData(): Observable<Plant[]> {
    return this.plantsCollection.valueChanges();
  }

  getSnapshot(): Observable<Plant[]> {
    // ['added', 'modified', 'removed']
    return this.plantsCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Plant;
        return { 
          id: a.payload.doc.id, 
          name: data.name, 
          latinName: data.latinName, 
          hearts: data.hearts, 
          time: data.time,
          layer: data.layer,
          height: data.height,
          width: data.width,
          minHardinessZone: data.minHardinessZone,
          maxHardinessZone: data.maxHardinessZone,
          edible: data.edible,
          light: data.light };
      });
    });
  }

  getPlant(id: string) {
    return this.afs.doc<Plant>(`plants/${id}`);
  }

  create(newPlant: Plant) {
    const plant: Plant = {
      name: newPlant.name,
      latinName: newPlant.latinName,
      hearts: 0,
      time: new Date().getTime(),

      layer: newPlant.layer,
      height: 10,
      width: 5,
      minHardinessZone: 4,
      maxHardinessZone: 8,
      edible: true,
      light: newPlant.light
    };
    return this.plantsCollection.add(plant);
  }

  updatePlant(id: string, data: Partial<Plant>) {
    return this.getPlant(id).update(data);
  }

  deletePlant(id: string) {
    return this.getPlant(id).delete();
  }
}
