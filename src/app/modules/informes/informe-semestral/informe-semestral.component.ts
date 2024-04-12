import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DatosInformesService } from 'src/app/services/datos-informes.service';
import Swal from 'sweetalert2';

export interface Validacion {
  codigo: number;
  mensaje: string;
  data: Data;
}

export interface Data {
  totalNumeroSesiones: number;
  porcentajeTotalNumeroAsistencias: number;
  totalNumeroHorasAtencion: number;
  totalNumeroCanalizaciones: number;
  actividadTutorialPrep: string;
  modalidadPrep: string;
  situacionProblematicaPrep: string;
  tipoCanalizacionPrep: string;
  becaCanalizacionPrep: string;
  canalizacionAtendidaPrep: string;
  totalNumeroDiagnosticos: number;
}

@Component({
  selector: 'app-informe-semestral',
  templateUrl: './informe-semestral.component.html',
  styleUrls: ['./informe-semestral.component.css'],
})
export class InformeSemestralComponent {
  constructor(
    private datosInformesService: DatosInformesService,
    private fb: FormBuilder,
    private api: ApiService
  ) {}

  @Output() titulo = new EventEmitter<string>();
  @Output() loadSpinner = new EventEmitter<string>();
  loadinges: string = 'false';
  mostrarSidenav = false;
  colorSpinner: any = 'rgb(128, 0, 0)';
  titutloEstructura: string = '';
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
  // Recibimos los datos del servicio:

  data: any = [];
  data_informe: any = [];
  nombre_alumno: string = '';
  valoresInicialesFormulario: any;
  nombre_informe: string = '';
  listaModalidades: any[] = [];
  listaCanalizaciones: any[] = [];
  listaSituacionesProblematicas: any[] = [];
  listaActividadesTutorial: any[] = [];
  listaLogros: any[] = [];
  listaBecas: any[] = [];
  listaCanalizacionesBecas: any[] = [];

  validacion: Validacion = {
    codigo: 0,
    mensaje: '',
    data: {
      totalNumeroSesiones: 0,
      porcentajeTotalNumeroAsistencias: 0,
      totalNumeroHorasAtencion: 0,
      totalNumeroCanalizaciones: 0,
      actividadTutorialPrep: '',
      modalidadPrep: '',
      situacionProblematicaPrep: '',
      tipoCanalizacionPrep: '',
      becaCanalizacionPrep: '',
      canalizacionAtendidaPrep: '',
      totalNumeroDiagnosticos: 0,
    },
  };

  ngOnInit() {
    this.data = this.datosInformesService.getData();
    this.data_informe = this.datosInformesService.getDataInforme();
    console.log('Esta es la data del alumno: ', this.data);
    console.log('Esta es la data del informe: ', this.data_informe);
    this.nombre_informe = this.data_informe.nombre_informe;
    this.nombre_alumno = `${this.data.NombreAlumno} ${this.data.ApellidoPaternoAlumno} ${this.data.ApellidoMaternoAlumno}`;
    this.valoresInicialesFormulario = this.formulario.value;
    // this.loadinges = 'true';
    this.api.tipos_beca().subscribe((res: any) => {
      console.log('Estas son las becas: ', res);
      this.listaBecas = res.data;
      this.api.tipos_actividad().subscribe((res: any) => {
        this.listaActividadesTutorial = res.data;
        this.api.tipos_canalizacion().subscribe((res: any) => {
          this.listaCanalizaciones = res.data;
          this.api.tipos_canalizacion_becas().subscribe((res: any) => {
            this.listaCanalizacionesBecas = res.data;
            this.api.tipos_logros().subscribe((res: any) => {
              this.listaLogros = res.data;
              this.api.tipos_modalidad().subscribe((res: any) => {
                this.listaModalidades = res.data;
                this.api.tipos_situacion().subscribe((res: any) => {
                  this.listaSituacionesProblematicas = res.data;
                  // this.titulo.emit('Primer informe');


                  this.api
                    .obtenerDatosReporteSemestralIndividual(this.data)
                    .subscribe((res: any) => {
                      this.validacion = res;
                      console.log(
                        'Esta es la validacion DE LA GENERACION: ',
                        this.validacion
                      );
                      this.formulario.controls.segunda.setValue(
                        this.validacion.data.totalNumeroSesiones.toString()
                      );
                      this.formulario.controls.tercera.setValue(
                        this.validacion.data.totalNumeroHorasAtencion.toString()
                      );
                      this.formulario.controls.cuarta.setValue(
                        this.validacion.data.porcentajeTotalNumeroAsistencias.toString()
                      );
                      this.loadinges = 'false';
                    });
                  //Desactivamos todos los inputs:
                  this.formulario.controls.segunda.disable();
                  this.formulario.controls.tercera.disable();
                  this.formulario.controls.cuarta.disable();
                  this.formulario.controls.quinta.disable();
                  this.formulario.controls.sexta.disable();
                  this.formulario.controls.septima.disable();
                  this.formulario.controls.decima.disable();
                  this.formulario.controls.onceava.disable();
                  this.formulario.controls.doceava.disable();

                  this.activarInputs();
                });
              });
            });
          });
        });
      });
    });
    // this.loadSpinner.emit('true')
  }
  mostrar: boolean = true;

  formulario = this.fb.group({
    primera: [''], //Asistencia
    segunda: [''], //numero de sesiones
    tercera: [''], //horas de atencion
    cuarta: [''], //actividad tutorial
    quinta: [''], //modalidad
    sexta: [''], //situacion problematica
    septima: [''], //canalizacion
    octava: [''],
    novena: [''],
    decima: [''], // Tipo de canalizacion.
    onceava: [''], // becas canalizacion.
    doceava: [''],
    numero_sesiones: [0],
    horas_atencion: [0],
    asistencia: [0],
  });

  activarInputs(event: any = 'SI') {
    let valor = event;
    console.log('Este es el valor: ', valor);

    if (valor == 'SI') {
      this.mostrar = true;

      //this.formulario.controls.segunda.enable();
      // No activamos el de la beca porque no es necesario.
      // this.formulario.controls.tercera.enable();
      // this.formulario.controls.cuarta.enable();
      this.formulario.controls.quinta.enable();
      this.formulario.controls.sexta.enable();
      this.formulario.controls.septima.enable();
      this.formulario.controls.octava.enable();
      // this.formulario.controls.novena.enable();

      this.formulario.controls.horas_atencion.setValue(1);
      this.formulario.controls.asistencia.setValue(33);
      this.formulario.controls.numero_sesiones.setValue(2);
    } else {
      this.mostrar = false;
      //Reseteamos los valores de todo formulario:
      this.formulario.controls.segunda.setValue('');
      this.formulario.controls.tercera.setValue('');
      this.formulario.controls.cuarta.setValue('');
      this.formulario.controls.quinta.setValue('');
      this.formulario.controls.sexta.setValue('');
      this.formulario.controls.septima.setValue('');
      this.formulario.controls.octava.setValue('');
      this.formulario.controls.novena.setValue('');
      this.formulario.controls.decima.setValue('');
      this.formulario.controls.onceava.setValue('');
      this.formulario.controls.doceava.setValue('');
      this.formulario.controls.horas_atencion.setValue(0);
      this.formulario.controls.asistencia.setValue(0);
      this.formulario.controls.numero_sesiones.setValue(0);
    }
  }
  activarCanalizacion(event: any) {
    if (event.target.value == 'SI') {
      this.formulario.controls.decima.enable();
      this.formulario.controls.doceava.enable();
    }
    if (event.target.value == 'NO') {
      this.formulario.controls.decima.disable();
      this.formulario.controls.onceava.disable();
      this.formulario.controls.doceava.disable();

      this.formulario.controls.decima.setValue('');
      this.formulario.controls.onceava.setValue('');
      this.formulario.controls.doceava.setValue('');
    }
  }
  seleccionCanalizacion(event: any) {
    let valor = event.target.value;
    console.log('Este es el valor de la canalizacion: ', valor);
    if (valor == 'BE') {
      this.formulario.controls.onceava.enable();
    } else {
      this.formulario.controls.onceava.disable();
      this.formulario.controls.onceava.setValue('');
    }
  }
  activaInputCanalizacion(event: any) {
    let valor = event.target.value;
    console.log('Este es el valor: ', valor);
    if (valor == 'SI') {
      this.formulario.controls.octava.enable();
      // this.formulario.controls.cuarta.setValue('SI');
    }
    if (valor == 'NO') {
      this.formulario.controls.octava.disable();
      this.formulario.controls.octava.setValue('NA');
    }
  }

  activaInputBeca(event: any) {
    let valor = event.target.value;
    console.log('Este es el valor: ', valor);
    if (valor == 'SI') {
      this.formulario.controls.cuarta.enable();
    }
    if (valor == 'NO') {
      this.formulario.controls.cuarta.disable();
      this.formulario.controls.cuarta.setValue('NA');
    }
  }
  agregarCerosAlMes(mes:any) {
    if (mes < 10) {
      return `0${mes}`;
    } else {
      return `${mes}`;
    }
  }

  fechaActual:any;
  obtenerFechaActual() {
    const fechaActual_original = new Date();
    const year = fechaActual_original.getFullYear();
    const month = this.agregarCerosAlMes(fechaActual_original.getMonth() + 1); // Sumamos 1 para obtener el mes correcto
    const day = fechaActual_original.getDate();
    const hours = fechaActual_original.getHours();
    const minutes = fechaActual_original.getMinutes();
    const seconds = fechaActual_original.getSeconds();
    // this.fechaActual = new Date().toISOString().split('T')[0];
    const fechaConTiempoPersonalizado = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    // this.fechaActual = fechaActual_original.toISOString().split('T')[0];
    this.fechaActual =fechaConTiempoPersonalizado;
  }

  enviarInforme() {

    //Evaluamos el periodo si es "PRIMERO = 1" o "SEGUNDO = 2" o "TERCERO = 3
    let periodo: any =
    this.data_informe.periodo === 'PRIMERO' ? 1 :
    this.data_informe.periodo === 'SEGUNDO' ? 2 :
    this.data_informe.periodo === 'TERCERO' ? 3 :
    4;

    let data = {
      segunda: this.formulario.controls.segunda.value!, //Numero de sesiones
      tercera: this.formulario.controls.tercera.value!, //Horas de atencion
      cuarta: this.formulario.controls.cuarta.value,  //Asistencia
      quinta: this.formulario.controls.quinta.value, //Actividad tutorial
      sexta: this.formulario.controls.sexta.value, //Situacion problematica
      septima: this.formulario.controls.septima.value!, //LOGROS
      octava: this.formulario.controls.octava.value!, //OBSERVACIONES
      id_alumno: this.data.id_alumno,
      id_tutor: this.data.id_tutor,
      periodo: periodo,
      id_generacion: this.data_informe.id_generacion,

      fecha: this.obtenerFechaActual(),


      //Agregamos las claves preponderantes:
      totalNumeroDiagnosticos: this.validacion.data.totalNumeroDiagnosticos,
      totalNumeroSesiones: this.validacion.data.totalNumeroSesiones,
      porcentajeTotalNumeroAsistencias:this.validacion.data.porcentajeTotalNumeroAsistencias,
      totalNumeroHorasAtencion: this.validacion.data.totalNumeroHorasAtencion,
      totalNumeroCanalizaciones: this.validacion.data.totalNumeroCanalizaciones,
      actividadTutorialPrep: this.validacion.data.actividadTutorialPrep,
      modalidadPrep: this.validacion.data.modalidadPrep,
      situacionProblematicaPrep: this.validacion.data.situacionProblematicaPrep,
      tipoCanalizacionPrep: this.validacion.data.tipoCanalizacionPrep,
      becaCanalizacionPrep: this.validacion.data.becaCanalizacionPrep,
      canalizacionAtendidaPrep: this.validacion.data.canalizacionAtendidaPrep,
    };

    if (
      data.segunda == '' ||
      data.segunda == null ||
      data.segunda == undefined
    ) {
      Swal.fire({
        icon: 'error',
        iconColor: 'rgb(128, 0, 0)',
        title: 'NO confirmaste el NUMERO DE SESIONES TOTALES.',
        text: 'Vuelve a cargar los datos.',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 2500,
      });
      return;
    }
    if (
      data.tercera == '' ||
      data.tercera == null ||
      data.tercera == undefined
    ) {
      Swal.fire({
        icon: 'error',
        iconColor: 'rgb(128, 0, 0)',
        title: 'NO confirmaste las HORAS DE ATENCION TOTALES.',
        text: 'Vuelve a cargar los datos.',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 2500,
      });
      return;
    }
    if (data.cuarta == '' || data.cuarta == null || data.cuarta == undefined) {
      Swal.fire({
        icon: 'error',
        iconColor: 'rgb(128, 0, 0)',
        title: 'NO confirmaste el PORCENTAJE DE ASISTENCIA.',
        text: 'Vuelve a cargar los datos.',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 2500,
      });
      return;
    }

    //Valida los demas datos por completo de la misma forma
    if (data.quinta == '' || data.quinta == null || data.quinta == undefined) {
      Swal.fire({
        icon: 'error',
        iconColor: 'rgb(128, 0, 0)',
        title: 'NO confirmaste la ACTIVIDAD TUTORIAL.',
        text: 'Vuelve a cargar los datos.',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 2500,
      });
      return;
    }
    if (data.sexta == '' || data.sexta == null || data.sexta == undefined) {
      Swal.fire({
        icon: 'error',
        iconColor: 'rgb(128, 0, 0)',
        title: 'NO confirmaste la SITUACION PROBLEMÁTICA.',
        text: 'Vuelve a cargar los datos.',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 2500,
      });
      return;
    }

    if (
      data.septima == '' ||
      data.septima == null ||
      data.septima == undefined
    ) {
      Swal.fire({
        icon: 'error',
        iconColor: 'rgb(128, 0, 0)',
        title: 'NO confirmaste la CANALIZACION.',
        text: 'Vuelve a cargar los datos.',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 2500,
      });
      return;
    }

    if (data.octava == '' || data.octava == null || data.octava == undefined) {
      Swal.fire({
        icon: 'error',
        iconColor: 'rgb(128, 0, 0)',
        title: 'NO agregaste las observaciones finales.',
        text: ' ',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 2500,
      });
      return;
    }
    this.api.cargarInformeSemestralIndividual(data)
      .pipe(
        catchError((err) => {
          Swal.fire({
            icon: 'error',
            iconColor: 'rgb(128, 0, 0)',
            title: 'Error al cargar el informe.',
            text: 'Vuelve a cargar los datos.',
            footer: '',
            heightAuto: false,
            confirmButtonColor: 'rgb(128, 0, 0)',
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 3500,
          });
          return err;
        })
      )
    .subscribe(
      (res:any)=>{
        if(res.codigo == 1){
          Swal.fire({
            icon: 'success',
            iconColor: 'rgb(128, 0, 0)',
            title: 'Informe cargado con éxito.',
            text: ' ',
            footer: '',
            heightAuto: false,
            confirmButtonColor: 'rgb(128, 0, 0)',
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 2500,
          });
        }
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    )

    return true;
  }
}
