import { Component, Input, OnInit } from '@angular/core';
import { DataUsuarioService } from 'src/app/services/data-usuario.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-coordinador-institucional',
  templateUrl: './coordinador-institucional.component.html',
  styleUrls: ['./coordinador-institucional.component.css']
})
export class CoordinadorInstitucionalComponent {

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
  rol_academico:boolean = false;
  rol_institucional:boolean = false;

  ngOnInit(){
    this.rol_institucional=localStorage.getItem('id_rol')! === '4'  ? true: false;
    this.rol_academico=localStorage.getItem('id_rol')! === '5'  ? true: false;

    this.loginService.avisos();
    this.data_usuario.obtenerDatosLocalStorage();
    this.nombreCompleto = this.data_usuario.obtenerNombreCompleto();
    console.log('Este es el nombre del usuario: ', this.nombreCompleto);
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
    this.loginService.logout();


  }
}
