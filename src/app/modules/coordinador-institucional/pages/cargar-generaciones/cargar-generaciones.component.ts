import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargar-generaciones',
  templateUrl: './cargar-generaciones.component.html',
  styleUrls: ['./cargar-generaciones.component.css']
})
export class CargarGeneracionesComponent {
  @Output() titulo = new EventEmitter<string>();
  @Output() loadSpinner = new EventEmitter<string>();


  // @Output() loadSpinner = new EventEmitter<string>();
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService,
  ){}

  ngOnInit(){
    this.titulo.emit('CARGA GENERACIONAL');
  }

  documentoDictamen: any = '';
  formulario = this.fb.group({
    nombreGeneracion: ['', Validators.required],
    fechaInicial: ['', Validators.required],
    fechaFinal: ['', Validators.required],
  });


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


  cargarGeneracion(){

    let data = {
      nombre: this.formulario.controls.nombreGeneracion.value,
      fecha_inicio_primer_periodo: this.formulario.controls.fechaInicial.value,
      fecha_final_primer_periodo: this.formulario.controls.fechaFinal.value
    }

    if(data.nombre === ''){
      Swal.fire({
        icon: 'info',
        iconColor: 'rgb(128, 0, 0)',
        title: 'Es necesario ingresar el nombre de la generacion.',
        text: '',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        timer: 2500,
      });

      return;
      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000);
    }
    if(data.fecha_inicio_primer_periodo === ''){
      Swal.fire({
        icon: 'info',
        iconColor: 'rgb(128, 0, 0)',
        title: 'Es necesario ingresar FECHA INICIAL.',
        text: '',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        timer: 2500,
      });
            return;

      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000);
    }
    if(data.fecha_final_primer_periodo === ''){
      Swal.fire({
        icon: 'info',
        iconColor: 'rgb(128, 0, 0)',
        title: 'Es necesario ingresar FECHA FINAL.',
        text: '',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        timer: 2500,
      });
      return;

      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000);
    }

    console.log('Data e enviar: ',data)
    this.loadSpinner.emit('true');

    this.api.crearGeneraciones(data)
      .pipe(
        catchError(
          (err)=>{
                this.loadSpinner.emit('false');

            Swal.fire({
          icon: 'info',
          iconColor: 'rgb(128, 0, 0)',
          title: 'Ocurrio un error, intentalo de nuevo.',
          text: '',
          footer: '',
          heightAuto: false,
          confirmButtonColor: 'rgb(128, 0, 0)',
          timer: 2500,
        });
            return err;
          }
        )
      )
      .subscribe(
        (res:any)=>{
          this.loadSpinner.emit('false');

          if(res.codigo === 1){
            Swal.fire({
              icon: 'success',
              iconColor: 'rgb(128, 0, 0)',
              title: 'Generacion cargada correctamente.',
              text: '',
              footer: '',
              heightAuto: false,
              confirmButtonColor: 'rgb(128, 0, 0)',
              timer: 2500,
            });
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
          if(res.codigo === 3){
            Swal.fire({
              icon: 'error',
              iconColor: 'rgb(128, 0, 0)',
              title: 'La generacion con ese nombre ya existe.',
              text: '',
              footer: '',
              heightAuto: false,
              confirmButtonColor: 'rgb(128, 0, 0)',
              showConfirmButton: false,
              allowOutsideClick: false,
              timer: 3500,
            });
            setTimeout(() => {
              window.location.reload();
            }, 4000);
          }
        }
      );

  }





}


