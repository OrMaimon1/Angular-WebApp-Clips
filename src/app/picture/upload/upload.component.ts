import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';
import { last, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { PicService } from 'src/app/services/pic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy {
  isDragover = false
  nextStep = false
  file: File | null = null
  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Plaese wait! your Picture is uploading'
  inSubmission = false
  precentage = 0
  showPrecent = false
  user: firebase.User | null = null
  task?: AngularFireUploadTask

  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  })
  uploadForm = new FormGroup({
    title: this.title
  })

  constructor(private storage: AngularFireStorage, private auth: AngularFireAuth, private picService: PicService, private router: Router) {
    auth.user.subscribe(user => this.user = user)
  }

  ngOnDestroy(): void {
    this.task?.cancel()
  }

  storeFile($event: Event) {
    this.isDragover = false

    this.file = ($event as DragEvent).dataTransfer ?
      ($event as DragEvent).dataTransfer?.files.item(0) ?? null :
      ($event.target as HTMLInputElement).files?.item(0) ?? null
    if (!this.file || this.file.type !== 'image/jpeg') {
      return
    }
    this.title.setValue(this.file.name)
    this.nextStep = true
  }

  uploadFile() {
    this.uploadForm.disable()
    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMsg = 'Plaese wait! your Picture is uploading'
    this.inSubmission = true
    this.showPrecent = true

    const picFileName = uuid()
    const picPath = `pic/${picFileName}.jpg`
    this.task = this.storage.upload(picPath, this.file)
    const PicRef = this.storage.ref(picPath)

    this.task.percentageChanges().subscribe(progress => {
      this.precentage = progress as number / 100
    })

    this.task.snapshotChanges().pipe(
      last(),
      switchMap(() => PicRef.getDownloadURL())
    ).subscribe({
      next: async (url) => {
        const pic = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value,
          fileName: `${picFileName}.jpg`,
          url,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        const picDocRef = await this.picService.createPics(pic)

        this.alertColor = 'green'
        this.alertMsg = 'Success'
        this.showPrecent = false

        setTimeout(() => {
          this.router.navigate([
            'pic', picDocRef.id
          ])
        }, 1000)
      },
      error: (error) => {
        this.uploadForm.enable()
        this.alertColor = 'red'
        this.alertMsg = 'Upload Failed!'
        this.inSubmission = true
        this.showPrecent = false
        console.log(error)
      }

    })
  }
}
