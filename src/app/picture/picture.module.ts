import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PictureRoutingModule } from './picture-routing.module';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';


@NgModule({
  declarations: [
    ManageComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    PictureRoutingModule
  ]
})
export class PictureModule { }
