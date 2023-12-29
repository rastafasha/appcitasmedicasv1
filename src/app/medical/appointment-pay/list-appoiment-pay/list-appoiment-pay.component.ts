import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from 'src/app/shared/routes/routes';
import { AppoitmentPayService } from '../service/appoitment-pay.service';
import { FileSaverService } from 'ngx-filesaver';
import * as XLSX from 'xlsx';
import jspdf from 'jspdf';
import { DoctorService } from '../../doctors/service/doctor.service';

declare var $:any;

@Component({
  selector: 'app-list-appoiment-pay',
  templateUrl: './list-appoiment-pay.component.html',
  styleUrls: ['./list-appoiment-pay.component.scss']
})
export class ListAppoimentPayComponent {

  @ViewChild('closebutton') closebutton:any;

  public routes = routes;
  public selectedValue !: string  ;
  public searchDataValue = '';
  public searchDataDoctor = '';

  public appointmentList: any = [];
  dataSource!: MatTableDataSource<any>;

  public showFilter = false;
  public lastIndex = 0;
  public pageSize = 10;
  public totalDataPatient = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<any> = [];
  public totalPages = 0;

  public appointment_generals:any = [];
  public appointment_id:any;
  public appointment_selected:any;

  public payment_selected:any;

  public speciality_id:number= 0;
  public specialities:any = [];
  
  public picker1:any;
  public picker2:any;
  public date_start:any;
  public date_end:any;
  public method_payment:string = '';
  public amount_add:number = 0;

  public text_success:string = '';
  public text_validation:string = '';

  constructor(
    public appointmentpayService : AppoitmentPayService,
    public doctorService : DoctorService,
    private fileSaver: FileSaverService
    ){

  }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.doctorService.closeMenuSidebar();
    this.getTableData();
    this.getSpecialities();
  }

  getSpecialities(){
    this.appointmentpayService.listConfig().subscribe((resp:any)=>{
      this.specialities = resp.specialities;
    })
  }
  
  private getTableData(page=1): void {
    this.appointmentList = [];
    this.serialNumberArray = [];

    this.appointmentpayService.listAppointmentPays(page, this.searchDataDoctor, this.searchDataValue, 
      this.speciality_id, this.date_start,this.date_end).subscribe((resp:any)=>{
      // console.log(resp);

      this.totalDataPatient = resp.total;
      this.appointmentList = resp.appointmentpays.data;
      // this.getTableDataGeneral();
      this.dataSource = new MatTableDataSource<any>(this.appointmentList);
      this.calculateTotalPages(this.totalDataPatient, this.pageSize);
    })
  }

  

  addPayment(data:any){
    this.text_validation = '';
    if(!this.method_payment || !this.amount_add){
      this.text_validation = "Se Requiere todos los campos"
      return;
    }
    let dataD ={
      appointment_id: data.id,
      appointment_total: data.amount,
      amount: this.amount_add,
      method_payment: this.method_payment
    }
    this.appointmentpayService.storeAppointmentPay(dataD).subscribe((resp:any)=>{
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        this.text_success = "El Pago se registró correctamente";
        data.payment.push(resp.appoimentpay);

        let INDEX = this.appointmentList.findIndex((appo:any)=>appo.id == data.id);
        if(INDEX != -1){
          this.appointmentList[INDEX].status_pay = !resp.appoimentpay.is_total_payment ? 2: 1;
        }
        this.amount_add = 0;
        this.method_payment = ''; 
        
        $('#add_payment').hide();
        $("#add_payment").removeClass("show");
        $(".modal-backdrop").remove();
        $("body").removeClass();
        $("body").removeAttr("style");
        this.closebutton.nativeElement.click();
        this.getTableData();
      }
    })
  }

  selectPayment(payment:any){
    this.payment_selected = payment;
  }

  selectEditPayment(payment:any){
    this.payment_selected = payment;
    this.text_validation = '';
    this.text_success = '';
    this.amount_add = this.payment_selected.amount;
    this.method_payment  = this.payment_selected.method_payment;

  }

  clearData(){
    this.amount_add = 0;
    this.method_payment = '';
    this.text_validation = '';
    this.text_success = '';
  }

  editPayment(data:any){
    this.text_validation = '';
    if(!this.method_payment || !this.amount_add){
      this.text_validation = "Se Requiere todos los campos"
      return;
    }
    let dataD ={
      appointment_id: data.id,
      appointment_total: data.amount,
      amount: this.amount_add,
      method_payment: this.method_payment
    }
    this.appointmentpayService.editAppointmentPay(dataD, this.payment_selected.id).subscribe((resp:any)=>{
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        this.text_success = "El Pago se Actualizó correctamente";
        let index = data.payments.findIndex((pay:any)=>pay.id == resp.appoimentpay.id);
        if(index != -1){
          data.payment[index] = resp.appoimentpay;
        }
        let INDEX = this.appointmentList.findIndex((appo:any)=>appo.id == data.id);
        if(INDEX != -1){
          this.appointmentList[INDEX].status_pay = !resp.appoimentpay.is_total_payment ? 2: 1;
        }
        this.amount_add = 0;
        this.method_payment = '';   

        $('#edit_payment').hide();
        $("#edit_payment").removeClass("show");
        $(".modal-backdrop").remove();
        $("body").removeClass();
        $("body").removeAttr("style");
        this.getTableData();
      }
    })
  }

  closeReload(){
    this.getTableData();
  }

  deletePayment(data:any){
    this.appointmentpayService.deleteAppointmentPay(this.payment_selected.id).subscribe((resp:any)=>{
      // console.log(resp);

      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{

        let INDEX = data.payments.findIndex((item:any)=> item.id == this.payment_selected.id);

        let INDEX2 = this.appointmentList.findIndex((appo:any)=>appo.id == data.id);
        if(INDEX2 != -1){
          this.appointmentList[INDEX2].status_pay = 2;
        }

      if(INDEX !=-1){
        data.payments.splice(INDEX,1);

        $('#delete_payment').hide();
        $("#delete_payment").removeClass("show");
        $(".modal-backdrop").remove();
        $("body").removeClass();
        $("body").removeAttr("style");

        

        this.payment_selected = null;
        this.getTableData();
      }
      }
    })
  }
 
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   public searchData() {
    // this.dataSource.filter = value.trim().toLowerCase();
    // this.patientList = this.dataSource.filteredData;
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  public sortData(sort: any) {
    const data = this.appointmentList.slice();

    if (!sort.active || sort.direction === '') {
      this.appointmentList = data;
    } else {
      this.appointmentList = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData(this.currentPage);
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData(this.currentPage);
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData(this.currentPage);
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
    this.searchDataValue = '';
    this.searchDataDoctor = '';
    this.speciality_id = 0;
    this.picker1= null;
    this.picker2= null;
  }

  private calculateTotalPages(totalDataPatient: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalDataPatient / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }

  excelExport(){
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const EXCLE_EXTENSION = '.xlsx';

    this.getTableData();


    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.appointmentList);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'xlsx', type: 'array'});

    const blobData = new Blob([excelBuffer],{type: EXCEL_TYPE});

    this.fileSaver.save(blobData, "appointments_pays_db_appcitasmedicas",)

  }
  csvExport(){
    const CSV_TYPE = 'text/csv';
    const CSV_EXTENSION = '.csv';

    this.getTableData();

    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.appointmentList);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'csv', type: 'array'});

    const blobData = new Blob([excelBuffer],{type: CSV_TYPE});

    this.fileSaver.save(blobData, "appointments_pays_db_appcitasmedicas", CSV_EXTENSION)

  }

  txtExport(){
    const TXT_TYPE = 'text/txt';
    const TXT_EXTENSION = '.txt';

    this.getTableData();


    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.appointmentList);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'xlsx', type: 'array'});

    const blobData = new Blob([excelBuffer],{type: TXT_TYPE});

    this.fileSaver.save(blobData, "appointments_pays_db_appcitasmedicas", TXT_EXTENSION)

  }

  pdfExport(){
    // var doc = new jspdf(); 
    
    // const worksheet = XLSX.utils.json_to_sheet(this.appointmentList);

    // const workbook = {
    //   Sheets:{
    //     'testingSheet': worksheet
    //   },
    //   SheetNames:['testingSheet']
    // }

    // doc.html(document.body, {
    //   callback: function (doc) {
    //     doc.save('appointments_pays_db_appcitasmedicas.pdf');
    //   }
    // });

  }


}
