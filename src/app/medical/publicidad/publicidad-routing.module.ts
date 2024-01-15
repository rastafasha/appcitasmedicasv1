import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicidadComponent } from './publicidad.component';
import { PublicidadAddComponent } from './publicidad-add/publicidad-add.component';
import { PublicidadListComponent } from './publicidad-list/publicidad-list.component';

const routes: Routes = [
  {path:'', component:PublicidadComponent,
  children:[
    
    {
      path:'list', component:PublicidadListComponent
    },
    
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicidadRoutingModule { }
