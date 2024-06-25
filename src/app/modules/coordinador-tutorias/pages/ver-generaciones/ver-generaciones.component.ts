import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, pipe } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataUsuarioService } from 'src/app/services/data-usuario.service';
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
    private api: ApiService,
    private data_usuario: DataUsuarioService
  ) {}

  fechas_sesion_periodo: any[] = [];
  generaciones: any[] = [];
  carreras: any[] = [];

  nombreGeneracion: string = '';
  IdcarreraUsuario: string = '';

  ngOnInit() {
    this.data_usuario.obtenerDatosLocalStorage();
    this.IdcarreraUsuario = this.data_usuario.obteneridCarrera();
    console.log('Id de carrera del coordinador de tutorias: ', this.IdcarreraUsuario);

    this.titulo.emit('ASIGNACION DE ALUMNOS A TUTORES');
    this.loadSpinner.emit('true');
    this.api
      .obtenerGeneracionesAlumnosAsignados()
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

    this.loadSpinner.emit('true');
    this.api
      .obtenerCarreras()
      .pipe(
        catchError((err) => {
          this.loadSpinner.emit('false');

          return err;
        })
      )
      .subscribe((res: any) => {
        this.carreras = res.data;
        console.log('carreras: ', this.carreras);
        this.loadSpinner.emit('false');
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
    this.mostrar_btn_guardar=false;

    this.mostrarPeriodos = false;

    const ID_GENERACION = periodo.target.value;
    console.log('GENERACION seleccionado: ', ID_GENERACION);
    this.formulario.controls.generacion.setValue(ID_GENERACION);

    this.carreraSeleccionada({target:{value: this.IdcarreraUsuario}});
  }

  NombreperiodoSeleccionado: string = '';
  NombregeneracionSeleccionado: string = '';

  lista_alumnos: any[] = [];
  lista_docentes: any[] = [];
  carreraSeleccionada(carrera: any) {
    this.mostrar_btn_guardar=false;
    this.mostrarPeriodos = false;
    const carrera_id = carrera.target.value;
    const generacion_id = this.formulario.controls.generacion.value;

    let data = {
      id_generacion: generacion_id,
      id_carrera: carrera_id,
    };

    if(data.id_generacion === '' || data.id_generacion === 'SELECCIONA UNA GENERACION'){
      Swal.fire({
        icon: 'info',
        iconColor: 'rgb(128, 0, 0)',
        title: 'Selecciona una GENERACION.',
        text: '',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        timer: 2500,
      });
      return;
    }

    console.log('CARRERA SELECCIONADA: ', carrera_id);
    this.loadSpinner.emit('true');
    this.api
      .obtenerAlumnosGeneraciones(data)
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
      .subscribe((res: any) => {

        if(res.codigo === 1){
          this.loadSpinner.emit('false');

          this.lista_alumnos = res.data;
          this.lista_docentes = res.data2;
          console.log('alumos: ', this.lista_alumnos);
          console.log('docentes: ', this.lista_docentes);
          this.mostrarPeriodos = true;
        }
        if(res.codigo === 2){
          this.loadSpinner.emit('false');

          Swal.fire({
            icon: 'info',
            iconColor: 'rgb(128, 0, 0)',
            title: 'NO existen DOCENTES actualmente que asignar.',
            text: '',
            footer: '',
            heightAuto: false,
            confirmButtonColor: 'rgb(128, 0, 0)',
            timer: 2500,
          });
          this.mostrarPeriodos = false;
          return;
        }
        if(res.codigo === 3){
          this.loadSpinner.emit('false');

          Swal.fire({
            icon: 'info',
            iconColor: 'rgb(128, 0, 0)',
            title: 'NO existen ALUMNOS actualmente que asignar.',
            text: '',
            footer: '',
            heightAuto: false,
            confirmButtonColor: 'rgb(128, 0, 0)',
            timer: 2500,
          });
          this.mostrarPeriodos = false;
          return;
        }
        if(res.codigo === 4){
          this.loadSpinner.emit('false');

          Swal.fire({
            icon: 'info',
            iconColor: 'rgb(128, 0, 0)',
            title: 'Ocurrio un error actualmente, intentalo nuevamente.',
            text: '',
            footer: '',
            heightAuto: false,
            confirmButtonColor: 'rgb(128, 0, 0)',
            timer: 2500,
          });
          this.mostrarPeriodos = false;
          return;
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
          .subscribe((res: any) => {
            this.loadSpinner.emit('false');

            if (res.codigo === 1) {
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
          });
      }
    });
  }
  lista_docentes_seleccionados: any[] = [];

  seleccionarDocente(docente: any) {

    //Siempre que seleccionemos uno, o quitemos la seleccion de otro, sera necesario vaciar las asignaciones.
    this.asignaciones = new Map();

    const index = this.lista_docentes_seleccionados.indexOf(docente);
    if (index === -1) {
      this.lista_docentes_seleccionados.push(docente); // Agregar el elemento al array si no existe
    } else {
      this.lista_docentes_seleccionados.splice(index, 1); // Eliminar el elemento del array si ya existe
    }
    console.log('Lista de docentes seleccionados: ',this.lista_docentes_seleccionados);
  }


  // Mapa para almacenar las asignaciones de docentes y alumnos
  asignaciones: Map<any, any[]> = new Map();
  mostrar_btn_guardar:boolean=false;
  // Función para realizar la asignación de alumnos a docentes
  asignarAlumnos() {

    //Vaciamos las asignaciones:
    this.asignaciones = new Map();

    //Verificamos que se encuentren docentes en la lista de seleccionados:
    if(this.lista_docentes_seleccionados.length > 0){
      this.mostrar_btn_guardar=true;


      // Mezclar las listas de docentes y alumnos
      const shuffledDocentes = this.shuffleArray([...this.lista_docentes_seleccionados]);
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
    }else{
      Swal.fire({
        icon: 'info',
        iconColor: 'rgb(128, 0, 0)',
        title: 'Selecciona al menos un DOCENTE.',
        text: '',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        timer: 2500,
      });
      return;
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
    //Tambien verificamos que se encuentren docentes seleccionados:
    if(this.lista_docentes_seleccionados.length === 0){
      Swal.fire({
        icon: 'info',
        iconColor: 'rgb(128, 0, 0)',
        title: 'Es necesario que selecciones al menos un DOCENTE y se vuelva a crear la asignacion de alumnos.',
        text: '',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',

      });
      return;
    }
    //Primero verificamos que se encuentren alumnos asigandos:
    if(this.asignaciones.size === 0){
      Swal.fire({
        icon: 'info',
        iconColor: 'rgb(128, 0, 0)',
        title: 'Es necesario que hagas la asignacion de alumnos.',
        text: '',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',

      });
      return;
    }


    //Siempre vaciamos las asignaciones objetos:
    this.asignaciones_objetos = [];

    // Lógica para asignar alumnos a docentes
    // ...
    // Crear el objeto por cada docente
    for (const docente of this.lista_docentes) {
      const docenteID = docente.id// Suponiendo IDs de docentes correlativos
      const tutorID = docente.tutor_id// Suponiendo IDs de docentes correlativos
      const alumnosIDs =
        this.asignaciones.get(docente)?.map((alumno) => alumno.id) || [];
        this.asignaciones_objetos.push({ id_docente: docenteID, id_alumnos: alumnosIDs ,id_tutor: tutorID, id_generacion: this.formulario.controls.generacion.value});
      }

      //Quitamos le objeto que id_alumnos este vacio:
      this.asignaciones_objetos = this.asignaciones_objetos.filter((objeto)=>{
        return objeto.id_alumnos.length > 0;
      });


      // console.log('Este es el objeto de las asignaciones: ',this.asignaciones_objetos)
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
            .asignacionAlumnosTutorados( this.asignaciones_objetos)
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
    // console.log('OBJETOS DE IDS ASIGNADOS',this.asignaciones_objetos);
  }

  // ...
}
