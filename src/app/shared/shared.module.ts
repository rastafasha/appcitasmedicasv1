import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapModule } from './ngx-bootstrap/ngx-bootstrap.module';
import { CountUpModule } from 'ngx-countup';
import { NgApexchartsModule } from "ng-apexcharts";
import { NgCircleProgressModule } from 'ng-circle-progress';
import { materialModule } from './material.module';
import { NgxEditorModule } from 'ngx-editor';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data/data.service';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../common-component/header/header.component';
import { SidebarComponent } from '../common-component/sidebar/sidebar.component';
import { BackButtnComponent } from '../reusables/backButtn/backButtn.component';
import { SkeletonLoaderComponent } from '../reusables/skeleton-loader/skeleton-loader.component';
import { LoaderAnimComponent } from '../reusables/loader-anim/loader-anim.component';
import { BreadcumsComponent } from '../reusables/breadcums/breadcums.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BackButtnComponent,
    SkeletonLoaderComponent,
    LoaderAnimComponent,
    BreadcumsComponent
  ],
  imports: [
    CommonModule,
    NgxBootstrapModule,
    CountUpModule,
    NgApexchartsModule,
    NgCircleProgressModule.forRoot({
      "radius": 40,
      "space": -10,
      "outerStrokeWidth": 10,
      "innerStrokeWidth": 10,
      "animationDuration": 1000,
      "clockwise": false,
      "startFromZero": false,
      "lazy": false,
      "outerStrokeLinecap":"square",
      "showSubtitle": false,
      "showTitle" : false,
      "showUnits" : false,
      "showBackground" : false
    }),
    SlickCarouselModule,
    materialModule,
    NgxEditorModule,
    FullCalendarModule,
    HttpClientModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    NgxBootstrapModule,
    CountUpModule,
    NgApexchartsModule,
    NgCircleProgressModule,
    SlickCarouselModule,
    materialModule,
    NgxEditorModule,
    FullCalendarModule,
    HttpClientModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    BackButtnComponent,
    SkeletonLoaderComponent,
    LoaderAnimComponent,
    BreadcumsComponent
  ],
  providers: [
    DataService,
  ]
})
export class SharedModule { }
