import { Component } from '@angular/core';
import {SwPush, SwUpdate} from '@angular/service-worker';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'klyntic_clinica_admin';

  constructor(private swUpdate: SwUpdate){}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe( () => {
        if (confirm('Nueva version disponible. Cargar nueva version?')) {
          window.location.reload();
        }
      });
    }


  }

  
}
