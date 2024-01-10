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

  constructor(
    public settingService: SettignService
  ){}

  deleteIconFunc1(){
    this.deleteIcon1 = !this.deleteIcon1
  }
  deleteIconFunc2(){
    this.deleteIcon2 = !this.deleteIcon2
  }
  
selectedList1: data[] = [
  {value: 'Select'},
  {value: 'California'},
  {value: 'Tasmania'},
  {value: 'Auckland'},
  {value: 'Marlborough'},
];
selectedList2: data[] = [
  {value: 'India'},
  {value: 'London'},
  {value: 'France'},
  {value: 'USA'},
];

  ngOnInit(): void {
    // this.getSetting();
    
  }

  getSetting(){
    this.settingService.getSettingById({}).subscribe((resp:any)=>{
      console.log(resp);
    })
  }


}
