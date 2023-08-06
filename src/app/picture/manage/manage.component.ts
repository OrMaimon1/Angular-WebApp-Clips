import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PicService } from 'src/app/services/pic.service';
import IPic from 'src/app/models/pic.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {

  pictureOrder = '1'
  pics: IPic[] = []
  activePic: IPic | null = null
  constructor(private router: Router, private route: ActivatedRoute, private picService: PicService, private modal: ModalService) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: Params) => {
      this.pictureOrder = params.sort === '2' ? params.sort : '1'
    })
    this.picService.getUserPics().subscribe(docs => {
      this.pics = []

      docs.forEach(doc => {
        this.pics.push({
          docID: doc.id,
          ...doc.data()
        })
      })
    })
  }

  sort(event: Event) {
    const { value } = (event.target as HTMLSelectElement)

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value
      }
    })
  }

  openModal($event: Event, pic: IPic) {
    $event.preventDefault()
    this.activePic = pic
    this.modal.toggleModal('editPic')
  }
}
