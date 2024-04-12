import { Component, Input } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {

  loadinges:string = 'false';
  mostrarSidenav = false;
  colorSpinner:any = 'rgb(128, 0, 0)';
  titutloEstructura:string = '';

  @Input() titulo = 'Programa de tutorias';
  @Input() loading: boolean = false;
  constructor(private loginService: LoginServiceService
    ){

        //Estas declaraciones son para cuando el usuario interactua en la pantalla
        //Reiniciar el timer y evitar cerrar sesion
        this.loginService.resetTimer();  //
        window.onload = () => this.loginService.resetTimer();
        window.onmousemove = () => this.loginService.resetTimer();
        window.onmousedown = () => this.loginService.resetTimer();
        window.ontouchstart = () => this.loginService.resetTimer();
        window.onclick = () => this.loginService.resetTimer();
        window.onkeypress = () => this.loginService.resetTimer();
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
