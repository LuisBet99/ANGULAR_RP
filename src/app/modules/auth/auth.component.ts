import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(
    private fb: FormBuilder,
    private api:ApiService
  ){

  }

   loginForm = this.fb.group({
    user: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  capturarEnter(event:any){
    if(event.key == 'Enter'){
      this.login();
    }
  }


  login(){
    let data = {
      numero_checador: this.loginForm.value.user,
      password: this.loginForm.value.password
    }

    if(data.numero_checador == '' || data.password == ''){
      Swal.fire({
        icon: 'info',
        iconColor: 'rgb(128, 0, 0)',
        title: 'Debes llenar todos los campos.',
        text: '',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        timer: 2500,
      });
      return;
     }

    this.api.loginGeneral(data)
      .pipe(
        catchError((err)=>{

          //Creamos una alerta mostrando el error con Swal:
          Swal.fire({
            icon: 'info',
            iconColor: 'rgb(128, 0, 0)',
            title: 'Ocurrio un error, intentalo de nuevo.',
            text: '',
            footer: '',
            heightAuto: false,
            confirmButtonColor: 'rgb(128, 0, 0)',
            timer: 3500,
          });



          return err;
        }
      ))
      .subscribe(
        (res:any)=>{

          if(res.codigo ==1){

            let nombreCompleto = res.data_usuario[0].nombre + ' ' + res.data_usuario[0].apellido_paterno + ' ' + res.data_usuario[0].apellido_materno;

            Swal.fire({
              icon: 'success',
              iconColor: 'rgb(128, 0, 0)',
              title: `Bienvenido ${nombreCompleto}.`,
              color: 'rgb(128, 0, 0)',
              text: '',
              footer: ' ',
              heightAuto: false,
              confirmButtonColor: 'rgb(128, 0, 0)',
              showConfirmButton: false,
              timer: 3500,
            });
          //   {
          //     "codigo": 1,
          //     "mensaje": "Login correcto",
          //     "usuario": {
          //         "id": 4,
          //         "name": "192310781",
          //         "password": "192310781",
          //         "numero_checador": "192310781",
          //         "id_rol": 4,
          //         "remember_token": null,
          //         "created_at": null,
          //         "updated_at": null,
          //         "nombre": "COORDINADOR_INST"
          //     },
          //     "data_usuario": {
          //         "id": 1,
          //         "nombre": "ALAN",
          //         "apellido_paterno": "CUEVAS",
          //         "apellido_materno": "MELENDEZ",
          //         "numero_checador": "192310781",
          //         "mostrar": 1,
          //         "id_usuario": 1,
          //         "id_carrera": 1,
          //         "nombre_carrera": "INGENIERÍA INFORMÁTICA"
          //     }
          // }
            //Guardamos los datos del usuario:
            localStorage.setItem('id_usuario',res.usuario[0].id);
            localStorage.setItem('id_rol',res.usuario[0].id_rol);
            localStorage.setItem('nombre_rol',res.usuario[0].role_nombre);
            localStorage.setItem('numero_checador',res.usuario[0].numero_checador);
            localStorage.setItem('data_usuario',JSON.stringify(res.data_usuario[0]));

            //Redireccionamos al usuario dependiendo del rol:
            setTimeout(() => {
              switch (res.usuario[0].id_rol) {
                case 5:
                  // Aqui les dejammos las mismas vistas, pero con ngif mostrar y ocultamos menus.
                  window.location.href = '/coordinador-institucional';
                  break;
                case 4:
                  window.location.href = '/coordinador-institucional';
                  break;
                case 3:
                  window.location.href = '/coordinador-tutorias';
                  break;
                case 2:
                  window.location.href = '/tutores';
                  break;
                case 1:
                  window.location.href = '/alumnos';
                  break;
                default:
                  break;
              }
            }, 3000);






          }
          if(res.codigo==2){
            Swal.fire({
              icon: 'info',
              iconColor: 'rgb(128, 0, 0)',
              title: 'Usuario o contraseña incorrectos.',
              text: 'Verifica los datos ingresados',
              footer: '',
              heightAuto: false,
              confirmButtonColor: 'rgb(128, 0, 0)',
              timer: 2500,
            });
          }
        }
      );
  }

  recuperarPassword(){
    console.log('Hola desde recuperar password!')
  }

}
