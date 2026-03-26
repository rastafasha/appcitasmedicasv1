import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { ListStaffNComponent } from './list-staff-n/list-staff-n.component';
import { StaffNComponent } from './staff-n/staff-n.component';

const routes: Routes = [
  {path:'', component:StaffComponent,
  children:[
    {
      path:'add-staff', component:StaffNComponent
    },
    {
      path:'list', component:ListStaffNComponent
    },
    {
      path:'list/edit/:id', component:StaffNComponent
    },
    
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
