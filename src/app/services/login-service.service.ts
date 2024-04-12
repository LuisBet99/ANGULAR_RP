import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router, private api: ApiService) { }

  // ==========================================
  // ==========================================
  //    CERRAR SESION DESPUES DE INACTIVIDAD
  // ==========================================
  // ==========================================
  //Este sera el timer para cerrar la sesion
  private idleTimeout = 20 * 60 * 1000; // 10 minutos in milisegundos  minutos/horas/milisegundos
  private idleTimer:any;
  //Esta funcion es para resetear el timer SE MANDA LLAMAR DESDE EL APP.COMPONENT LA LOGICA ESTA AHI.
  resetTimer() {
    clearTimeout(this.idleTimer); //Limpiamos el timer actual
    this.idleTimer = setTimeout(() => this.cerrarSesion(), this.idleTimeout); //Aqui lanzamos el cerrar sesion y volvemos a setear a 10 minutos.
  }

 listaRutas : { [key: number]: string } ={
    1: '/alumnos',
    2: '/tutores',
    3: '/coordinador-tutorias',
    4: '/coordinador-institucional',
    5: '/desarrollo-academico',
  }

  validarRutas(numero_rol:number){

    //Validamos que el numero de rol exista en la lista de rutas:
    if (this.listaRutas.hasOwnProperty(numero_rol)) {
      return [true,this.listaRutas[numero_rol]];
    }else{
      return '/auth/login';
    }

  }

  cerrarSesion() {

    //Verificamos que el localstorage tenga datos, asi evitamos estar cerrandos sesion:
    if (localStorage.getItem('id_usuario') && localStorage.getItem('id_rol') && localStorage.getItem('numero_checador')) {
      Swal.fire({
        icon: 'info',
        iconColor: 'rgb(128, 0, 0)',
        confirmButtonColor: 'rgb(128, 0, 0)',
        text: 'La sesion expiro por inactividad.',
        footer:' ',
        showConfirmButton: true,
        heightAuto: false,
      });

      setTimeout(()=>{
        localStorage.clear();
        this.router.navigate(['auth/login']);
      },2000);
    }



  }

  logout() {
    Swal.fire({
      icon: 'success',
      iconColor: 'rgb(128, 0, 0)',
      confirmButtonColor: 'rgb(128, 0, 0)',
      text: 'Sesion cerrada correctamente.',
      footer:' ',
      showConfirmButton: true,
      heightAuto: false,
    });

    setTimeout(()=>{
      localStorage.clear();
      this.router.navigate(['auth/login']);
    },2000);
  }



  avisos(){
    this.api.verAviso().subscribe(
      (res:any)=>{
        if(res.codigo === 1){

          let url_1 = res.data[0].url_1 === null || res.data[0].url_1 ==='' ? '': `<a href="${res.data[0].url_1}" target="_blank">Visitar link.</a>`;
          //Creamos la alerta con el aviso:
           Swal.fire({
            title: res.data[0].titulo,
            text: res.data[0].contenido,
            icon: 'info',
            footer: url_1,
            iconColor: 'rgb(128, 0, 0)',
            confirmButtonText: 'Aceptar',
            heightAuto: false,
            confirmButtonColor: 'rgb(128, 0, 0)',

            // timer: 3000

          });
        }
      }
    )
  }

}
