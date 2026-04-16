import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';
import { ListAppointmentsComponent } from './list-appointments/list-appointments.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AtencionMedicaComponent } from './atencion-medica/atencion-medica.component';
import { ListDocComponent } from './list-doc/list-doc.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { ReusablesModule } from '../../reusables/reusables.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({ declarations: [
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
        RouterModule,
        SharedModule,
        ReusablesModule
    ], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppointmentModule { }
