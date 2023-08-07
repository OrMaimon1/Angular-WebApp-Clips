import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import IPic from 'src/app/models/pic.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PicService } from 'src/app/services/pic.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activePic: IPic | null = null

  constructor(private modal: ModalService, private picService: PicService) { }

  inSubmission = false
  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please wait! Picture is updating'
  @Output() update = new EventEmitter()

  picID = new FormControl('', {
    nonNullable: true
  })
  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  })
  editForm = new FormGroup({
    title: this.title,
    id: this.picID
  })

  ngOnInit(): void {
    this.modal.register('editPic')
  }

  ngOnDestroy(): void {
    this.modal.unregister('editPic')
  }

  ngOnChanges(): void {
    if (!this.activePic) {
      return
    }
    this.inSubmission = false
    this.showAlert = false
    this.picID.setValue(this.activePic.docID || '')
    this.title.setValue(this.activePic.title)
  }

  async submit() {
    if (!this.activePic) {
      return
    }
    this.inSubmission = true
    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMsg = 'Please wait! Picture is updating'
    try {
      await this.picService.updatePic(this.picID.value, this.title.value)
    }
    catch (e) {
      this.inSubmission = false
      this.alertColor = 'red'
      this.alertMsg = 'something went wrong. PLease try again later'
      return
    }
    this.activePic.title = this.title.value
    this.update.emit(this.activePic)
    this.inSubmission = false
    this.alertColor = 'green'
    this.alertMsg = 'Success!'

  }
}
