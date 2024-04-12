import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-generaciones',
  templateUrl: './ver-generaciones.component.html',
  styleUrls: ['./ver-generaciones.component.css'],
})
export class VerGeneracionesComponent {
  @Output() titulo = new EventEmitter<string>();
  @Output() loadSpinner = new EventEmitter<string>();

  mostrarPeriodos: boolean = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService
  ) {}

  fechas_sesion_periodo: any[] = [];
  generaciones: any[] = [];

  nombreGeneracion: string = '';

  ngOnInit() {
    this.titulo.emit('VER/EDITAR GENERACIONES');

    this.api.obtenerGeneraciones().subscribe((res: any) => {
      this.generaciones = res.data;
      console.log('Generaciones: ', this.generaciones);
    });
  }

  documentoDictamen: any = '';
  formulario = this.fb.group({
    periodo: [''],
    generacion: [''],

    nombreGeneracion: ['', Validators.required],
    fechaInicialPrimeraSesion: ['', Validators.required],
    fechaFinalPrimeraSesion: ['', Validators.required],

    fechaInicialSegundaSesion: ['', Validators.required],
    fechaFinalSegundaSesion: ['', Validators.required],

    fechaInicialTerceraSesion: ['', Validators.required],
    fechaFinalTerceraSesion: ['', Validators.required],
  });

  GeneracionSeleccionado(periodo: any) {
    this.mostrarPeriodos = false;

    const ID_GENERACION = periodo.target.value;
    console.log('GENERACION seleccionado: ', ID_GENERACION);
    this.formulario.controls.generacion.setValue(ID_GENERACION);

    const selectedOption = this.generaciones.find(
      (generacion: { id: number }) => generacion.id === parseInt(ID_GENERACION)
    );
    console.log('Opcion seleccionada: ', selectedOption);
    this.NombregeneracionSeleccionado = selectedOption
      ? selectedOption.nombre
      : '';
    this.nombreGeneracion = this.NombregeneracionSeleccionado;
    this.api
      .obtenerPeriodosFechasGeneracion({ id_generacion: ID_GENERACION })
      .subscribe((res: any) => {
        console.log(res);
        this.fechas_sesion_periodo = res;
      });
  }

  NombreperiodoSeleccionado: string = '';
  NombregeneracionSeleccionado: string = '';
  periodoSeleccionado(periodo: any) {
    const periodo_id = periodo.target.value;
    console.log('Periodo seleccionado: ', periodo_id);
    this.mostrarPeriodos = true;

    const selectedOption = this.fechas_sesion_periodo.find(
      (emp: { id: number }) => emp.id === parseInt(periodo_id)
    );
    console.log('Opcion seleccionada: ', selectedOption);
    this.NombregeneracionSeleccionado = selectedOption
      ? selectedOption.id_generacion
      : '';
    this.NombreperiodoSeleccionado = selectedOption
      ? selectedOption.id_periodo
      : '';
    this.formulario.controls.periodo.setValue(this.NombreperiodoSeleccionado);

    const fechaInicialPrimeraSesion = selectedOption
      ? selectedOption.id_fecha_primera_sesion[0].fecha_inicio
      : '';
    const fechaFinalPrimeraSesion = selectedOption
      ? selectedOption.id_fecha_primera_sesion[0].fecha_final
      : '';

    const fechaInicialSegundaSesion = selectedOption
      ? selectedOption.id_fecha_segunda_sesion[0].fecha_inicio
      : '';
    const fechaFinalSegundaSesion = selectedOption
      ? selectedOption.id_fecha_segunda_sesion[0].fecha_inicio
      : '';

    const fechaInicialTerceraSesion = selectedOption
      ? selectedOption.id_fecha_tercera_sesion[0].fecha_inicio
      : '';
    const fechaFinalTerceraSesion = selectedOption
      ? selectedOption.id_fecha_tercera_sesion[0].fecha_inicio
      : '';
    this.formulario.patchValue({
      fechaInicialPrimeraSesion: fechaInicialPrimeraSesion,
      fechaFinalPrimeraSesion: fechaFinalPrimeraSesion,

      fechaInicialSegundaSesion: fechaInicialSegundaSesion,
      fechaFinalSegundaSesion: fechaFinalSegundaSesion,

      fechaInicialTerceraSesion: fechaInicialTerceraSesion,
      fechaFinalTerceraSesion: fechaFinalTerceraSesion,
    });
    // this.consultorioFormActualizar.controls.numero.disable()
    // // this.usuarioFormActualizar.controls.rol.disable()
    // this.consultorioFormActualizar.setErrors(null);
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

  cargarGeneracion() {
    let data = {
      id_periodo: parseInt(this.formulario.controls.periodo.value!.toString()),
      id_generacion: parseInt(
        this.formulario.controls.generacion.value!.toString()
      ),
      fechaInicialPrimeraSesion:
        this.formulario.controls.fechaInicialPrimeraSesion.value,
      fechaFinalPrimeraSesion:
        this.formulario.controls.fechaFinalPrimeraSesion.value,

      fechaInicialSegundaSesion:
        this.formulario.controls.fechaInicialSegundaSesion.value,
      fechaFinalSegundaSesion:
        this.formulario.controls.fechaFinalSegundaSesion.value,

      fechaInicialTerceraSesion:
        this.formulario.controls.fechaInicialTerceraSesion.value,
      fechaFinalTerceraSesion:
        this.formulario.controls.fechaFinalTerceraSesion.value,
    };
    console.log('Valor del formulario: ', data);

    Swal.fire({
      icon: 'info',
      iconColor: 'rgb(128, 0, 0)',
      title: `¿Estas seguro de actualizar las fechas para la GENERACION: ${this.nombreGeneracion.toUpperCase()} y el PERIODO: ${
        this.NombreperiodoSeleccionado
      }? `,
      text: '',
      footer: '',
      heightAuto: false,
      confirmButtonColor: 'rgb(128, 0, 0)',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      showCloseButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        this.loadSpinner.emit('true');
        this.api
          .actualizarFechasGeneracion(data)
          .pipe(
            catchError((err) => {
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
            })
          )
          .subscribe(

            (res:any)=>{
              this.loadSpinner.emit('false');

              if(res.codigo === 1){
                Swal.fire({
                  icon: 'success',
                  iconColor: 'rgb(128, 0, 0)',
                  title: 'Fechas actualizadas correctamente.',
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
              return res;
            }
          );
      }
    });
  }
}
