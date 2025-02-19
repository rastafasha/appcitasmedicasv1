import { Component, Input, OnInit } from "@angular/core";
import { AppoitmentPayService } from "src/app/medical/appointment-pay/service/appoitment-pay.service";
import { PaymentService } from "src/app/medical/appointment-pay/service/payment.service";
import { AppointmentService } from "src/app/medical/appointment/service/appointment.service";

@Component({
  selector: "app-notificacionesupdate",
  templateUrl: "./notificacionesupdate.component.html",
  styleUrls: ["./notificacionesupdate.component.scss"],
})
export class NotificacionesupdateComponent implements OnInit {
  @Input() routes;
  @Input() darkMode;
  @Input() user;
  @Input() usuario;
  @Input() imagenSerUrl;
  @Input() logout;

  appointments: any = [];
  transferencias: any = [];
  statusPending;
  constructor(
    private appointmentService: AppointmentService,
    public paymentService: PaymentService,
  ) {}
  ngOnInit(): void {
    this.getAppointmentRecientes();
    this.getTrastransferenciasRecientes();
  }
  getAppointmentRecientes() {
    this.appointmentService.listAppointments().subscribe(
      (response:any) => {
        // console.log(response);
        //filtramos los mas recientes
        this.appointments = response.appointments.data;
        console.log(this.appointments);
        //extramos los pendientes con status 1 y contamos el total
        // this.appointments.forEach((element: any) => {
        //     if (element.status == 1) {
        //         this.statusPending++;
        //     }
        // });
        // console.log(this.statusPending);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTrastransferenciasRecientes() {
    this.paymentService.getAll().subscribe(
        (response:any) => {
            console.log(response);
            this.transferencias = response.payments;
            
            },
            (error) => {
                console.log(error);
            }
        );  
        }
}
