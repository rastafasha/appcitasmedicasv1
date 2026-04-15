import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentPayRoutingModule } from './appointment-pay-routing.module';
import { AppointmentPayComponent } from './appointment-pay.component';
import { ListAppoimentPayComponent } from './list-appoiment-pay/list-appoiment-pay.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListAppoimentCobrosComponent } from './list-appoiment-cobros/list-appoiment-cobros.component';
import { ReusablesModule } from 'src/app/reusables/reusables.module';
import { ModalInstruccionesModule } from 'src/app/modales/modal-instrucciones.module';


@NgModule({ declarations: [
        AppointmentPayComponent,
        ListAppoimentPayComponent,
        ListAppoimentCobrosComponent,
    ],
    exports: [
        AppointmentPayComponent,
        ListAppoimentPayComponent,
        ListAppoimentCobrosComponent,
    ], imports: [CommonModule,
        AppointmentPayRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
        ReusablesModule,
        ModalInstruccionesModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppointmentPayModule { }
