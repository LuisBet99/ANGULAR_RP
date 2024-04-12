import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class coordinadorInstGuard implements CanActivate  {
  constructor(private router: Router, private api: ApiService) {}


  canActivate(): boolean {
    //debugger;
    let rol = localStorage.getItem('id_rol');
    let id_usuario = localStorage.getItem('id_usuario');
    let numero_checador = localStorage.getItem('numero_checador');
    if (rol === '4' || rol === '5') {


      //Validamos ante la api, que el usuario, el rol y el numero checador coincidan.
      let data ={
        'id_usuario': id_usuario,
        'id_rol': rol,
        'numero_checador': numero_checador,
        'rol_verificar':4
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
