import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-cargar-alumnos',
  templateUrl: './cargar-alumnos.component.html',
  styleUrls: ['./cargar-alumnos.component.css']
})
export class CargarAlumnosComponent {
  generaciones: any[] = [];








  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService
  ){}



















  @Output() titulo = new EventEmitter<string>();

  ngOnInit(){
    this.titulo.emit('CARGA ALUMNOS');



    this.api.obtenerGeneraciones().subscribe((res: any) => {
      this.generaciones = res.data;
      console.log('Generaciones: ', this.generaciones);
    });
  }

  documentoDictamen: any = '';
  formulario = this.fb.group({
    nombresesion: ['', Validators.required],
    minuta: ['', Validators.required],
    dictamen: ['', Validators.required],
    fecha: ['', Validators.required],
  });

  generacion_ID:any;
  GeneracionSeleccionado(periodo: any) {


    const ID_GENERACION = periodo.target.value;
    this.generacion_ID=ID_GENERACION;
    console.log('GENERACION seleccionado: ', ID_GENERACION);


  }
  public excelAlumnos: File | any = '';
  archivoSeleccionado(event: any) {
     //Obtenemos el archivos excel:
     const file: File = event.target.files[0];

     if(file.name != 'LISTA_ALUMNOS_PROGRAMA_TUTORIAS.xlsx'){
       Swal.fire({
         icon: 'info',
         iconColor: 'rgb(128, 0, 0)',
         title: 'Debes seleccionar el ARCHIVO original con el formato proporcionado.',
         text: '',
         footer: '',
         heightAuto: false,
         confirmButtonColor: 'rgb(128, 0, 0)',
         timer: 2500,
       });

       return false;
     }else{
      //  this.loadSpinner.emit('true');
      this.excelAlumnos=file;
       console.log('Este es el archivo que seleccionamos: ',file)
      //  this.convertExcelToJson(file);
       return false;
     }

  }
  @Output() loadSpinner = new EventEmitter<string>();

  alumnos:any[]=[]
  numero_peticiones:any= '';
  numero_peticiones_realizadas:number =0;
  convertExcelToJson(file: File) {

    if(this.generacion_ID==undefined){
      Swal.fire({
        icon: 'info',
        iconColor: 'rgb(128, 0, 0)',
        title: 'Debes seleccionar la GENERACIÓN a la que pertenecen los alumnos.',
        text: '',
        footer: '',
        heightAuto: false,
        confirmButtonColor: 'rgb(128, 0, 0)',
        timer: 2500,
      });

      return false;
    }


    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: string | ArrayBuffer = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
      const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: false });

      this.alumnos=jsonData;
      const alumnosPorGrupo = 100; // Número de alumnos por grupo
        const totalAlumnos = this.alumnos.length;

        this.loadSpinner.emit('true');

        for (let i = 0; i < totalAlumnos; i += alumnosPorGrupo) {
          this.loadSpinner.emit('true');
          const grupoAlumnos = this.alumnos.slice(i, i + alumnosPorGrupo);

          const datas = {
            'id_generacion': parseInt(this.generacion_ID),
            'lista_alumnos': grupoAlumnos,
          };

          setTimeout(() => {
            this.api.cargarNuevosAlumnos(datas).subscribe(
              (res: any) => {
                console.log('respuesta desde la API: ', res);
                if (i + alumnosPorGrupo >= totalAlumnos) {
                  this.loadSpinner.emit('false');
                  Swal.fire({
                        icon: 'success',
                        iconColor: 'rgb(128, 0, 0)',
                        title: 'ALUMNOS agregados correctamente.',
                        footer: '',
                        heightAuto: false,
                        confirmButtonColor: 'rgb(128, 0, 0)',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        // timer: 2500,
                      }).then(
                        (res)=>{
                          if(res.isConfirmed){
                            window.location.reload();
                          }
                        }
                      );
                }
                // if (res.codigo === 1 || res.codigo === 2 || res.codigo === 3) {
                //   Swal.fire({
                //     icon: 'success',
                //     iconColor: 'rgb(128, 0, 0)',
                //     title: 'ALUMNOS agregados correctamente.',
                //     footer: '',
                //     heightAuto: false,
                //     confirmButtonColor: 'rgb(128, 0, 0)',
                //     timer: 2500,
                //   });
                // }


              },
              (err) => {
                if (i + alumnosPorGrupo >= totalAlumnos) {
                  this.loadSpinner.emit('false');
                  return err;
                }
              }
            );
          }, 10000);

        }

      //Agregamos los empleados al array:
      // this.alumnos=jsonData;

      // console.log('Estos son los alumnos: ',this.alumnos)
      // console.log('Longitud de elementos: ',this.alumnos.length)
      // console.log('Estos son los alumnos: ',this.alumnos)
      // let bandera:boolean=true;
      // console.log('Estos son los elementos a mandar: ',this.alumnos);
      // while(this.alumnos.length>0 && bandera==true){
      //       let datas ={
      //         'id_generacion' : parseInt(this.generacion_ID),
      //         'lista_alumnos': this.alumnos
      //       }
      //       console.log('Esta es la data a mandar: ',datas)


      //         this.api
      //         .cargarNuevosAlumnos(datas)
      //         .pipe(
      //           catchError((err) => {
      //             console.log('Error desde la api: ', err);
      //             return err;
      //           })
      //         )
      //         .subscribe((res: any) => {
      //           console.log('respuesta desde la API: ', res);
      //           if (res.codigo === 1 || 2 || 3) {
      //             Swal.fire({
      //               icon: 'success',
      //               iconColor: 'rgb(128, 0, 0)',
      //               title: 'ALUMNOS agregados correctamente.',
      //               footer: '',
      //               heightAuto: false,
      //               confirmButtonColor: 'rgb(128, 0, 0)',
      //               timer: 2500,
      //             });
      //             // return res;
      //             return res;
      //           }
      //         });

      //         bandera=false;
      // }



    };
    reader.readAsBinaryString(file);
    return true;
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
