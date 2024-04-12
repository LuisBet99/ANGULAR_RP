import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css'],
})
export class AvisosComponent {
  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit() {
    console.log('AvisosComponent');
    this.titulo.emit('CREAR AVISOS');

  }
  @Output() loadSpinner = new EventEmitter<string>();
  @Output() titulo = new EventEmitter<string>();

  formulario = this.formBuilder.group({
    titulo: [''],
    contenido: [''],
    fecha: [''],
    imagen_1: [''],
    imagen_2: [''],
    imagen_3: [''],
    url_1: [''],
    url_2: [''],
    url_3: [''],
    mostrar: [false],
  });

  guardar() {
    let data = {
      titulo: this.formulario.value.titulo,
      contenido: this.formulario.value.contenido,
      fecha: this.formulario.value.fecha,
      imagen_1: this.formulario.value.imagen_1,
      imagen_2: this.formulario.value.imagen_2,
      imagen_3: this.formulario.value.imagen_3,
      url_1: this.formulario.value.url_1,
      url_2: this.formulario.value.url_2,
      url_3: this.formulario.value.url_3,
      mostrar: this.formulario.value.mostrar,
    };

    //Validamos el titulo, contenido con swal:
    if (data.titulo == '' || data.contenido == '') {
      Swal.fire({
        icon: 'info',
        title: 'Campos vacios, no se puede guardar',
        text: 'El titulo y contenido son obligatorios',
        heightAuto: false,
        confirmButtonText: 'Aceptar',
        iconColor: 'rgba(176, 60, 60, 0.944)',
        confirmButtonColor: 'rgba(176, 60, 60, 0.944)',
        footer: '',
      });

      return false;
    }


    //HAcemos una pregunta con swal, si desea crear una aviso, ya que se sustiuira el anterior:
    Swal.fire({
      icon: 'question',
      title: '¿Deseas crear un nuevo aviso?',
      text: 'Se sustituira el anterior',
      heightAuto: false,
      confirmButtonText: 'Aceptar',
      iconColor: 'rgba(176, 60, 60, 0.944)',
      confirmButtonColor: 'rgba(176, 60, 60, 0.944)',
      footer: '',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'rgb(128, 0, 0)',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadSpinner.emit('true');

        //Enviamos los datos a la API:
        this.api
          .crearAviso(data)

          .pipe(
            catchError((err: any) => {
              this.loadSpinner.emit('false');
              Swal.fire({
                icon: 'error',
                title: 'Error al crear el aviso',
                text: err.error.mensaje,
                heightAuto: false,
                confirmButtonText: 'Aceptar',
                iconColor: 'rgb(128, 0, 0)',
                confirmButtonColor: 'rgb(128, 0, 0)',
                footer: '',
              });
                setTimeout(() => {
                  window.location.reload();
              }, 2500);
              return err;
            })
          )
          .subscribe((res: any) => {
            this.loadSpinner.emit('false');
            if(res.codigo === 1){
              Swal.fire({
                icon: 'success',
                title: 'Aviso creado correctamente',
                text: '',
                heightAuto: false,
                confirmButtonText: 'Aceptar',
                iconColor: 'rgb(128, 0, 0)',
                confirmButtonColor: 'rgb(128, 0, 0)',
                footer: '',
              });
              setTimeout(() => {
                  window.location.reload();
              }, 2500);
            }

            if(res.codigo===2){
              Swal.fire({
                icon: 'info',
                title:res.mensaje,
                text: '',
                heightAuto: false,
                confirmButtonText: 'Aceptar',
                iconColor: 'rgb(128, 0, 0)',
                confirmButtonColor: 'rgb(128, 0, 0)',
                footer: '',
              });
              setTimeout(() => {
                window.location.reload();
            }, 2500);
            }
          });
      } else {
        this.loadSpinner.emit('false');
      }
    });
    return true;

  }

}
