import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pic',
  templateUrl: './pic.component.html',
  styleUrls: ['./pic.component.css']
})
export class PicComponent {
  id = ''

  constructor(public route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
  }
}
