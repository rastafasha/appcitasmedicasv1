import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialitieComponent } from './specialitie.component';
import { ListSpecialitieComponent } from './list-specialitie/list-specialitie.component';
import { ListPatientSpecialitiesComponent } from './list-patient-specialities/list-patient-specialities.component';
import { SpecialitieNComponent } from './specialitie-n/specialitie-n.component';

const routes: Routes = [{
  path:'',
  component: SpecialitieComponent,
  children:[
    {
      path: 'register',
      component: SpecialitieNComponent
    },
    {
      path: 'list',
      component: ListSpecialitieComponent
    },
    {
      path: 'list/edit/:id',
      component: SpecialitieNComponent
    },
    {
      path: 'list-specialities',
      component: ListPatientSpecialitiesComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialitieRoutingModule { }
