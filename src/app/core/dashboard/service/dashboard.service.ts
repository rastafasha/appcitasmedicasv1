import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    public http: HttpClient,
    public authService: AuthService
  ) { }

  
  dashboardAdmin(data){
    const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    const URL = url_servicios+'/dashboard/admin';
    return this.http.post(URL,data, {headers:headers});
  }
  dashboardAdminYear(data){
    const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    const URL = url_servicios+'/dashboard/admin-year';
    return this.http.post(URL,data, {headers:headers});
  }

  getConfigDashboard(){
    const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    const URL = url_servicios+'/dashboard/config';
    return this.http.get(URL, {headers:headers});
  }
  dashboardDoctor(data){
    const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    const URL = url_servicios+'/dashboard/doctor';
    return this.http.post(URL,data, {headers:headers});
  }
  dashboardDoctorYear(data){
    const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    const URL = url_servicios+'/dashboard/doctor-year';
    return this.http.post(URL,data, {headers:headers});
  }
  dashboardPatient(data){
    const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    const URL = url_servicios+'/dashboard/patient';
    return this.http.post(URL,data, {headers:headers});
  }
  dashboardPatientYear(data){
    const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    const URL = url_servicios+'/dashboard/patient-year';
    return this.http.post(URL,data, {headers:headers});
  }
  
}
