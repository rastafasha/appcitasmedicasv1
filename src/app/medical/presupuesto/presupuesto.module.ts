import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresupuestoComponent } from './presupuesto.component';
import { PresupuestoListaComponent } from './presupuesto-lista/presupuesto-lista.component';
import { PresupuestoEditarComponent } from './presupuesto-editar/presupuesto-editar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PresupuestoRoutingModule } from './presupuesto-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PresupuestoDoctorListComponent } from './presupuesto-doctor-list/presupuesto-doctor-list.component';
import { ReusablesModule } from 'src/app/reusables/reusables.module';



@NgModule({
  declarations: [
    PresupuestoComponent,
    PresupuestoListaComponent,
    PresupuestoEditarComponent,
    PresupuestoDoctorListComponent
  ],
  imports: [
    CommonModule,
    PresupuestoRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        SharedModule,
        ReusablesModule,
        PipesModule
  ]
})
export class PresupuestoModule { }
