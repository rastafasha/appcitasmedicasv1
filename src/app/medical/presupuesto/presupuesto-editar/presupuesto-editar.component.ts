import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { LaboratoryService } from '../../laboratory/service/laboratory.service';
import { PresupuestoService } from '../service/presupuesto.service';
import { Doctor, Patient, Speciality } from '../presupuesto-model';
declare let $:any;  

@Component({
  selector: 'app-presupuesto-editar',
  templateUrl: './presupuesto-editar.component.html',
  styleUrls: ['./presupuesto-editar.component.scss']
})
export class PresupuestoEditarComponent {

  public routes = routes;
    titlePage :string;
    valid_form_success = false;
    public text_validation = '';
    public text_success = '';
  
    
    name = '';
    surname = '';
    n_doc = 0;
    phone = '';
    email = '';
    surname_companion = '';
  
    laboratory = false;
    laboratory_number = 1;
  
    public medical:any = [];
    description:any;
    name_medical:any;
    uso:any;
    
    presupuesto_id:number;
    speciality_id:number;
    presupuesto_selected:any;
    appointment_atention_selected:any;
  
    FILES:any = [];
    FilesAdded:any = [];
    name_laboratory:any;
    antecedent_alerg:any;
  
    public file_selected:any;
    public doc:any;
    public FILE:any;

    patient:Patient [];
    doctor:Doctor [];
    speciality:Speciality [];
    specialities:Speciality [];
  
    constructor(
      public presupuestoService:PresupuestoService,
      public laboratoryService:LaboratoryService,
      private _sanitizer: DomSanitizer,
      public router: Router,
      public ativatedRoute: ActivatedRoute
    ){
  
    }
  
    ngOnInit(): void {
      
      window.scrollTo(0, 0);
      this.ativatedRoute.params.subscribe((resp:any)=>{
        this.presupuesto_id = resp.id;
        console.log(this.presupuesto_id);
        if(this.presupuesto_id ){
          this.getAppointment();
          this.titlePage = 'Editando Presupuesto';
        }else{
          this.titlePage = 'Crear Presupuesto';
        }
       })
       this.getSpecialities();
      
      
    }
  
    getAppointment(){
      this.presupuestoService.getPresupuesto(this.presupuesto_id).subscribe((resp:any)=>{
        this.presupuesto_selected = resp.presupuesto;
        this.patient = this.presupuesto_selected.patient;
        this.n_doc = this.presupuesto_selected.patient.n_doc;
        this.name = this.presupuesto_selected.patient.name;
        this.email = this.presupuesto_selected.patient.email;
        this.phone = this.presupuesto_selected.patient.phone;
        this.description = this.presupuesto_selected.patient.description;
        this.doctor = this.presupuesto_selected.doctor.full_name;
        this.speciality_id = this.presupuesto_selected.speciality_id;
  
      });
      
  
    }
  
    
    getSpecialities(){
      this.presupuestoService.listConfig().subscribe((resp:any)=>{
        this.specialities = resp.specialities;
      })
    }
  
    // eslint-disable-next-line no-debugger
    save(){debugger
      this.text_validation = '';
      // if(!this.name_laboratory){
      //   this.text_validation = 'Es requerido ingresar un nombre';
      //   return;
      // }
  
  
      // if(this.FILES.length === 0){
      //   this.text_validation = 'Necesitas subir un recurso'
      //   // this.toaster.open({
      //   //   text:'Necesitas subir un recurso de la clase',
      //   //   caption:'VALIDACIÓN',
      //   //   type:'danger'
      //   // });
      //   return;
  
      // }
  
      
  
      const formData = new FormData();
      if(this.presupuesto_id){

        formData.append('presupuesto_id', this.presupuesto_selected.id+'');
      }
  
      formData.append('speciality_id', this.speciality_id+'');
      formData.append('description', this.description+'');
      formData.append('patient_id', this.patient+'');
      formData.append('n_doc', this.n_doc+'');
      formData.append('name', this.name+'');
      formData.append('email', this.email+'');
      formData.append('phone', this.phone+'');
      // formData.append('doctor_id', this.doctor_id+'');
      // formData.append('address', this.address+'');
      // formData.append('date', this.date+'');
  
      if(this.presupuesto_id){
        //editamos

        this.presupuestoService.editPresupuesto(formData, this.presupuesto_id).subscribe((resp:any)=>{
          if(resp.message == 403){
            this.text_validation = resp.message_text;
            Swal.fire({
              position: "top-end",
                    icon: "warning",
                    title: this.text_validation,
                    showConfirmButton: false,
                    timer: 1500
                  });
                }else{
                    this.text_success = 'Se guardó la informacion del Laboratorio con la cita'
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: this.text_success,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.getAppointment();
              }
        })
      }else {
        //creamos
        this.laboratoryService.storeLaboratory(formData).subscribe((resp:any)=>{
          if(resp.message == 403){
            this.text_validation = resp.message_text;
            Swal.fire({
              position: "top-end",
                    icon: "warning",
                    title: this.text_validation,
                    showConfirmButton: false,
                    timer: 1500
                  });
                }else{
                    this.text_success = 'Se guardó la informacion del Laboratorio con la cita'
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: this.text_success,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.getAppointment();
              }
        })
      }
  
    }

}
