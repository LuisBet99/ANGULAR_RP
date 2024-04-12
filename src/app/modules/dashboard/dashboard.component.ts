import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  loadinges:string = 'false';
  mostrarSidenav = false;
  colorSpinner:any = 'rgb(128, 0, 0)';
  titutloEstructura:string = '';

  @Input() titulo = 'Programa de tutorias';
  @Input() loading: boolean = false;
  constructor(){

  }

  activarLoading(componentRef: any) {

    //Validamos que recibimod el evento emitido "titulo", desde el componente hijo.
    if (componentRef.loadSpinner) {

      //Nos subscribimos y seteamos el titulo que mandamos desde el hijo.
      componentRef.loadSpinner.subscribe((data: string) => {

        this.loadinges = data;
      });
    }
  }
  recibirTitulo(componentRef: any) {

    //Validamos que recibimod el evento emitido "titulo", desde el componente hijo.
    if (componentRef.titulo) {
      //Nos subscribimos y seteamos el titulo que mandamos desde el hijo.
      componentRef.titulo.subscribe((data: string) => {
        this.titulo = data;
      });
    }
  }

  salir(){

  }

}
