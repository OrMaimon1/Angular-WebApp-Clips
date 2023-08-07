import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QuerySnapshot } from '@angular/fire/compat/firestore';
import IPic from '../models/pic.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, of, map, BehaviorSubject, combineLatest } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class PicService {
  public picsCollection: AngularFirestoreCollection<IPic>

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private storage: AngularFireStorage) {
    this.picsCollection = db.collection('pics')
  }

  createPics(data: IPic): Promise<DocumentReference<IPic>> {
    return this.picsCollection.add(data)
  }

  getUserPics(sort$: BehaviorSubject<string>) {
    return combineLatest([
      this.auth.user,
      sort$
    ]).pipe(
      switchMap(values => {
        const [user, sort] = values
        if (!user) {
          return of()
        }

        const query = this.picsCollection.ref.where(
          'uid', '==', user.uid
        ).orderBy('timestamp', sort === '1' ? 'desc' : 'asc')
        return query.get()
      }),
      map(snapshot => (snapshot as QuerySnapshot<IPic>).docs)
    )
  }

  updatePic(id: string, title: string) {
    return this.picsCollection.doc(id).update({
      title
    })
  }

  async deletePic(pic: IPic) {
    const picRef = this.storage.ref(`pic/${pic.fileName}`)
    await picRef.delete()
    await this.picsCollection.doc(pic.docID).delete()
  }
}
