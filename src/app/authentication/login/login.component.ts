import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  getLocalStorage(){
    if(localStorage.getItem('token') && localStorage.getItem('user')){
      let USER = localStorage.getItem('user');
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
      
      if(this.user.roles == 'DOCTOR' ){
        this.router.navigate([routes.doctorDashboard]);
      }
      if(this.user.roles == 'SUPERADMIN' ){
        this.router.navigate([routes.adminDashboard]);
      }
      if(this.user.roles == 'PATIENT' ){
        this.router.navigate([routes.patientDashboard]);
      }
      //roles secundarios
      if(this.user.roles == 'DOCTOR ESPECIALISTA' ){
        this.router.navigate([routes.doctorDashboard]);
      }
      if(this.user.roles == 'DOCTOR ASISTENTE' ){
        this.router.navigate([routes.doctorDashboard]);
      }
      if(this.user.roles == 'CONTADOR' ){
        this.router.navigate([routes.adminDashboard]);
      }
      if(this.user.roles == 'ADMIN' ){
        this.router.navigate([routes.adminDashboard]);
      }
      if(this.user.roles == 'ENFERMERA' ){
        this.router.navigate([routes.doctorDashboard]);
      }
      if(this.user.roles == 'PATIENT' ){
        this.router.navigate([routes.patientDashboard]);
      }
      if(this.user.roles == 'RECEPCIÓN' ){
        this.router.navigate([routes.adminDashboard]);
      }
   }
 
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
