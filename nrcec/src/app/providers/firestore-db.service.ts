import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDbService {

  constructor(private db: AngularFirestore) { }

  getProductList(){
    return this.db.collection('product').valueChanges();
  }
}
