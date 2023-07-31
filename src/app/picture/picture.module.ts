import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PictureRoutingModule } from './picture-routing.module';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ManageComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    PictureRoutingModule,
    SharedModule,
  ]
})
export class PictureModule { }
