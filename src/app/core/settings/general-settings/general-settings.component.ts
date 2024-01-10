import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { SettignService } from '../settigs.service';
interface data {
  value: string ;
}
@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent {
  public routes = routes;
  public deleteIcon1 = true;
  public deleteIcon2  = true;
  public selectedValue! : string ;

  public name: any;
  public address: any;
  public phone: any;
  public city: any;
  public state: any;
  public zip: any;
  public country: any;
  public setting: any;
  public settings: any;


  constructor(
    public settingService: SettignService
  ){}

  // deleteIconFunc1(){
  //   this.deleteIcon1 = !this.deleteIcon1
  // }
  // deleteIconFunc2(){
  //   this.deleteIcon2 = !this.deleteIcon2
  // }
  
  ngOnInit(): void {
    // this.getSetting();
    this.getSettings();
    
  }

  getSetting(){
    this.settingService.getSettingById({}).subscribe((resp:any)=>{
      console.log(resp);
    })
  }

  getSettings(){
    this.settingService.getAllSettings().subscribe((resp:any)=>{
      console.log(resp);
      this.settings= resp.settings.data;
    })
}

save(){

  let data = {
    name: this.name,
    address: this.address,
    phone: this.phone,
    city: this.city,
    state:this.state,
    zip:this.zip,
    country: this.country
  }
  this.settingService.createSetting(data).subscribe((resp:any)=>{
    console.log(resp);
    this.getSettings();
     this.name= '';
     this.address= '';
     this.phone= '';
     this.city= '';
    this.state= '';
    this.zip= '';
     this.country = '';

  })
}

deleteTipoPago(setting:any){debugger

  this.settingService.deleteSetting(setting.id).subscribe(
    (resp:any) =>{
      this.getSettings();
    });
  
}


}
