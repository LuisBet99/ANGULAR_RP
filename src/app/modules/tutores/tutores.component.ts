import { Component, Input } from '@angular/core';
import { DataUsuarioService } from 'src/app/services/data-usuario.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-tutores',
  templateUrl: './tutores.component.html',
  styleUrls: ['./tutores.component.css']
})
export class TutoresComponent {

  loadinges:string = 'false';
  mostrarSidenav = false;
  colorSpinner:any = 'rgb(128, 0, 0)';
  titutloEstructura:string = '';

  @Input() titulo = 'Programa de tutorias';
  @Input() loading: boolean = false;
  constructor(
    private data_usuario: DataUsuarioService,
    private loginService: LoginServiceService
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

   nombreCompleto:string = '';
  ngOnInit(){
    this.loginService.avisos();
    this.data_usuario.obtenerDatosLocalStorage();
    this.nombreCompleto = this.data_usuario.obtenerNombreCompleto();
  }

  activarLoading(componentRef: any) {
    //debugger;
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
    this.loginService.logout();

  }
}
