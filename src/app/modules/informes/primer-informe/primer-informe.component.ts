import { Component,EventEmitter,Inject, OnInit, Output  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DatosInformesService } from 'src/app/services/datos-informes.service';
import Swal from 'sweetalert2';

// constructor(public dialogRef: MatDialogRef<PrimerInformeComponent>) { }

@Component({
  selector: 'app-primer-informe',
  templateUrl: './primer-informe.component.html',
  styleUrls: ['./primer-informe.component.css']
})
export class PrimerInformeComponent implements OnInit{
  constructor(
    private datosInformesService: DatosInformesService,
    private fb: FormBuilder,
    private api: ApiService,
  ){}

  @Output() titulo = new EventEmitter<string>();
  @Output() loadSpinner = new EventEmitter<string>();
  loadinges: string = 'false';
  mostrarSidenav = false;
  colorSpinner: any = 'rgb(128, 0, 0)';
  titutloEstructura: string = '';
  // Recibimos los datos del servicio:

    data:any=[];
    data_informe:any=[];
    nombre_alumno:string='';
    valoresInicialesFormulario: any;


    listaModalidades:any[]=[];
    listaCanalizaciones:any[]=[];
    listaSituacionesProblematicas:any[]=[];
    listaActividadesTutorial:any[]=[];
    listaLogros:any[]=[];
    listaBecas:any[]=[];
    listaCanalizacionesBecas:any[]=[];
  ngOnInit() {
// this.loadSpinner.emit('true');
this.loadinges='true';
    this.api.tipos_beca().subscribe((res:any)=>{
      console.log('Estas son las becas: ', res);
      this.listaBecas = res.data;
      this.api.tipos_actividad().subscribe((res:any)=>{

        this.listaActividadesTutorial = res.data;
        this.api.tipos_canalizacion().subscribe((res:any)=>{
          this.listaCanalizaciones = res.data;
          this.api.tipos_canalizacion_becas().subscribe((res:any)=>{
            this.listaCanalizacionesBecas = res.data;
            this.api.tipos_logros().subscribe((res:any)=>{
              this.listaLogros = res.data;
              this.api.tipos_modalidad().subscribe((res:any)=>{
                this.listaModalidades = res.data;
                this.api.tipos_situacion().subscribe((res:any)=>{
                  this.listaSituacionesProblematicas = res.data;
                  // this.titulo.emit('Primer informe');
                  this.loadinges='false';
                })
              })
            })
          })
        })
      })
    })
    // this.loadSpinner.emit('true')
    this.valoresInicialesFormulario = this.formulario.value;

    this.data = this.datosInformesService.getData();
    this.data_informe = this.datosInformesService.getDataInforme();
    console.log('Esta es la data del alumno: ', this.data);
    console.log('Esta es la data del informe: ', this.data_informe);
    this.nombre_alumno=`${this.data.NombreAlumno} ${this.data.ApellidoPaternoAlumno} ${this.data.ApellidoMaternoAlumno}`;
    //Desactivamos todos los inputs:
    this.formulario.controls.segunda.disable();
    this.formulario.controls.tercera.disable();
    this.formulario.controls.cuarta.disable();
    this.formulario.controls.quinta.disable();
    this.formulario.controls.sexta.disable();
    this.formulario.controls.septima.disable();
    this.formulario.controls.octava.disable();
    this.formulario.controls.novena.disable();
    this.formulario.controls.decima.disable();
    this.formulario.controls.onceava.disable();
    this.formulario.controls.doceava.disable();

    this.valoresInicialesFormulario = this.formulario.value;
  }
  mostrar:boolean = false;

  formulario = this.fb.group({
    primera: [''],
    segunda: [''],
    tercera: [''],
    cuarta: [''],
    quinta: [''],
    sexta: [''],
    septima: [''],
    octava: [''],
    novena: [''],
    decima: [''], // Tipo de canalizacion.
    onceava: [''], // becas canalizacion.
    doceava: [''],
    numero_sesiones: [0],
    horas_atencion:[0],
    asistencia: [0],

  });

  activarCanalizacion(event:any){
    if(event.target.value == 'SI'){
      this.formulario.controls.decima.enable();
      this.formulario.controls.doceava.enable();
    }
    if(event.target.value == 'NO'){
      this.formulario.controls.decima.disable();
      this.formulario.controls.onceava.disable();
      this.formulario.controls.doceava.disable();

      this.formulario.controls.decima.setValue('');
      this.formulario.controls.onceava.setValue('');
      this.formulario.controls.doceava.setValue('');

    }
  }

  seleccionCanalizacion(event:any){
    let valor = event.target.value;
    console.log('Este es el valor de la canalizacion: ', valor);
    if(valor == 'BE'){
      this.formulario.controls.onceava.enable();
    }else{
      this.formulario.controls.onceava.disable();
      this.formulario.controls.onceava.setValue('');
    }
  }
  activarInputs(event:any){
    //debugger;
    let valor = event.target.value;
    console.log('Este es el valor: ', valor);

    if(valor == 'SI'){
      this.mostrar=true;

    this.formulario.controls.segunda.enable();
    // No activamos el de la beca porque no es necesario.
    this.formulario.controls.tercera.enable();
    // this.formulario.controls.cuarta.enable();
    this.formulario.controls.quinta.enable();
    this.formulario.controls.sexta.enable();
    this.formulario.controls.septima.enable();
    this.formulario.controls.octava.enable();
    this.formulario.controls.novena.enable();

      // Si el alumno asistio, entonces las horas de atencion y el valor que sea por defecto:
      this.formulario.controls.horas_atencion.setValue(1);
      this.formulario.controls.asistencia.setValue(33);
      this.formulario.controls.numero_sesiones.setValue(1);

    }else{
      this.mostrar=false;
      this.formulario.setValue(this.valoresInicialesFormulario);
      this.formulario.controls.horas_atencion.setValue(1);
      this.formulario.controls.asistencia.setValue(0);
      this.formulario.controls.numero_sesiones.setValue(1);
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

 activaInputBeca(event:any){
    let valor = event.target.value;
    console.log('Este es el valor: ', valor);
    if(valor == 'SI'){
      this.formulario.controls.cuarta.enable();
    }
    if(valor == 'NO'){
      this.formulario.controls.cuarta.disable();
      this.formulario.controls.cuarta.setValue('NA');
    }
 }


 enviarInforme(){

  let data ={
    primera: this.formulario.controls.primera.value ,
    segunda: this.formulario.controls.segunda.value,
    tercera: this.formulario.controls.tercera.value,
    cuarta: this.formulario.controls.cuarta.value,
    quinta: this.formulario.controls.quinta.value,
    sexta: this.formulario.controls.sexta.value,
    septima: this.formulario.controls.septima.value,
    octava: this.formulario.controls.octava.value,
    novena: this.formulario.controls.novena.value,
    decima:  this.formulario.controls.decima.value === '' ? 'N/A': this.formulario.controls.decima.value,
    onceava: this.formulario.controls.onceava.value === '' ? 'N/A': this.formulario.controls.onceava.value,
    doceava: this.formulario.controls.doceava.value === '' ? 'N/A': this.formulario.controls.doceava.value,
    numero_sesiones: this.formulario.controls.numero_sesiones.value,
    horas_atencion: this.formulario.controls.horas_atencion.value,
    asistencia: this.formulario.controls.asistencia.value,
    id_primer_informe: this.data.id_primer_informe,
    id_segundo_informe: this.data.id_segundo_informe,
    id_tercer_informe: this.data.id_tercer_informe,
    id_alumno: this.data.id_alumno,
    id_tutor: this.data.id_tutor,
    periodo: this.data_informe.periodo,
    id_generacion: this.data_informe.id_generacion,
    informe: this.data_informe.informe,
  }
  // console.log('Estos son los datos del formulario a enviar: ', data);

  if (this.formulario.controls.primera.value == 'NO') {
    this.formulario.controls.horas_atencion.setValue(0);
    this.formulario.controls.asistencia.setValue(0);
    this.formulario.controls.numero_sesiones.setValue(0);
    let data2 ={
      primera: this.formulario.controls.primera.value ,
      segunda: this.formulario.controls.segunda.value === '' ? 'N/A': this.formulario.controls.segunda.value,
      tercera: this.formulario.controls.tercera.value === '' ? 'N/A': this.formulario.controls.tercera.value,
      cuarta: this.formulario.controls.cuarta.value === '' ? 'N/A': this.formulario.controls.cuarta.value,
      quinta: this.formulario.controls.quinta.value === '' ? 'N/A': this.formulario.controls.quinta.value,
      sexta: this.formulario.controls.sexta.value === '' ? 'N/A': this.formulario.controls.sexta.value,
      septima: this.formulario.controls.septima.value === '' ? 'N/A': this.formulario.controls.septima.value,
      octava: this.formulario.controls.octava.value === '' ? 'N/A': this.formulario.controls.octava.value,
      novena: this.formulario.controls.novena.value === '' ? 'N/A': this.formulario.controls.novena.value,
      decima:  this.formulario.controls.decima.value === '' ? 'N/A': this.formulario.controls.decima.value,
      onceava: this.formulario.controls.onceava.value === '' ? 'N/A': this.formulario.controls.onceava.value,
      doceava: this.formulario.controls.doceava.value === '' ? 'N/A': this.formulario.controls.doceava.value,
      numero_sesiones: this.formulario.controls.numero_sesiones.value ,
      horas_atencion: this.formulario.controls.horas_atencion.value,
      asistencia: this.formulario.controls.asistencia.value,
      id_primer_informe: this.data.id_primer_informe,
      id_segundo_informe: this.data.id_segundo_informe,
      id_tercer_informe: this.data.id_tercer_informe,
      id_alumno: this.data.id_alumno,
      id_tutor: this.data.id_tutor,
      periodo: this.data_informe.periodo,
      id_generacion: this.data_informe.id_generacion,
      informe: this.data_informe.informe,
    }
      console.log('Estos son los datos del formulario a enviar SI PONE QUE NO: ', data2);

    // TODO: Alerta de swwet alert para que confirme si desea continuar:
    Swal.fire({
      icon: 'warning',
      iconColor: 'rgb(128, 0, 0)',
      title:
        '¿Estas seguro de enviar el informe con valores N/A para este informe?',
      text: 'Una vez enviado, no podras modificarlo.',
      footer: '',
      heightAuto: false,
      confirmButtonColor: 'rgb(128, 0, 0)',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'black',
      confirmButtonText: 'Enviar',
      reverseButtons: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadSpinner.emit('true');
        this.api.capturarPrimerInforme(data2)
     .pipe(
         catchError((err:any) => {
            this.loadSpinner.emit('false')
            Swal.fire({
              icon: 'error',
              iconColor: 'rgb(128, 0, 0)',
              title: 'Error al enviar el informe.',
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
     .subscribe((res:any)=>{
        console.log('Esta es la respuesta del servidor: ', res);
        if(res.codigo ===1){
          this.loadSpinner.emit('false')

          Swal.fire({
            icon: 'success',
            iconColor: 'rgb(128, 0, 0)',
            title: 'Informe CAPTURADO correctamente.',
            text: '',
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
        if(res.codigo ===2){
          this.loadSpinner.emit('false')

          Swal.fire({
            icon: 'error',
            iconColor: 'rgb(128, 0, 0)',
            title: 'No puedes capturar el informe.',
            text: 'El alumno ya tiene un informe capturado anteriormente.',
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

      }
    });

  }
  if (this.formulario.controls.primera.value == 'SI') {
    if(this.formulario.controls.segunda.value == ''){
      Swal.fire({
                 icon: 'error',
                 iconColor: 'rgb(128, 0, 0)',
                 title: 'NO confirmaste la ficha de registro.',
                 text: 'Verifica la pregunta porfavor.',
                 footer: '',
                 heightAuto: false,
                 confirmButtonColor: 'rgb(128, 0, 0)',
                 allowOutsideClick: false,
                 allowEscapeKey: false,
                 timer: 2500,
               });
               // setTimeout(() => {
               //   window.location.reload();
               // }, 3000);
               return false;
   }

   if(this.formulario.controls.tercera.value == ''){
     Swal.fire({
                icon: 'error',
                iconColor: 'rgb(128, 0, 0)',
                title: 'NO confirmaste si el alumno cuenta con beca.',
                text: 'Verifica la pregunta porfavor.',
                footer: '',
                heightAuto: false,
                confirmButtonColor: 'rgb(128, 0, 0)',
                allowOutsideClick: false,
                allowEscapeKey: false,
                timer: 2500,
              });
              // setTimeout(() => {
              //   window.location.reload();
              // }, 3000);
              return false;
   }
   if(this.formulario.controls.cuarta.value == ''){
     Swal.fire({
               icon: 'error',
               iconColor: 'rgb(128, 0, 0)',
               title: 'NO confirmaste el tipo de beca.',
               text: 'Verifica la pregunta porfavor.',
               footer: '',
               heightAuto: false,
               confirmButtonColor: 'rgb(128, 0, 0)',
               allowOutsideClick: false,
               allowEscapeKey: false,
               timer: 2500,
             });
             // setTimeout(() => {
             //   window.location.reload();
             // }, 3000);
             return false;
   }

   if(this.formulario.controls.quinta.value == ''){
     Swal.fire({
               icon: 'error',
               iconColor: 'rgb(128, 0, 0)',
               title: 'NO confirmaste la actividad tutorial.',
               text: 'Verifica la pregunta porfavor.',
               footer: '',
               heightAuto: false,
               confirmButtonColor: 'rgb(128, 0, 0)',
               allowOutsideClick: false,
               allowEscapeKey: false,
               timer: 2500,
             });
             // setTimeout(() => {
             //   window.location.reload();
             // }, 3000);
             return false;
   }
   if(this.formulario.controls.sexta.value == ''){
     Swal.fire({
               icon: 'error',
               iconColor: 'rgb(128, 0, 0)',
               title: 'NO confirmaste la modalidad.',
               text: 'Verifica la pregunta porfavor.',
               footer: '',
               heightAuto: false,
               confirmButtonColor: 'rgb(128, 0, 0)',
               allowOutsideClick: false,
               allowEscapeKey: false,
               timer: 2500,
             });
             // setTimeout(() => {
             //   window.location.reload();
             // }, 3000);
             return false;
   }
   if(this.formulario.controls.septima.value == ''){
     Swal.fire({
               icon: 'error',
               iconColor: 'rgb(128, 0, 0)',
               title: 'NO confirmaste la situacion problematica.',
               text: 'Verifica la pregunta porfavor.',
               footer: '',
               heightAuto: false,
               confirmButtonColor: 'rgb(128, 0, 0)',
               allowOutsideClick: false,
               allowEscapeKey: false,
               timer: 2500,
             });
             // setTimeout(() => {
             //   window.location.reload();
             // }, 3000);
             return false;
   }
   if(this.formulario.controls.octava.value == ''){
     Swal.fire({
               icon: 'error',
               iconColor: 'rgb(128, 0, 0)',
               title: 'NO confirmaste la canalizacion.',
               text: 'Verifica la pregunta porfavor.',
               footer: '',
               heightAuto: false,
               confirmButtonColor: 'rgb(128, 0, 0)',
               allowOutsideClick: false,
               allowEscapeKey: false,
               timer: 2500,
             });
             // setTimeout(() => {
             //   window.location.reload();
             // }, 3000);
             return false;
   }
   if(this.formulario.controls.novena.value == ''){
     Swal.fire({
               icon: 'error',
               iconColor: 'rgb(128, 0, 0)',
               title: 'NO ingresaste las observaciones.',
               text: 'Verifica el campo porfavor , e ingresa las observaciones.',
               footer: '',
               heightAuto: false,
               confirmButtonColor: 'rgb(128, 0, 0)',
               allowOutsideClick: false,
               allowEscapeKey: false,
               timer: 2500,
             });
             // setTimeout(() => {
             //   window.location.reload();
             // }, 3000);
             return false;
   }
   this.loadSpinner.emit('true')

   this.api.capturarPrimerInforme(data)
     .pipe(
         catchError((err:any) => {
            this.loadSpinner.emit('false')
            Swal.fire({
              icon: 'error',
              iconColor: 'rgb(128, 0, 0)',
              title: 'Error al enviar el informe.',
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
     .subscribe((res:any)=>{
        console.log('Esta es la respuesta del servidor: ', res);
        if(res.codigo ===1){
          this.loadSpinner.emit('false')

          Swal.fire({
            icon: 'success',
            iconColor: 'rgb(128, 0, 0)',
            title: 'Informe CAPTURADO correctamente.',
            text: '',
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
        if(res.codigo ===2){
          this.loadSpinner.emit('false')

          Swal.fire({
            icon: 'error',
            iconColor: 'rgb(128, 0, 0)',
            title: 'No puedes capturar el informe.',
            text: 'El alumno ya tiene un informe capturado anteriormente.',
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
      })
  }




  return true;
 }


}
