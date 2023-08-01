import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import IPic from '../models/pic.model';

@Injectable({
  providedIn: 'root'
})
export class PicService {
  public picsCollection: AngularFirestoreCollection<IPic>

  constructor(private db: AngularFirestore) {
    this.picsCollection = db.collection('pics')
  }

  createPics(data: IPic): Promise<DocumentReference<IPic>> {
    return this.picsCollection.add(data)
  }
}
