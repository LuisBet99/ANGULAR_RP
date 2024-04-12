// import { CanActivateFn } from '@angular/router';

// export const docentesGuard: CanActivateFn = (route, state) => {
//   return true;
// };
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

// export const coordinadorTutGuard: CanActivateFn = (route, state) => {
//   return true;
// };
@Injectable({
  providedIn: 'root'
})
export class docentesGuard implements CanActivate  {
  constructor(private router: Router, private api: ApiService) {}


  canActivate(): boolean {
    let rol = localStorage.getItem('id_rol');
    let id_usuario = localStorage.getItem('id_usuario');
    let numero_checador = localStorage.getItem('numero_checador');
    if (rol === '2') {


      //Validamos ante la api, que el usuario, el rol y el numero checador coincidan.
      let data ={
        'id_usuario': id_usuario,
        'id_rol': rol,
        'numero_checador': numero_checador,
        'rol_verificar':2
      }
      let acceso = this.api.validarUsuario(data)
      .subscribe(
        (res:any) =>{
          if(res.codigo ==1){
            return true; // Permitir el acceso a la ruta

          }else{
            // window.location.href = '/';
            return false; // Denegar el acceso a la ruta
          }
        }
      );

      return true;

  } else {
    window.location.href = '/';
    return false; // Denegar el acceso a la ruta
  }
  }

};
