import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/shared/data/data.service';
import { routes } from 'src/app/shared/routes/routes';
import { RolesService } from '../service/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-role-user',
  templateUrl: './edit-role-user.component.html',
  styleUrls: ['./edit-role-user.component.scss']
})
export class EditRoleUserComponent {
  public routes = routes;

  sideBar:any = [];
  role_id:any = null;
  name = '';
  permissions:any = [];
  valid_form = false;
  valid_form_success = false;
  text_validation:any = null;

  constructor(
    public dataService: DataService,
    public roleService: RolesService,
    public router: Router,
    public ativatedRoute:ActivatedRoute
  ){

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
   this.sideBar = this.dataService.sideBar[0].menu;
   this.ativatedRoute.params.subscribe((resp:any)=>{
    this.role_id = resp.id;
   })
   this.showRole();
    
  }

  showRole(){
    this.roleService.getRole(this.role_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.name = resp.name;
      this.permissions = resp.permision_pluck;
    })
  }

  addPermission(subMenu:any){
    if(subMenu.permision){
      const INDEX = this.permissions.findIndex((item:any)=>item == subMenu.permision);
      if(INDEX != -1){
        this.permissions.splice(INDEX,1);
      }else{
        this.permissions.push(subMenu.permision);
      }
      console.log(this.permissions);
        
    }
  }

  save(){
    this.valid_form = false;
    if(!this.name || this.permissions.length == 0){
      this.valid_form = true;
      return;
    }
    const data = {
      name:this.name,
      permissions: this.permissions,
    }
    this.valid_form_success = false;
    this.text_validation = null;

    this.roleService.editRole(data, this.role_id).subscribe((resp:any)=>{
      // console.log(resp);

      if(resp.message == 403){
              // Swal.fire('Actualizado', this.text_validation, 'success');
              this.text_validation = resp.message_text;
              Swal.fire({
                position: "top-end",
                      icon: "warning",
                      title: this.text_validation,
                      showConfirmButton: false,
                      timer: 1500
                    });
                  }else{
                    // Swal.fire('Actualizado', this.text_success, 'success' );
                      // this.text_success = 'Informacíon actualizada'
                    // this.text_success = 'actualizado correctamente';
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Informacíon actualizada",
                      showConfirmButton: false,
                      timer: 1500
                    });
                    this.ngOnInit();
                }
      // if(resp.message == 403){
      //   this.text_validation = resp.message_text;
      //   return;
      // }
      // this.valid_form_success = true;
    })
  }
}
