import { Injectable } from '@angular/core';
import { Repair } from '../interfaces/repair';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RepairsService {

  constructor(private db: AngularFirestore) { }
  private collectionName = 'repairs';

  getRepairs(): Observable<firebase.firestore.QuerySnapshot>{
    return this.db.collection<Repair>(this.collectionName,ref => ref.orderBy('desc',"asc")).get();
  }
  saveRepair(client:Repair){
    return this.db.collection(this.collectionName).add(client);
  }
  editRepairFragment(id: string, obj:Object){
    return this.db.collection(this.collectionName).doc(id).update(obj);
  }
  deleteRepair(id: string){
    return this.db.collection(this.collectionName).doc(id).delete();
  }
}
