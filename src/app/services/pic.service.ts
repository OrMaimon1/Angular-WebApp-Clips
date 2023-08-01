import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IPic from '../models/pic.model';

@Injectable({
  providedIn: 'root'
})
export class PicService {
  public picsCollection: AngularFirestoreCollection<IPic>

  constructor(private db: AngularFirestore) {
    this.picsCollection = db.collection('pics')
  }

  async createPics(data: IPic) {
    await this.picsCollection.add(data)
  }
}
