import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalRoutingModule } from './medical-routing.module';
import { MedicalComponent } from './medical.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { PipesModule } from '../pipes/pipes.module';
import { ModalInstruccionesModule } from '../modales/modal-instrucciones.module';


@NgModule({
  declarations: [
    MedicalComponent,
  ],
  imports: [
    CommonModule,
    MedicalRoutingModule,
    SharedModule,
    CoreModule,
    PipesModule,
    ModalInstruccionesModule
  ]
})
export class MedicalModule { }
