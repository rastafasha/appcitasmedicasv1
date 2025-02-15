import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { AppointmentService } from '../service/appointment.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import { SettignService } from 'src/app/core/settings/settigs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-appointments',
  templateUrl: './add-appointments.component.html',
  styleUrls: ['./add-appointments.component.scss']
})
export class AddAppointmentsComponent {
  public routes = routes;
  public selectedValue!: string;

  public isLoading = false;
  valid_form_success = false;
  public text_validation = '';
  public text_success = '';

  hours:any;
  hour:any;
  specialities:any;
  speciality_id:any;
  date_appointment:any;
  
  id = 0;
  name = '';
  surname = '';
  n_doc = 0;
  phone = '';
  name_companion = '';
  surname_companion = '';
  
  amount = 0;
  amount_add = 0;
  method_payment = '';

  patient:any = [];
  DOCTORS:any = [];
  DOCTOR:any = [];
  DOCTOR_SELECTED:any;
  
  selected_segment_hour:any;
  
  tiposdepagos:any;
  

  constructor(
    public appointmentService:AppointmentService,
    public doctorService:DoctorService,
    public settigService: SettignService,
    public router: Router
  ){

  }

  ngOnInit(): void {
    this.doctorService.closeMenuSidebar();
    window.scrollTo(0, 0);
    this.appointmentService.listConfig().subscribe((resp:any)=>{
      this.hours = resp.hours;
      this.specialities = resp.specialities;
    })

    this.getTiposdePago();
  }
  
  filtro(){
    const data = {
      date_appointment:this.date_appointment,
      hour:this.hour,
      speciality_id:this.speciality_id
    }
    this.appointmentService.lisFiter(data).subscribe((resp:any)=>{
      // console.log(resp);
      this.DOCTORS = resp.doctors;
    })
  }

  countDisponibilidad(DOCTOR:any){
    let SEGMENTS = [];
    SEGMENTS = DOCTOR.segments.filter((item:any)=> !item.is_appointment);
    return SEGMENTS.length;
  }

  showSegment(DOCTOR:any){
    this.DOCTOR_SELECTED = DOCTOR;
  }

  selecSegment(SEGMENT:any){
    this.selected_segment_hour = SEGMENT;
  }

  filterPatient(){
    this.appointmentService.getPatient(this.n_doc+"").subscribe((resp:any)=>{
      // console.log(resp);
      this.patient = resp;
      if(resp.menssage === 403){
        this.name= '';
        this.surname= '';
        this.phone= '';
        this.n_doc= 0;
      }else{
        this.name= resp.name;
        this.surname= resp.surname;
        this.phone= resp.phone;
        this.n_doc= resp.n_doc;
      }
    })
  }

  resetPatient(){
    this.name= '';
        this.surname= '';
        this.phone= '';
        this.n_doc= 0;
  }

  save(){
    this.text_validation = '';

    if(this.amount < this.amount_add){
      this.text_validation = "El Monto ingresado como adelanto no puede ser mayor al costo de la cita medica";
      return;
    }
    if(!this.name ||!this.surname|| !this.n_doc || !this.phone 
      || !this.date_appointment|| !this.speciality_id 
      || !this.selected_segment_hour || !this.amount 
      || !this.amount_add || !this.method_payment){
      this.text_validation = "Los campos son Necesarios(Segmento de hora, fecha, especialidad, paciente, pago)";
      return;
    }

    const data ={
      "doctor_id": this.DOCTOR_SELECTED.doctor.id,
        // "patient_id": ,
        user_id:this.patient.id,
        name: this.name,
        surname: this.surname,
        n_doc: this.n_doc,
        phone: this.phone,
        name_companion: this.name_companion,
        surname_companion: this.surname_companion,
        "date_appointment": this.date_appointment,
        "speciality_id": this.speciality_id,
        "doctor_schedule_join_hour_id": this.selected_segment_hour.id,
        amount:this.amount,
        amount_add:this.amount_add,
        method_payment:this.method_payment,
    }

    
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "procesando",
      showConfirmButton: false,
      timer: 1500
    });
    this.appointmentService.storeAppointment(data).subscribe((resp:any)=>{
      // console.log(resp);
      // this.text_success = "La Cita medica se ha creado";
      // Swal.fire('Exito!', `La Cita medica se ha creado, favor espere la verificacion de  el pago`, 'success');

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
              this.text_success = 'La Cita medica se ha creado, favor espere la verificacion de  el pago';
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: this.text_success,
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/appointments/list']);
          }
    })
  }


  getTiposdePago(){
    this.settigService.getActivas().subscribe((resp:any)=>{
      console.log(resp);
      this.tiposdepagos = resp.tiposdepagos;
      // console.log(this.tiposdepagos);
    })
}


}
