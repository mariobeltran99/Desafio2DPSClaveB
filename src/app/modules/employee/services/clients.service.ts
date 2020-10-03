import { Injectable } from '@angular/core';
import { Client } from '../interfaces/client';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private db: AngularFirestore) { }
  private collectionName = 'clients';

  getClients(): Observable<firebase.firestore.QuerySnapshot>{
    return this.db.collection<Client>(this.collectionName).get();
  }
  saveClient(client:Client){
    return this.db.collection(this.collectionName).add(client);
  }
  editClientFragment(id: string, obj:Object){
    return this.db.collection(this.collectionName).doc(id).update(obj);
  }
  deleteClient(id: string){
    return this.db.collection(this.collectionName).doc(id).delete();
  }
  getExistsDUI(dui:string): Observable<firebase.firestore.QuerySnapshot>{
    return this.db.collection<Client>(this.collectionName,ref => ref.where('dui','==',dui)).get();
  }
}
