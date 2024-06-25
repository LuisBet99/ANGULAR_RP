import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, pipe } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { PrimerInformeComponent } from '../../../informes/primer-informe/primer-informe.component';
import { DatosInformesService } from 'src/app/services/datos-informes.service';
import { SegundoInformeComponent } from 'src/app/modules/informes/segundo-informe/segundo-informe.component';
import { TercerInformeComponent } from 'src/app/modules/informes/tercer-informe/tercer-informe.component';
import { InformeSemestralComponent } from 'src/app/modules/informes/informe-semestral/informe-semestral.component';
import { DataUsuarioService } from 'src/app/services/data-usuario.service';


export interface Validacion {
  codigo:                    number;
  mensaje:                   string;
  PRIMERO:                   Primero;
  SEGUNDO:                   Primero;
  TERCERO:                   Primero;
  TOTAL_INFORMES_TERMINADOS: number;
  PENDIENTES_TOTALES:        number;
  ESTATUS:                   number;
}

export interface Primero {
  total_primer_informe_terminado?:  number;
  total_tutorados:                  number;
  pendientes:                       number;
  estatus:                          number;
  total_segundo_informe_terminado?: number;
  total_tercer_informe_terminado?:  number;
}

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
    private api: ApiService,
    public dialog: Dialog,
    private datosInformesService: DatosInformesService,
    private data_usuario: DataUsuarioService
  ) {}



  fechas_sesion_periodo: any[] = [];
  generaciones: any[] = [];
  carreras: any[] = [];
  fecha_inicio: string = '';
  fecha_fin: string = '';

  periodo: any[] = [
    { nombre: 'PRIMERO' },
    { nombre: 'SEGUNDO' },
    { nombre: 'TERCERO' },
    { nombre: 'CUARTO' },
  ];

  informes: any[] = [
    { nombre: 'PRIMER INFORME', valor: 'primer_informe' },
    { nombre: 'SEGUNDO INFORME', valor: 'segundo_informe' },
    { nombre: 'TERCER INFORME', valor: 'tercer_informe' },
  ];

  openDialog(alumno: any): void {


    const fecha_actual = new Date(this.fechaFormateada2);
    const fecha_final = new Date(this.fecha_fin);
    const fecha_inicio = new Date(this.fecha_inicio);
    // 10/09/2023  === 09/09/2023
    if(fecha_actual > fecha_final){
      Swal.fire({
        icon: 'info',
        iconColor: 'rgb(128, 0, 0)',
        title: 'No puedes capturar el informe.',
        text: 'El periodo de entrega de informes ya finalizo.',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        allowOutsideClick: false,
        allowEscapeKey: false,

      });
      return;
    }

    if(fecha_actual < fecha_inicio){
      Swal.fire({
        icon: 'info',
        iconColor: 'rgb(128, 0, 0)',
        title: 'No puedes capturar el informe.',
        text: 'El periodo de entrega aun no comienza.',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      return;
    }


    let data_informe = {
      id_generacion: this.formulario.controls.generacion.value,
      periodo: this.formulario.controls.periodo.value,
      informe: this.formulario.controls.informe.value,
      nombre_informe: '',
    };

    if(this.data.ESTATUS === 1){


      alumno.periodo = data_informe.periodo === 'PRIMERO' ? 1 : data_informe.periodo === 'SEGUNDO' ? 2 : data_informe.periodo === 'TERCERO' ? 3: 4;

      //Primero validamos que el alumno pueda registrar un infome semestral:
      let id_alumno = alumno.id;
      let id_tutor= localStorage.getItem('id_usuario');
      let id_generacion = parseInt(this.formulario.controls.generacion.value?.toString()!);
      let periodo = alumno.periodo;
      let data = {
       'id_alumno': id_alumno,
        'id_tutor': id_tutor,
        'id_generacion': id_generacion,
        'periodo': periodo

      }
      this.loadSpinner.emit('true');
      this.api.verificarAlumnoReporteSemestral(data)
      .pipe(
        (catchError((err) => {
          this.loadSpinner.emit('false');
          Swal.fire({
            icon: 'info',
            iconColor: 'rgb(128, 0, 0)',
            title: 'Intentalo nuevamente.',
            text: ` `,
            footer: '',
            heightAuto: false,
            confirmButtonColor: 'rgb(128, 0, 0)',
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
          return err;
        }
      )))
      .subscribe((res: any) => {

        if(res.codigo === 1){
          this.loadSpinner.emit('false');
          Swal.fire({
            icon: 'info',
            iconColor: 'rgb(128, 0, 0)',
            title: 'No puedes capturar el informe.',
            text: `${res.mensaje}`,
            footer: '',
            heightAuto: false,
            confirmButtonColor: 'rgb(128, 0, 0)',
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        }else{
          setTimeout(() => {
            this.loadSpinner.emit('false');

            const modal: any = this.dialog.open(InformeSemestralComponent, {
              width: '100%',
              disableClose: false,
            });
            data_informe.nombre_informe = 'INFORME SEMESTRAL';
            this.datosInformesService.setData(alumno, data_informe);
          },1000);


        }

      });

      // this.datosInformesService.setData(alumno, data_informe);
    }

    if (this.formulario.controls.informe.value == 'primer_informe' && this.data.ESTATUS === 0) {
      const modal: any = this.dialog.open(PrimerInformeComponent, {
        width: '100%',
        disableClose: false,
      });

      data_informe.nombre_informe = 'PRIMER INFORME';
      //Mandamos los datos al servicio:
      this.datosInformesService.setData(alumno, data_informe);
    }

    if (this.formulario.controls.informe.value == 'segundo_informe' && this.data.ESTATUS === 0) {
      const modal: any = this.dialog.open(SegundoInformeComponent, {
        width: '100%',
        disableClose: false,
      });
      data_informe.nombre_informe = 'SEGUNDO INFORME';

      //Mandamos los datos al servicio:
      this.datosInformesService.setData(alumno, data_informe);
    }
    if (this.formulario.controls.informe.value == 'tercer_informe' && this.data.ESTATUS === 0) {
      const modal: any = this.dialog.open(SegundoInformeComponent, {
        width: '100%',
        disableClose: false,
      });
      data_informe.nombre_informe = 'TERCER INFORME';

      //Mandamos los datos al servicio:
      this.datosInformesService.setData(alumno, data_informe);
    }
  }

  fechas_asignadas: any = [];
  fechas_primera_sesion: any = [];
  fechas_segunda_sesion: any = [];
  fechas_tercera_sesion: any = [];


  fechaFormateada: string =''; //10/09/2021
  fechaFormateada2: string =''; // 2021/09/10

  nombreGeneracion: string = '';
  id_tutor: number = 0;
  ngOnInit() {

    this.data_usuario.obtenerDatosLocalStorage();
    this.id_tutor = parseInt(this.data_usuario.id_usuario);
    const fechaActual = new Date();
    const formatoFecha:any = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    };
    this.fechaFormateada = fechaActual.toLocaleDateString('es-ES', formatoFecha);
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Agregar 1 porque enero es 0
    const anio = fechaActual.getFullYear();

    this.fechaFormateada2= `${anio}-${mes}-${dia}`;
    this.fechaFormateada = fechaActual.toLocaleDateString('es-ES', formatoFecha);

    console.log('Fecha actual: ', this.fechaFormateada);
    console.log('Fecha actual2: ', this.fechaFormateada2);

    this.titulo.emit('CARGAR INFORMES');
    this.loadSpinner.emit('true');
    this.api
      .obtenerGeneracionesTutores()
      .pipe(
        catchError((err) => {
          this.loadSpinner.emit('false');

          return err;
        })
      )
      .subscribe((res: any) => {
        this.generaciones = res.data;

        console.log('Generaciones: ', this.generaciones);
        this.loadSpinner.emit('false');
      });
  }

  documentoDictamen: any = '';
  formulario = this.fb.group({
    tutor: [1],
    periodo: [''],
    generacion: [''],
    informe: [''],
  });

  clickInforme(event: any) {
    this.formulario.controls.informe.setValue('');
  }

  clickPeriodo(event: any) {
    this.formulario.controls.periodo.setValue('');
  }
  clickGeneracion(event: any) {
    this.formulario.controls.generacion.setValue('');
  }
  GeneracionSeleccionado(periodo: any) {
    this.mostrarPeriodos = false;
    const ID_GENERACION = periodo.target.value;
    console.log('GENERACION seleccionado: ', ID_GENERACION);
    this.formulario.controls.generacion.setValue(ID_GENERACION);
  }
  periodoSeleccionada(carrera: any) {
    this.mostrarPeriodos = false;

    const carrera_id = carrera.target.value;
    this.formulario.controls.periodo.setValue(carrera_id);
  }
  informeSeleccionado(informe: any) {
    this.mostrarPeriodos = false;

    const informe_id = informe.target.value;
    this.formulario.controls.informe.setValue(informe_id);
  }

  lista_alumnos: any[] = [];
  lista_docentes: any[] = [];
  NombreperiodoSeleccionado: string = '';
  NombregeneracionSeleccionado: string = '';
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

  cargarGeneracion() {}

  // Mapa para almacenar las asignaciones de docentes y alumnos
  asignaciones: Map<any, any[]> = new Map();
  mostrar_btn_guardar: boolean = false;
  // Función para realizar la asignación de alumnos a docentes
  asignarAlumnos() {
    this.mostrar_btn_guardar = true;

    //debugger;
    // Mezclar las listas de docentes y alumnos
    const shuffledDocentes = this.shuffleArray([...this.lista_docentes]);
    const shuffledAlumnos = this.shuffleArray([...this.lista_alumnos]);

    // Calcular el número de alumnos por docente
    const alumnosPorDocente = Math.floor(
      shuffledAlumnos.length / shuffledDocentes.length
    );

    // Asignar alumnos a docentes de manera equitativa
    for (const docente of shuffledDocentes) {
      const asignados = shuffledAlumnos.splice(0, alumnosPorDocente);
      this.asignaciones.set(docente, asignados);
    }

    // Asignar los alumnos restantes a los docentes restantes
    for (let i = 0; i < shuffledAlumnos.length; i++) {
      const docente = shuffledDocentes[i % shuffledDocentes.length];
      this.asignaciones.get(docente)?.push(shuffledAlumnos[i]);
    }
  }

  // Función para mezclar aleatoriamente un array
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
    return array;
  }
  // asignaciones_objetos: Map<any, any[]> = new Map();
  asignaciones_objetos: any[] = [];

  generarObjetosDocentesAlumnos() {
    // Lógica para asignar alumnos a docentes
    // ...
    // Crear el objeto por cada docente
    for (const docente of this.lista_docentes) {
      const docenteID = docente.id; // Suponiendo IDs de docentes correlativos
      const tutorID = docente.tutor_id; // Suponiendo IDs de docentes correlativos
      const alumnosIDs =
        this.asignaciones.get(docente)?.map((alumno) => alumno.id) || [];
      this.asignaciones_objetos.push({
        id_docente: docenteID,
        id_alumnos: alumnosIDs,
        id_tutor: tutorID,
        id_generacion: this.formulario.controls.generacion.value,
      });
    }

    Swal.fire({
      icon: 'info',
      iconColor: 'rgb(128, 0, 0)',
      title: `¿Estas seguro de crear la asignacion?`,
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
        this.loadSpinner.emit('true');
        console.log('Data a enviar: ', this.asignaciones_objetos);
        //Mandamos la peticion ala API para agregar al tutor:
        this.api
          .asignacionAlumnosTutorados(this.asignaciones_objetos)
          .pipe(
            catchError((err) => {
              this.loadSpinner.emit('false');

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
            this.loadSpinner.emit('false');

            if (res.codigo === 1) {
              Swal.fire({
                icon: 'success',
                iconColor: 'rgb(128, 0, 0)',
                title: 'Asignaciones almacenadas correctamente.',
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
                title: 'NO se puede generar la asignacion.',
                text: `${res.mensaje}`,
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
    console.log('OBJETOS DE IDS ASIGNADOS', this.asignaciones_objetos);
  }
  data: Validacion = {
    codigo: 0,
    mensaje: '',
    PRIMERO: {
      total_primer_informe_terminado: 0,
      total_tutorados: 0,
      pendientes: 0,
      estatus: 0,
    },
    SEGUNDO: {
      total_segundo_informe_terminado: 0,
      total_tutorados: 0,
      pendientes: 0,
      estatus: 0,
    },
    TERCERO: {
      total_tercer_informe_terminado: 0,
      total_tutorados: 0,
      pendientes: 0,
      estatus: 0,
    },
    TOTAL_INFORMES_TERMINADOS: 0,
    PENDIENTES_TOTALES: 0,
    ESTATUS: 0,
  };


  obtenerAlumnos() {
    let data = {
      id_generacion: this.formulario.controls.generacion.value,
      id_periodo: this.formulario.controls.periodo.value,
      informe: this.formulario.controls.informe.value,
      id_tutor: this.id_tutor,
      periodo: this.formulario.controls.periodo.value === 'PRIMERO' ? 1 : this.formulario.controls.periodo.value === 'SEGUNDO' ? 2 : this.formulario.controls.periodo.value === 'TERCERO' ? 3: 4,
    };

    console.log('Data a enviar: ', data);
    if (
      data.id_generacion == '' ||
      data.id_periodo == '' ||
      data.informe == '' ||
      data.id_tutor == null
    ) {
      Swal.fire({
        icon: 'info',
        iconColor: 'rgb(128, 0, 0)',
        title: 'Faltan datos por seleccionar.',
        text: 'Selecciona todos los campos.',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 2500,
      });
      return;
    }
    // this.loadSpinner.emit('true');
    this.api.verificacionInformes(data).subscribe((res: any) => {
      if(res.codigo==1){
        this.data = res;
        console.log('Esta es la INFORMACION DE LOS TUTORADOS', this.data);
      }

    });
    this.api
      .obtenerListaTutorados(data)
      .pipe(
        catchError((err) => {
          this.loadSpinner.emit('false');

          return err;
        })
      )
      .subscribe((res: any) => {
        console.log('Lista de alumnos: ', res.data);
        this.lista_alumnos = res.data;
        this.fechas_asignadas = res.fechas;


        console.log('Fechas asignadas: ', this.fechas_asignadas);
        this.fechas_primera_sesion =
          this.fechas_asignadas.fecha_primera_sesion[0];
        this.fechas_segunda_sesion =
          this.fechas_asignadas.fecha_segunda_sesion[0];
        this.fechas_tercera_sesion =
          this.fechas_asignadas.fecha_tercera_sesion[0];

          if(this.formulario.controls.informe.value == 'primer_informe'){
            this.fecha_inicio = this.fechas_primera_sesion.fecha_inicio;
            this.fecha_fin = this.fechas_primera_sesion.fecha_final;
          }
          if(this.formulario.controls.informe.value == 'segundo_informe'){
            this.fecha_inicio = this.fechas_segunda_sesion.fecha_inicio;
            this.fecha_fin = this.fechas_segunda_sesion.fecha_final;
          }
          if(this.formulario.controls.informe.value == 'tercer_informe'){
            this.fecha_inicio = this.fechas_tercera_sesion.fecha_inicio;
            this.fecha_fin = this.fechas_tercera_sesion.fecha_final;
          }
        // console.log('Fecha inicio: ', this.fecha_inicio);
        // console.log('Fecha fin: ', this.fecha_fin);

        // console.log('Fechas primera sesion: ', this.fechas_primera_sesion);
        // console.log('Fechas segunda sesion: ', this.fechas_segunda_sesion);
        // console.log('Fechas tercera sesion: ', this.fechas_tercera_sesion);
        this.mostrarPeriodos = true;
        this.loadSpinner.emit('false');
      });
  }
}