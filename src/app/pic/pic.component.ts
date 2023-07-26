import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-pic',
  templateUrl: './pic.component.html',
  styleUrls: ['./pic.component.css']
})
export class PicComponent {
  id = ''

  constructor(public route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id
    })
  }
}
