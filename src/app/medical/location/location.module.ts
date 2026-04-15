import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { LocationListComponent } from './location-list/location-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationViewComponent } from './location-view/location-view.component';
import { ReusablesModule } from 'src/app/reusables/reusables.module';
import { LocationFormComponent } from './location-form/location-form.component';


@NgModule({ declarations: [
        LocationComponent,
        LocationListComponent,
        LocationViewComponent,
        LocationFormComponent
    ], imports: [CommonModule,
        LocationRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
        ReusablesModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class LocationModule { }
