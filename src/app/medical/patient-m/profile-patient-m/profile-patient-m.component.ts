import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientMService } from 'src/app/services/patient-m.service';
import { RolesService } from 'src/app/services/roles.service';
import { routes } from 'src/app/shared/routes/routes';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-profile-patient-m',
    templateUrl: './profile-patient-m.component.html',
    styleUrls: ['./profile-patient-m.component.scss'],
    standalone: false
})
export class ProfilePatientMComponent {
  public routes = routes;
  imagenSerUrl = environment.url_media;
public patientProfile: any[];
option_selected = 1;
public patient_id: number;
public n_doc: string;
public user: any;

public num_appointment = 0;
public money_of_appointments = 0;
public num_appointment_pendings = 0;
public patient_selected: any;
public appointment_pendings: any =[];
public appointments: any =[];

public isLoading = false;
  public cargando = false;


public text_success = '';
public text_validation = '';

constructor(
  public patientService : PatientMService,
  public activatedRoute: ActivatedRoute,
  public doctorService: DoctorService,
  public roleService: RolesService,
  )
{
}

ngOnInit(): void {
  window.scrollTo(0, 0);
  this.user = this.roleService.authService.user;
  this.doctorService.closeMenuSidebar();
  this.activatedRoute.params.subscribe((resp:any)=>{
    // console.log(resp);
    this.patient_id = resp.id;
    // this.n_doc = resp.id;
  });

 
  this.getPatientServer();
  
  
}

isPermission(permission:string){
  if(this.user.roles.includes('SUPERADMIN')){
    return true;
  }
  if(this.user.permissions.includes(permission)){
    return true;
  }
  return false;
}


getPatientServer(){
  this.isLoading = true;
  this.patientService.showPatientProfile(this.patient_id).subscribe((resp:any)=>{
    // console.log(resp);
    this.isLoading = false;
    this.appointments= resp.appointments;
    this.num_appointment= resp.num_appointment;
    this.money_of_appointments= resp.money_of_appointments;
    this.num_appointment_pendings= resp.num_appointment_pendings;
    this.patient_selected= resp.patient;
    this.appointment_pendings= resp.appointment_pendings.data;


  })
}


  optionSelected(value:number){
    this.option_selected = value;
  }
}
