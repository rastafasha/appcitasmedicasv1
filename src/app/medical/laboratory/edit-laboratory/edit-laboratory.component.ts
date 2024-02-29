import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { AppointmentService } from '../../appointment/service/appointment.service';
import Swal from 'sweetalert2';
import { LaboratoryService } from '../service/laboratory.service';
@Component({
  selector: 'app-edit-laboratory',
  templateUrl: './edit-laboratory.component.html',
  styleUrls: ['./edit-laboratory.component.scss']
})
export class EditLaboratoryComponent {

  public routes = routes;

  valid_form_success: boolean = false;
  public text_validation:string = '';
  public text_success:string = '';

  
  name:string = '';
  surname:string = '';
  n_doc:number = 0;
  phone:string = '';
  name_companion:string = '';
  surname_companion:string = '';

  laboratory:boolean = false;
  laboratory_number:number = 1;

  public medical:any = [];
  description:any;
  name_medical:any;
  uso:any;
  
  appointment_id:any;
  appointment_selected:any;
  appointment_atention_selected:any;

  FILES:any = [];
  FilesAdded:any = [];
  name_laboratory:any;

  constructor(
    public appointmentService:AppointmentService,
    public laboratoryService:LaboratoryService,

    public router: Router,
    public ativatedRoute: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    
    window.scrollTo(0, 0);
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.appointment_id = resp.id;
      console.log(this.appointment_id);
     })
     this.getAppointment();
  }

  getAppointment(){
    this.appointmentService.showAppointment(this.appointment_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.appointment_selected = resp.appointment;

      this.name = this.appointment_selected.patient.name;
      this.surname = this.appointment_selected.patient.surname;
      this.n_doc = this.appointment_selected.patient.n_doc;  
      this.phone = this.appointment_selected.patient.phone; 
      this.name_companion = this.appointment_selected.patient.name_companion;
      this.surname_companion = this.appointment_selected.patient.surname_companion;

    });
    // cita medica

    this.appointmentService.showCitamedica(this.appointment_id).subscribe((resp:any)=>{
      console.log(resp);

      this.appointment_atention_selected = resp.appointment_attention;
      this.medical =this.appointment_atention_selected.receta_medica;
      this.description =this.appointment_atention_selected.description;
      this.laboratory_number =this.appointment_atention_selected.laboratory;

      if(this.laboratory_number === 2){
        this.laboratory = true
      }else{
        this.laboratory = false
      }


    })

    this.laboratoryService.getLaboratoryByAppointment(this.appointment_id).subscribe((resp:any)=>{
      console.log(resp);
      this.FilesAdded = resp.laboratories.data;
    })

  }

  


  processFile($event:any){
    for (const file of $event.target.files){
      this.FILES.push(file);
    }
    console.log(this.FILES);
  
  }
  

  save(){
    this.text_validation = '';
    // if(!this.name_laboratory){
    //   this.text_validation = 'Es requerido ingresar un nombre';
    //   return;
    // }


    if(this.FILES.length === 0){
      this.text_validation = 'Necesitas subir un recurso'
      // this.toaster.open({
      //   text:'Necesitas subir un recurso de la clase',
      //   caption:'VALIDACIÓN',
      //   type:'danger'
      // });
      return;

    }

    

    let formData = new FormData();
    formData.append('appointment_id', this.appointment_id);

    this.FILES.forEach((file:any, index:number)=>{
      formData.append("files["+index+"]", file);
    });

    this.laboratoryService.storeLaboratory(formData).subscribe((resp:any)=>{
      // console.log(resp);
      this.text_success = 'Se guardó la informacion de la cita médica'
    })

  }

}
