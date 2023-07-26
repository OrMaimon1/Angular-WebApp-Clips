import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {

  pictureOrder = '1'
  constructor(private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: Params) => {
      this.pictureOrder = params.sort === '2' ? params.sort : '1'
    });
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

}
