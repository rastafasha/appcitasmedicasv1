import { Component } from '@angular/core';
import {SwPush, SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'health_connect_admin';

  constructor(private swUpdate: SwUpdate){}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe( () => {
        if (confirm('Nueva version disponible. Cargar nueva version?')) {
          window.location.reload();
        }
      });
    }


  }

  
}
