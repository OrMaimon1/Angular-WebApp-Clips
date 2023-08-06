import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import IPic from 'src/app/models/pic.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  @Input() activePic: IPic | null = null
  constructor(private modal: ModalService) { }

  ngOnInit(): void {
    this.modal.register('editPic')
  }

  ngOnDestroy(): void {
    this.modal.unregister('editPic')
  }
}
