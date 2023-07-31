import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';

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

  constructor(private storage: AngularFireStorage) { }

  storeFile($event: Event) {
    this.isDragover = false

    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null
    if (!this.file || this.file.type !== 'image/jpeg') {
      return
    }
    this.title.setValue(this.file.name)
    this.nextStep = true
  }

  uploadFile() {
    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMsg = 'Plaese wait! your Picture is uploading'
    this.inSubmission = true

    const picFileName = uuid()
    const picPath = `pic/${picFileName}.jpg`
    this.storage.upload(picPath, this.file)
  }

}
