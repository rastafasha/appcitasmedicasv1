import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettignService } from 'src/app/core/settings/settigs.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public routes = routes;
  public passwordClass = false;
 public ERROR = false;
 public user:any;
 public roles:any = [] ;


 email = new FormControl();
  password = new FormControl();
  remember = new FormControl();
  errors:any = null;
  loginForm: FormGroup;

  public settings:any;
  public setting_selectedId:number;
  public avatar_setting:string;
  public name_setting:string;

  //testing
  // form = new FormGroup({
  //   email: new FormControl('superadmin@superadmin.com', [
  //     Validators.required,
  //     Validators.email,
  //   ]),
  //   password: new FormControl('password', [Validators.required]),
  // });
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(false, [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(
    public auth: AuthService,
    public router:Router,
    private fb: FormBuilder,
    private settingService: SettignService,
    ) {
     
    }

  ngOnInit(): void {
    // if (localStorage.getItem('authenticated')) {
    //   localStorage.removeItem('authenticated');
    // }
    // let USER = localStorage.getItem("user");
    // if(localStorage.getItem("user")){
    //   this.user = JSON.parse(USER ? USER: '');
    // }
    // // console.log(this.user);

    // this.loginForm = this.fb.group({
    //   email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    //   password: ['', Validators.required],
    //   remember: [false]
  
    // });
    this.getLocalStorage();
  }

  getSettings(){
    this.settingService.getAllSettings().subscribe((resp:any)=>{
      // console.log(resp);
      this.settings= resp.settings.data;
      this.setting_selectedId= resp.settings.data[0].id;
      this.avatar_setting= resp.settings.data[0].avatar;
      this.name_setting= resp.settings.data[0].name;
    })
}

  getLocalStorage(){
    if(localStorage.getItem('token') && localStorage.getItem('user')){
      const USER = localStorage.getItem('user');
      this.user = JSON.parse(USER ? USER: '');
      console.log(this.user);
      this.getuserRol();
      // this.getuserPermisos();
    }else{
      this.user = null;
    }
 }


  loginFormSubmit() {
    if (this.form.valid) {
      this.ERROR = false;
      this.auth.login(this.form.value.email ? this.form.value.email : '' ,this.form.value.password ? this.form.value.password: '')
      .subscribe((resp:any) => {
        // console.log(resp);
        
        if(resp === true){
          // EL LOGIN ES EXITOSO
          
          setTimeout(() => {
            this.getLocalStorage();
            // this.router.navigate([routes.adminDashboard]);
          }, 50);
        }else{
          // EL LOGIN NO ES EXITOSO
          this.ERROR = true;
        }
      },error => {
        console.log(error);
      })
      ;
    }
  }

    getuserRol(){
      
      if(this.user.roles == 'SUPERADMIN' ){
        this.router.navigate([routes.adminDashboard]);
      }
      if(this.user.roles == 'CONTADOR' ){
        this.router.navigate([routes.adminDashboard]);
      }
      if(this.user.roles == 'ADMIN' ){
        this.router.navigate([routes.adminDashboard]);
      }
      if(this.user.roles == 'RECEPCION' ){
        this.router.navigate([routes.adminDashboard]);
      }

      if(this.user.roles == 'LABORATORIO' ){
        this.router.navigate([routes.laboratoryList]);
      }
      if(this.user.roles == 'DOCTOR' ){
        this.router.navigate([routes.doctorDashboard]);
      }
      // if(this.user.roles == 'DOCTOR' ){
      //   this.router.navigate([routes.doctorProfile, this.user.id]);
      // }
      //roles secundarios
      
      if(this.user.roles == 'ASISTENTE' ){
        this.router.navigate([routes.doctorDashboard]);
      }
      if(this.user.roles == 'ENFERMERA' ){
        this.router.navigate([routes.doctorDashboard]);
      }

      if(this.user.roles == 'GUEST' ){
        this.router.navigate([routes.doctorProfile, this.user.id]);
      }
   }

  //  getUserRol() {
  //   const mainRole = this.user?.roles?.[0];
  //   if (!mainRole) {
  //     return;
  //   }

  //   switch (mainRole) {
  //     case 'SUPERADMIN':
  //       this.router.navigate([AppRoutes.dashboard.admin]);
  //       break;
  //       // solo tiene una locacion pero se comporta como superadmin
  //       case 'ADMIN':
  //         this.router.navigate([AppRoutes.location.list]);
  //         break;
  //         // solo tiene una locacion 
  //     case 'MANAGER':
  //       // this.router.navigate([AppRoutes.dashboard.admin]);
  //       this.router.navigate([AppRoutes.location.view, this.user.location_id]);
  //       break;
  //     //roles secundarios son multilocation
  //     case 'BCBA':
  //       this.router.navigate([AppRoutes.doctors.profile, this.user.id]);
  //       break;
  //     case 'RBT':
  //       this.router.navigate([AppRoutes.doctors.profile, this.user.id]);
  //       break;
  //     default:
  //       break;
  //   }
  // }
 
    getuserPermisos(){
      if(this.user.permissions === 'admin_dashboard'){
        this.router.navigate([routes.adminDashboard]);
      }
      if(this.user.permissions === "doctor_dashboard"){
        this.router.navigate([routes.doctorDashboard]);
      }if(this.user.permissions === 'patient_dashboard'){
        this.router.navigate([routes.patientDashboard]);
      }
   }
 
  
  loginFormSubmit2() {
    
    this.auth.login(this.form.value.email ? this.form.value.email :'',
        this.form.value.password ? this.form.value.password: '').subscribe(
      (resp:any) =>{
        this.user = resp;
        console.log(this.user);
        if(resp){
          if(this.user.roles === 'DORCTOR'){
            this.router.navigate([routes.doctorDashboard]);
          }if(this.user.roles === 'SUPERADMIN'){
            this.router.navigate([routes.adminDashboard]);
          }if(this.user.roles === 'PATIENT'){
            this.router.navigate([routes.patientDashboard]);
          }
        }else{

          this.router.navigate([routes.adminDashboard]);
        }
        // if(this.loginForm.get('remember').value){
        //   localStorage.setItem('email', this.loginForm.get('email').value);
        // }else{
        //   localStorage.removeItem('email');
        // }
        // this.router.navigateByUrl('/dashboard');
      },(error) => {
        // Swal.fire('Error', error.error.msg, 'error');
        this.errors = error.error;
      }
      )
       
    }
  togglePassword() {
    this.passwordClass = !this.passwordClass;
  }
}
