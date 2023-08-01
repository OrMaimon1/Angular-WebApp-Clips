import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';
import { last, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { PicService } from 'src/app/services/pic.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
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

  constructor(private storage: AngularFireStorage, private auth: AngularFireAuth, private picService: PicService) {
    auth.user.subscribe(user => this.user = user)
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
    const task = this.storage.upload(picPath, this.file)
    const PicRef = this.storage.ref(picPath)

    task.percentageChanges().subscribe(progress => {
      this.precentage = progress as number / 100
    })

    task.snapshotChanges().pipe(
      last(),
      switchMap(() => PicRef.getDownloadURL())
    ).subscribe({
      next: (url) => {
        const pic = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value,
          fileName: `${picFileName}.jpg`,
          url
        }
        this.picService.createPics(pic)

        this.alertColor = 'green'
        this.alertMsg = 'Success'
        this.showPrecent = false
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
