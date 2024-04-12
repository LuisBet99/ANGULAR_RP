import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cargar-docentes',
  templateUrl: './cargar-docentes.component.html',
  styleUrls: ['./cargar-docentes.component.css']
})
export class CargarDocentesComponent {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api:ApiService,
  ){}

  documentoDictamen: any = '';
  formulario = this.fb.group({
    nombresesion: ['', Validators.required],
    minuta: ['', Validators.required],
    dictamen: ['', Validators.required],
    fecha: ['', Validators.required],
  });

  ngOnInit(){
    this.titulo.emit('CARGA DE DOCENTES');
  }

  excelDocentes:File | any ='';

  archivoSeleccionado(event: any) {
    //Obtenemos el archivos excel:
    const file: File = event.target.files[0];

    if(file.name != 'LISTA_DOCENTES_TUTORIAS.xlsx'){
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
     this.excelDocentes=file;
      console.log('Este es el archivo que seleccionamos: ',file)
      // this.convertExcelToJson(file);
      return false;
    }

 }

  @Output() loadSpinner = new EventEmitter<string>();
  @Output() titulo = new EventEmitter<string>();

  alumnos:any[]=[]
  numero_peticiones:any= '';
  numero_peticiones_realizadas:number =0;
  convertExcelToJson(file: File): void {
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
            'lista_docentes': grupoAlumnos,
          };

          setTimeout(() => {
            this.api.cargarDocentes(datas).subscribe(
              (res: any) => {
                console.log('respuesta desde la API: ', res);
                if (i + alumnosPorGrupo >= totalAlumnos) {
                  this.loadSpinner.emit('false');
                  Swal.fire({
                        icon: 'success',
                        iconColor: 'rgb(128, 0, 0)',
                        title: 'DOCENTES agregados correctamente.',
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
                //     iconColor: 'rgb(46, 113, 179)',
                //     title: 'ALUMNOS agregados correctamente.',
                //     footer: '',
                //     heightAuto: false,
                //     confirmButtonColor: 'rgb(46, 113, 179)',
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
    };
    reader.readAsBinaryString(file);
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
