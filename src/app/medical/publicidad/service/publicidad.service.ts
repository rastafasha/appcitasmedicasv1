import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicidadService {

  constructor(
    public http: HttpClient,
    public authService:AuthService
  ) { }

  listPublicidads(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/publicidad';
    return this.http.get(URL, {headers:headers});
  }
  
  getPublicidad(publicidad_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/publicidad/show/'+publicidad_id;
    return this.http.get(URL, {headers:headers});
  }
  createPublicidad(data){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/publicidad/store';
    return this.http.post(URL,data, {headers:headers});
  }
  editPublicidad( data:any, publicidad_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/publicidad/update/'+publicidad_id;
    return this.http.post(URL,data,{headers:headers});
  }
  deletePublicidad(publicidad_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/publicidad/destroy/'+publicidad_id;
    return this.http.delete(URL, {headers:headers});
  }

  showPublicidad(publicidad_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/publicidad/profile/"+publicidad_id;
    return this.http.get(URL,{headers:headers});
  }

  updateStatus(data:any, publicidad_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/publicidad/update/status/"+publicidad_id;
    return this.http.put(URL,data,{headers:headers});
  }
}
