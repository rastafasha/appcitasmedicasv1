import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,

  ) { }

  

  getAll(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/pagos';
    return this.http.get(URL, {headers:headers});
  }


   update(data:any, payment_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/payment/update/"+payment_id;
    return this.http.put(URL,data,{headers:headers});
  }

   getPagosbyUser(id:number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/payment/pagosbyUser/"+id;
    return this.http.put(URL,{headers:headers});
  }

   getRecientes() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/payment/recientes';
    
  }

  updateStatus(data:any, payment_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/payment/update/status/"+payment_id;
    return this.http.put(URL,data,{headers:headers});
  }
 
}
