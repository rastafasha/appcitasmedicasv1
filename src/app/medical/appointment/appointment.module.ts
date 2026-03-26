import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';
import { ListAppointmentsComponent } from './list-appointments/list-appointments.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AtencionMedicaComponent } from './atencion-medica/atencion-medica.component';
import { ListDocComponent } from './list-doc/list-doc.component';
import { ReusablesModule } from 'src/app/reusables/reusables.module';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';


@NgModule({
  declarations: [
    AppointmentComponent,
    ListAppointmentsComponent,
    AtencionMedicaComponent,
    ListDocComponent,
    AppointmentFormComponent
  ],
  exports: [
    AppointmentComponent,
    ListAppointmentsComponent,
    AtencionMedicaComponent,
    ListDocComponent,
    AppointmentFormComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    ReusablesModule
  ]
})
export class AppointmentModule { }
