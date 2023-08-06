import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QuerySnapshot } from '@angular/fire/compat/firestore';
import IPic from '../models/pic.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PicService {
  public picsCollection: AngularFirestoreCollection<IPic>

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.picsCollection = db.collection('pics')
  }

  createPics(data: IPic): Promise<DocumentReference<IPic>> {
    return this.picsCollection.add(data)
  }

  getUserPics() {
    return this.auth.user.pipe(
      switchMap(user => {
        if (!user) {
          return of()
        }

        const query = this.picsCollection.ref.where(
          'uid', '==', user.uid
        )
        return query.get()
      }),
      map(snapshot => (snapshot as QuerySnapshot<IPic>).docs)
    )
  }
}
