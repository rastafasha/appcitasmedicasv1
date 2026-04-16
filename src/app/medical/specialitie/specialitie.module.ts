import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialitieRoutingModule } from './specialitie-routing.module';
import { SpecialitieComponent } from './specialitie.component';
import { ListSpecialitieComponent } from './list-specialitie/list-specialitie.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListPatientSpecialitiesComponent } from './list-patient-specialities/list-patient-specialities.component';
import { SpecialitieNComponent } from './specialitie-n/specialitie-n.component';
import { ReusablesModule } from '../../reusables/reusables.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({ declarations: [
        SpecialitieComponent,
        SpecialitieNComponent,
        ListSpecialitieComponent,
        ListPatientSpecialitiesComponent
    ], imports: [CommonModule,
        SpecialitieRoutingModule,
        // 
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
        ReusablesModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class SpecialitieModule { }
