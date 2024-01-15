import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicidadRoutingModule } from './publicidad-routing.module';
import { PublicidadComponent } from './publicidad.component';
import { PublicidadListComponent } from './publicidad-list/publicidad-list.component';
import { PublicidadEditComponent } from './publicidad-edit/publicidad-edit.component';
import { PublicidadAddComponent } from './publicidad-add/publicidad-add.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PublicidadComponent,
    PublicidadListComponent,
    PublicidadEditComponent,
    PublicidadAddComponent,
  ],
  exports: [
    PublicidadComponent,
    PublicidadListComponent,
    PublicidadEditComponent,
    PublicidadAddComponent,
  ],
  imports: [
    CommonModule,
    PublicidadRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class PublicidadModule { }
