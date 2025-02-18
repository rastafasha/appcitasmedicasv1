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
        console.log(resp);
        this.presupuesto_selected = resp.presupuesto;
        this.patient = this.presupuesto_selected.patient;
        this.n_doc = this.presupuesto_selected.patient.n_doc;
        this.name = this.presupuesto_selected.patient.name;
        this.email = this.presupuesto_selected.patient.email;
        this.phone = this.presupuesto_selected.patient.phone;
        this.description = this.presupuesto_selected.patient.description;
        this.doctor = this.presupuesto_selected.doctor.full_name;
        this.speciality = this.presupuesto_selected.speciality;
        this.speciality_id = this.presupuesto_selected.speciality_id;
  
        // this.name = this.presupuesto_selected.patient.name;
        // this.surname = this.presupuesto_selected.patient.surname;
        // this.n_doc = this.presupuesto_selected.patient.n_doc;  
        // this.phone = this.presupuesto_selected.patient.phone; 
        // this.name_companion = this.presupuesto_selected.patient.name_companion;
        // this.surname_companion = this.presupuesto_selected.patient.surname_companion;
        // this.antecedent_alerg = this.presupuesto_selected.patient.antecedent_alerg;
  
      });
      
  
    }
  
    
    getSpecialities(){
      this.presupuestoService.listConfig().subscribe((resp:any)=>{
        this.specialities = resp.specialities;
      })
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
  
      
  
      const formData = new FormData();
      formData.append('presupuesto_id', this.presupuesto_id+'');
  
      this.FILES.forEach((file:any, index:number)=>{
        formData.append("files["+index+"]", file);
      });
  
      this.laboratoryService.storeLaboratory(formData).subscribe((resp:any)=>{
        // console.log(resp);
        // this.getAppointment();
        
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
                  this.text_success = 'Se guardó la informacion del Laboratorio con la cita'
                // this.text_success = 'actualizado correctamente';
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
