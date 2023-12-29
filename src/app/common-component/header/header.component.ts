import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';
import { SideBarService } from 'src/app/shared/side-bar/side-bar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public routes = routes;
  public openBox = false;
  public miniSidebar  = false;
  public addClass = false;
  public user:any;
  public usuario:any;
  public user_id:any;
  public avatar:any;

  imagenSerUrl = environment.url_media;
  constructor(
    public router: Router,
    private sideBar: SideBarService,
    public authService: AuthService,
    public activatedRoute: ActivatedRoute,
    ) {
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    // this.user = this.authService.user;
    // console.log(this.user);
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe((resp:any)=>{
      // console.log(resp);
      this.user_id = resp.id;
    });
    this.getDoctor();
  }
  
  getDoctor(){
    this.authService.getUserRomoto(this.user_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.usuario = resp;
    })
  }

  openBoxFunc() {
    this.openBox = !this.openBox;
    /* eslint no-var: off */
    var mainWrapper = document.getElementsByClassName('main-wrapper')[0];
    if (this.openBox) {
      mainWrapper.classList.add('open-msg-box');
    } else {
      mainWrapper.classList.remove('open-msg-box');
    }
  }

  


  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
    this.addClass = !this.addClass;
      /* eslint no-var: off */
      var root = document.getElementsByTagName( 'html' )[0];
      /* eslint no-var: off */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      var sidebar:any = document.getElementById('sidebar')
    
      if (this.addClass) {
        root.classList.add('menu-opened');
        sidebar.classList.add('opened');
        
      }
      else {
        root.classList.remove('menu-opened');
        sidebar.classList.remove('opened');
      }
      console.log('pulsado');
  }

  public toggleMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
    
    this.addClass = !this.addClass;
    /* eslint no-var: off */
    var root = document.getElementsByTagName( 'html' )[0];
    /* eslint no-var: off */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var sidebar:any = document.getElementById('sidebar')
    sidebar.classList.remove('cerrar');
  
      if (this.addClass) {
        root.classList.add('menu-opened');
        sidebar.classList.add('opened');
      }
      else {
        root.classList.remove('menu-opened');
        sidebar.classList.remove('opened');
      }
    }



    logout(){
      this.authService.logout();
    }
  }
