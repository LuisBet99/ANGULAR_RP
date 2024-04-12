import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargar-tutores',
  templateUrl: './cargar-tutores.component.html',
  styleUrls: ['./cargar-tutores.component.css'],
})
export class CargarTutoresComponent {
  lista_carreras: any[] = [];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService
  ) {}
  @Output() titulo = new EventEmitter<string>();

  ngOnInit() {
    this.titulo.emit('CARGAR TUTORES');

    this.api.obtenerCarreras().subscribe((res: any) => {
      this.lista_carreras = res.data;

      console.log('Lista de carreras: ', this.lista_carreras);
    });
  }

  lista_docentes_tutores: any[] = [];
  lista_docentes_no_tutores: any[] = [];
  id_carrera_seleccionada: any;
  carreraSeleccionada(event: any) {
    const id_carrera = event.target.value;
    this.id_carrera_seleccionada = id_carrera;
    let data = {
      id_carrera: id_carrera,
    };
    this.api.obtenerDocentesCarrera(data).subscribe((res: any) => {
      this.lista_docentes_tutores = res.docentes_tutores;
      this.lista_docentes_no_tutores = res.docentes_no_tutores;
    });
  }

  documentoDictamen: any = '';
  formulario = this.fb.group({
    generacion: ['', Validators.required],
    carrera: ['SELECCIONA UNA CARRERA', Validators.required],
    dictamen: ['', Validators.required],
    fecha: ['', Validators.required],
  });

  docenteSeleccionado(docenteCompleto: any, docente: any, carrera: any) {
    Swal.fire({
      icon: 'info',
      iconColor: 'rgb(128, 0, 0)',
      title: `Deseas agregar como tutor(a) al docente ${docenteCompleto.nombre} ${docenteCompleto.apellido_paterno} ${docenteCompleto.apellido_materno}?.`,
      footer: '',
      heightAuto: false,
      confirmButtonColor: 'rgb(128, 0, 0)',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      // timer: 2500,
    }).then((res) => {
      if (res.isConfirmed) {
        console.log('Data a enviar: ', docenteCompleto);
        //Mandamos la peticion ala API para agregar al tutor:
        this.api
          .asignarTutorCarrera(docenteCompleto)
          .pipe(
            catchError((err) => {
              Swal.fire({
                icon: 'error',
                iconColor: 'rgb(128, 0, 0)',
                title: 'Ocurrio un problema con la conexion.',
                text: 'Intentalo nuevamente.',
                footer: '',
                heightAuto: false,
                confirmButtonColor: 'rgb(128, 0, 0)',
                allowOutsideClick: false,
                allowEscapeKey: false,
                timer: 2500,
              });
              setTimeout(() => {
                window.location.reload();
              }, 3000);
              return err;
            })
          )
          .subscribe((res: any) => {
            if (res.codigo === 1) {
              Swal.fire({
                icon: 'success',
                iconColor: 'rgb(128, 0, 0)',
                title: 'Tutor asignado correctamente.',
                footer: '',
                heightAuto: false,
                confirmButtonColor: 'rgb(128, 0, 0)',
                allowOutsideClick: false,
                allowEscapeKey: false,
                timer: 2500,
              });
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }
            if (res.codigo === 2) {
              Swal.fire({
                icon: 'info',
                iconColor: 'rgb(128, 0, 0)',
                title: 'Ocurrio un problema al asignar el tutor.',
                text: 'Intentalo nuevamente.',
                footer: '',
                heightAuto: false,
                confirmButtonColor: 'rgb(128, 0, 0)',
                allowOutsideClick: false,
                allowEscapeKey: false,
                timer: 2500,
              });
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }
          });
      } else {
        //NO hacemos nada.
        window.location.reload();
      }
    });
  }
  archivoSeleccionado(event: any, tipoArchivo: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.documentoDictamen = reader.result as string;
      const base64String = this.documentoDictamen.toString().split(',')[1];
      this.documentoDictamen = base64String;
      // this.comisionFormulario.controls.dictamen.setValue(base64String)
    };
  }

  convertirMayusculas(control: FormControl) {
    control.setValue(control.value.toUpperCase());
  }

  //Esta funcion se utiliza para convertir la fecha y mostrarla en el input.
  convertirFecha(fecha: string): string {
    const fechaObjeto = new Date(fecha);
    const fechaFormateada = fechaObjeto.toISOString().split('T')[0];
    return fechaFormateada;
  }
}
