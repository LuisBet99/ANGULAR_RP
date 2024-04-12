import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatosInformesService } from 'src/app/services/datos-informes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tercer-informe',
  templateUrl: './tercer-informe.component.html',
  styleUrls: ['./tercer-informe.component.css']
})
export class TercerInformeComponent {
  constructor(
    private datosInformesService: DatosInformesService,
    private fb: FormBuilder
  ){}

  @Output() titulo = new EventEmitter<string>();
  @Output() loadSpinner = new EventEmitter<string>();
  // Recibimos los datos del servicio:

  data:any=[];
  data_informe:any=[];
  nombre_alumno:string='';
  ngOnInit() {
    // this.loadSpinner.emit('true')
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
    this.formulario.controls.decima.disable();
    this.formulario.controls.onceava.disable();
    this.formulario.controls.doceava.disable();

  }
  mostrar:boolean = false;
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
    horas_atencion:[0],
    asistencia: [0],

  });


  activarInputs(event:any){

    let valor = event.target.value;
    console.log('Este es el valor: ', valor);

    if(valor == 'SI'){
      this.mostrar=true;
    this.formulario.controls.segunda.enable();
    // No activamos el de la beca porque no es necesario.
    this.formulario.controls.tercera.enable();
    this.formulario.controls.cuarta.enable();
    this.formulario.controls.quinta.enable();
    this.formulario.controls.sexta.enable();
    this.formulario.controls.septima.enable();
    this.formulario.controls.octava.enable();
    this.formulario.controls.novena.enable();

      this.formulario.controls.asistencia.setValue(33);
      // Si el alumno asistio, entonces las horas de atencion y el valor que sea por defecto:


    }else{
      this.mostrar=false;
      this.formulario.controls.segunda.disable();
      this.formulario.controls.tercera.disable();
      this.formulario.controls.cuarta.disable();
      this.formulario.controls.quinta.disable();
      this.formulario.controls.sexta.disable();
      this.formulario.controls.septima.disable();
      this.formulario.controls.octava.disable();
      this.formulario.controls.novena.disable();

      //Reseteamos los valores de todo formulario:
      this.formulario.controls.segunda.setValue('0');
      this.formulario.controls.tercera.setValue('0');
      this.formulario.controls.cuarta.setValue('NINGUNA');
      this.formulario.controls.quinta.setValue('NA');
      this.formulario.controls.sexta.setValue('NA');
      this.formulario.controls.septima.setValue('NA');
      this.formulario.controls.octava.setValue('NA');
      this.formulario.controls.novena.setValue('');

    }
  }

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
  if(valor == 'BECA'){
    this.formulario.controls.onceava.enable();
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
    primera: this.formulario.controls.primera.value,
    segunda: parseInt(this.formulario.controls.segunda.value!),
    tercera: parseInt(this.formulario.controls.tercera.value!),
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
  }
  if(this.formulario.controls.primera.value == 'NO'){

    // TODO: Alerta de swwet alert para que confirme si desea continuar:
    Swal.fire({
      icon: 'warning',
      iconColor: 'rgb(128, 0, 0)',
      title: '¿Estas seguro de enviar el informe con valores N/A para este informe?',
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
        if(result.isConfirmed){
          this.formulario.controls.segunda.setValue('0');
          this.formulario.controls.tercera.setValue('0');
          this.formulario.controls.cuarta.setValue('NINGUNA');
          this.formulario.controls.quinta.setValue('NA');
          this.formulario.controls.sexta.setValue('NA');
          this.formulario.controls.septima.setValue('NA');
          this.formulario.controls.octava.setValue('NA');
          this.formulario.controls.novena.setValue('');
          console.log(
            'Estos son los datos del formulario: ',
            this.formulario.value
          );
        }
    });

// this.loadSpinner.emit('true')
  console.log('Estos son los datos del formulario: ', this.formulario.value);
  }

  if(this.formulario.controls.primera.value == 'SI'){

    if(this.formulario.controls.segunda.value == ''){
       Swal.fire({
                  icon: 'error',
                  iconColor: 'rgb(128, 0, 0)',
                  title: 'NO confirmaste el NUMERO DE SESIONES.',
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
                 title: 'NO confirmaste las HORAS DE ATENCION.',
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
                title: 'NO confirmaste la ACTIVIDAD TUTORAL.',
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
                title: 'NO confirmaste la MODALIDAD.',
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
                title: 'NO confirmaste la SITUACION PROBLEMATICA.',
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
                title: 'NO confirmaste la CANALIZACION.',
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
// this.loadSpinner.emit('true')
console.log('Estos son los datos del formulario: ', this.formulario.value);
    return true;
  }









  return true;
 }
}
