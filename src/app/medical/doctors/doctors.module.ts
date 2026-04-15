import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsComponent } from './doctors.component';
import { ListDoctorComponent } from './list-doctor/list-doctor.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileDoctorComponent } from './profile-doctor/profile-doctor.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ReusablesModule } from 'src/app/reusables/reusables.module';
import { DoctorsFormComponent } from './doctors-form/doctors-form.component';


@NgModule({ declarations: [
        DoctorsComponent,
        ListDoctorComponent,
        ProfileDoctorComponent,
        DoctorsFormComponent
    ],
    exports: [
        DoctorsComponent,
        ListDoctorComponent,
        ProfileDoctorComponent,
        DoctorsFormComponent
    ], imports: [CommonModule,
        DoctorsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
        PipesModule,
        ReusablesModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class DoctorsModule { }
