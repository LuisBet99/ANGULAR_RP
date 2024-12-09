import { ReporteParcialService } from 'src/app/services/reporte-parcial.service';
import { Dialog } from '@angular/cdk/dialog';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  OnInit,
} from '@angular/core';
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
import Chart from 'chart.js/auto';
import * as XLSX from 'xlsx';

// import * as html2canvas from 'html2canvas';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface Validacion {
  codigo: number;
  mensaje: string;
  PRIMERO: Primero;
  SEGUNDO: Primero;
  TERCERO: Primero;
  TOTAL_INFORMES_TERMINADOS: number;
  PENDIENTES_TOTALES: number;
  ESTATUS: number;
}

export interface Primero {
  total_primer_informe_terminado?: number;
  total_tutorados: number;
  pendientes: number;
  estatus: number;
  total_segundo_informe_terminado?: number;
  total_tercer_informe_terminado?: number;
}

@Component({
  selector: 'app-reporte-parcial',
  templateUrl: './reporte-parcial.component.html',
  styleUrls: ['./reporte-parcial.component.css'],
})
//class ReporteSemestralComponent
export class ReporteParcialComponent implements OnInit{
  reporteData: any;
  @Output() titulo = new EventEmitter<string>();
  @Output() loadSpinner = new EventEmitter<string>();

  
  datosCargados = false;

  mostrarPeriodos: boolean = false;
  constructor(
    //private reporteParcialService: ReporteParcialService,
    private router: Router,
    private fb: FormBuilder,
    private api: ReporteParcialService,
    public dialog: Dialog,
    private datosInformesService: DatosInformesService,
    private elementRef: ElementRef
  ) {}

  fechas_sesion_periodo: any[] = [];
  generaciones: any[] = [];
  carreras: any[] = [];
  fecha_inicio: string = '';
  fecha_fin: string = '';

  tutores_capacitados_year = 0;
  tutores_capacitados_programa = 0;
  tutores_capacitados_porcentaje =
    (this.tutores_capacitados_year / this.tutores_capacitados_programa) * 100;

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
  @ViewChild('myCanvas') canvasRef!: ElementRef;

  downloadDivAsPDF() {
    this.descargarPDF();
    // //Creamos una alerta preguntando por los valores de tutores capacitados y total de tutores del programa:
    // Swal.fire({
    //   icon: 'info',
    //   iconColor: 'rgb(128, 0, 0)',
    //   title: 'Generando reporte...',
    //   html: `<input type="number" id="tutores_capacitados_year" min="0" class="swal2-input" placeholder="Tutores capacitados en el año" required> <br>
    //         <input type="number" id="tutores_capacitados_programa" min="0"class="swal2-input" placeholder="Total de tutores del programa" required>
    //   `,
    //   heightAuto: false,
    //   confirmButtonColor: 'rgb(128, 0, 0)',
    //   allowOutsideClick: false,
    //   allowEscapeKey: false,
    //   confirmButtonText: 'Generar reporte',
    //   cancelButtonText: 'Cancelar',
    //   showCancelButton: true,
    // }).then((result) => {
    //   if (result.isConfirmed) {

    //     //Obtenemos los valores de los inputs:
    //     //debugger;
    //     let tutores_capacitados_year = parseInt(
    //       (document.getElementById('tutores_capacitados_year') as HTMLInputElement).value
    //       );
    //       let tutores_capacitados_programa = parseInt(
    //         (document.getElementById('tutores_capacitados_programa') as HTMLInputElement).value
    //         );
    //         let tutores_capacitados_porcentaje = (tutores_capacitados_year / tutores_capacitados_programa) * 100;
    //         this.tutores_capacitados_year = tutores_capacitados_year;
    //         this.tutores_capacitados_programa = tutores_capacitados_programa;
    //         this.tutores_capacitados_porcentaje = tutores_capacitados_porcentaje;

    //         this.descargarPDF();

    //       }
    //       if(result.isDismissed){
    //         return;
    //       }
    //     });


  }

  descargarPDF() {
    //debugger;
    const p1 = document.querySelector('.primer-formato') as HTMLElement;
    const p2 = document.querySelector('.segundo-formato') as HTMLElement;
    const p3 = document.querySelector('.tercer-formato') as HTMLElement;
    const p4 = document.querySelector('.cuarto-formato') as HTMLElement;
    const p5 = document.querySelector(
      '.contenedor-graficas-semestrales'
    ) as HTMLElement;

    const pdf = new jsPDF('p', 'mm', 'a4'); // Crea un nuevo documento PDF

    html2canvas(p1).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // Ajusta las dimensiones según tus necesidades

      // Después de agregar el primer elemento, agrega una nueva página para los siguientes
      pdf.addPage();

      html2canvas(p2).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 100);
        pdf.addPage();

        html2canvas(p3).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          pdf.addImage(imgData, 'PNG', 0, 0, 210, 100);
          pdf.addPage();

          html2canvas(p4).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, 210, 100);
            pdf.addPage();

            html2canvas(p5).then((canvas) => {
              const imgData = canvas.toDataURL('image/png');
              pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);

              pdf.save('reporte_parcial.pdf'); // Descarga el PDF con el nombre "reporte_parcial.pdf"
            });
          });
        });
      });
    });
  }

  chart: any = [];
  chart2: any = [];
  chart3: any = [];
  chart4: any = [];
  chart5: any = [];
  chart6: any = [];

  renderChart() {
    // let htmlRef = this.canvasRef.nativeElement.getContext('2d');

    this.chart = new Chart('grafica', {
      type: 'bar',
      data: {
        labels: [
          'Tutorados diagnostico inicial',
          'Alumnos atendidos 3 o mas veces',
          'Alumnos atendidos 2 veces',
          'Alumnos atendidos 1 vez',
          'Alumnos no atendidos',
        ],
        datasets: [
          {
            label: 'RESPUESTA AL PROGRAMA Diagnostico inicial y Asistencia.',
            data: [
              this.dataReporte.porcentaje_alumnos_con_diagnostico,
              this.dataReporte.porcentaje_alumnos_atendidos_3,
              this.dataReporte.porcentaje_alumnos_atendidos_2,
              this.dataReporte.porcentaje_alumnos_atendidos_1,
              this.dataReporte.porcentaje_alumnos_atendidos_0,
            ],
            backgroundColor: [
              // Array de colores para cada barra
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              // Colores de borde correspondientes
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Fondo blanco (RGBA)
            },
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Fondo blanco (RGBA)
            },
          },
        },
      },
    });

    this.chart2 = new Chart('grafica2', {
      type: 'bar',
      data: {
        labels: [
          `${this.dataReporte.porcentaje_total_matricula_carrera}%,
          `,
        ],
        datasets: [
          {
            label: 'Entrega de reportes y cobertura del programa',
            data: [this.dataReporte.porcentaje_total_matricula_carrera],
            backgroundColor: [
              // Array de colores para cada barra
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              // Colores de borde correspondientes
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Fondo blanco (RGBA)
            },
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Fondo blanco (RGBA)
            },
          },
        },
      },
    });

    this.chart3 = new Chart('grafica3', {
      type: 'bar',
      data: {
        labels: [
          'Alumnos atendidos de forma grupal',
          'Alumnos atendidos de forma individual',
          'Alumnos atendidos de forma ambas modalidades',
          'Alumnos no atendidos por inasistencia',
        ],
        datasets: [
          {
            label: 'RESPUESTA AL PROGRAMA Diagnostico inicial y Asistencia.',
            data: [
              this.dataReporte.porcentaje_alumnos_atendidos_forma_grupal,
              this.dataReporte.porcentaje_alumnos_atendidos_forma_individual,
              this.dataReporte.porcentaje_alumnos_atendidos_forma_ambas,
              this.dataReporte.alumnos_atendidos_forma_inasistencia_porcentaje,
            ],
            backgroundColor: [
              // Array de colores para cada barra
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              // Colores de borde correspondientes
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Fondo blanco (RGBA)
            },
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Fondo blanco (RGBA)
            },
          },
        },
        plugins: {
          legend: {
            // Oculta la leyenda,
            display: true,
          },
          title: {
            display: true,
          },
          tooltip: {
            callbacks: {
              // Configura la función de formato del tooltip
              label: function (context) {
                return (
                  context.dataset.label +
                  ': ' +
                  context.parsed.y.toFixed(2) +
                  '%'
                );
              },
            },
          },
        },
      },
    });

    this.chart4 = new Chart('grafica4', {
      type: 'bar',
      data: {
        labels: [`${this.dataReporte.porcentaje_tutores_carrera_asignados}%`],
        datasets: [
          {
            label: 'INDICADORES DE PARTICIPACION',
            data: [this.dataReporte.porcentaje_tutores_carrera_asignados],
            backgroundColor: [
              // Array de colores para cada barra
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              // Colores de borde correspondientes
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Fondo blanco (RGBA)
            },
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Fondo blanco (RGBA)
            },
          },
        },
        plugins: {
          legend: {
            // Oculta la leyenda,
            display: true,
          },
          title: {
            display: true,
          },
          tooltip: {
            callbacks: {
              // Configura la función de formato del tooltip
              label: function (context) {
                return (
                  context.dataset.label +
                  ': ' +
                  context.parsed.y.toFixed(2) +
                  '%'
                );
              },
            },
          },
        },
      },
    });
    this.chart5 = new Chart('grafica5', {
      type: 'bar',
      data: {
        labels: [
          'Alumnos canalizados a psicologia',
          'Alumnos canalizados a servicios academicos',
          'Alumnos canalizados a becas',
          'Alumnos canalizados a servicios de salud',
          'Alumnos canalizados a instacias extras',
          'Alumnos canalizados a otros servicios',
        ],
        datasets: [
          {
            label: 'RESPUESTA AL PROGRAMA Diagnostico inicial y Asistencia.',
            data: [
              this.dataReporte.porcentaje_alumnos_atendidos_piscologia,
              this.dataReporte.porcentaje_alumnos_atendidos_academica,
              this.dataReporte.porcentaje_alumnos_atendidos_becas,
              this.dataReporte.porcentaje_alumnos_atendidos_salud,
              this.dataReporte.porcentaje_alumnos_atendidos_instancias_extras,
              this.dataReporte.porcentaje_alumnos_atendidos_otros,
            ],
            backgroundColor: [
              // Array de colores para cada barra
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              // Colores de borde correspondientes
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Fondo blanco (RGBA)
            },
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Fondo blanco (RGBA)
            },
          },
        },
        plugins: {
          legend: {
            // Oculta la leyenda,
            display: true,
          },
          title: {
            display: true,
          },
          tooltip: {
            callbacks: {
              // Configura la función de formato del tooltip
              label: function (context) {
                return (
                  context.dataset.label +
                  ': ' +
                  context.parsed.y.toFixed(2) +
                  '%'
                );
              },
            },
          },
        },
      },
    });
  }

  uploadedFile: File = new File([], '');
  data_excel: any[] = []; // Aquí almacenarás los datos del archivo Excel
  loadExcelFile() {
    //debugger;
    // Ruta al archivo Excel existente dentro de la carpeta "assets"
    const filePath = '../../../../../assets/formato_reporte_semestral.xlsx';

    // Realiza la solicitud HTTP para cargar el archivo
    fetch(filePath)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        //debugger;
        const arrayBuffer = new Uint8Array(data);
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        // Supongamos que el archivo Excel tiene una sola hoja
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        worksheet['C2'] = {
          t: 's',
          v: 'Valor personalizado',
          s: {
            fill: {
              fgColor: { rgb: 'FFFF00' }, // Amarillo
            },
          },
        };

        // Convierte los datos de la hoja de cálculo en un objeto JavaScript
        const dataFromExcel = XLSX.utils.sheet_to_json(worksheet);

        // Modifica los valores de las celdas C12 a C69 con datos personalizados
        for (let i = 11; i < 69; i++) {
          // Indices basados en 0
          worksheet['C' + (i + 2)] = { t: 's', v: `Valor personalizado ${i}` }; // Cambia el valor aquí
        }

        // Convierte el archivo Excel editado a un array
        const arrayData = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
        });

        // Luego, crea un blob a partir del array
        const blob = new Blob([arrayData], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        // Crea un objeto URL para el blob
        const blobURL = URL.createObjectURL(blob);

        // Crea un enlace temporal y simula un clic para descargar el archivo
        const link = document.createElement('a');
        link.href = blobURL;
        link.download = 'mi-archivo-editado.xlsx';
        link.click();
      });
  }

  // ...

  // ...

  downloadExcel() {
    const editedWorkbook = XLSX.utils.book_new();
    const editedWorksheet = XLSX.utils.json_to_sheet(this.data_excel);
    XLSX.utils.book_append_sheet(editedWorkbook, editedWorksheet, 'Hoja1');

    // Modificar las celdas C12 a C69 con los valores personalizados
    for (let i = 11; i < 69; i++) {
      const cellAddress = `C${i + 2}`;
      const cellValue = `Valor personalizado ${i}`;
      editedWorksheet[cellAddress] = { t: 's', v: cellValue };
    }

    // Convierte el archivo Excel editado a un array
    const arrayData = XLSX.write(editedWorkbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // Luego, crea un blob a partir del array
    const blob = new Blob([arrayData], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Crea un objeto URL para el blob
    const blobURL = URL.createObjectURL(blob);

    // Crea un enlace temporal y simula un clic para descargar el archivo
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = 'mi-archivo-editado.xlsx';
    link.click();
  }

  // downloadExcel() {
  //   const editedWorkbook = XLSX.utils.book_new();
  //   const editedWorksheet = XLSX.utils.json_to_sheet(this.data_excel);
  //   XLSX.utils.book_append_sheet(editedWorkbook, editedWorksheet, 'Hoja1');

  //   // Convierte el archivo Excel editado a un blob
  //   const blob = XLSX.write(editedWorkbook, { bookType: 'xlsx', type: 'blob' as any });

  //   // Crea un objeto URL para el blob
  //   const blobURL = URL.createObjectURL(blob);

  //   // Crea un enlace temporal y simula un clic para descargar el archivo
  //   const link = document.createElement('a');
  //   link.href = blobURL;
  //   link.download = 'mi-archivo-editado.xlsx';
  //   link.click();
  // }

  openDialog(alumno: any): void {
    const fecha_actual = new Date(this.fechaFormateada2);
    const fecha_final = new Date(this.fecha_fin);
    const fecha_inicio = new Date(this.fecha_inicio);
    // 10/09/2023  === 09/09/2023
    if (fecha_actual > fecha_final) {
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

    if (fecha_actual < fecha_inicio) {
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

    if (this.data.ESTATUS === 1) {
      alumno.periodo =
        data_informe.periodo === 'PRIMERO'
          ? 1
          : data_informe.periodo === 'SEGUNDO'
          ? 2
          : data_informe.periodo === 'TERCERO'
          ? 3
          : 4;

      //Primero validamos que el alumno pueda registrar un infome semestral:
      let id_alumno = alumno.id;
      let id_tutor = this.formulario.controls.tutor.value;
      let id_generacion = parseInt(
        this.formulario.controls.generacion.value?.toString()!
      );
      let periodo = alumno.periodo;
      let data = {
        id_alumno: id_alumno,
        id_tutor: id_tutor,
        id_generacion: id_generacion,
        periodo: periodo,
      };
      this.loadSpinner.emit('true');
      this.api
        .verificarAlumnoReporteSemestral(data)
        .pipe(
          catchError((err) => {
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
          })
        )
        .subscribe((res: any) => {
          if (res.codigo === 1) {
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
          } else {
            setTimeout(() => {
              this.loadSpinner.emit('false');

              const modal: any = this.dialog.open(InformeSemestralComponent, {
                width: '100%',
                disableClose: false,
              });
              data_informe.nombre_informe = 'INFORME SEMESTRAL';
              this.datosInformesService.setData(alumno, data_informe);
            }, 1000);
          }
        });

      // this.datosInformesService.setData(alumno, data_informe);
    }

    if (
      this.formulario.controls.informe.value == 'primer_informe' &&
      this.data.ESTATUS === 0
    ) {
      const modal: any = this.dialog.open(PrimerInformeComponent, {
        width: '100%',
        disableClose: false,
      });

      data_informe.nombre_informe = 'PRIMER INFORME';
      //Mandamos los datos al servicio:
      this.datosInformesService.setData(alumno, data_informe);
    }

    if (
      this.formulario.controls.informe.value == 'segundo_informe' &&
      this.data.ESTATUS === 0
    ) {
      const modal: any = this.dialog.open(SegundoInformeComponent, {
        width: '100%',
        disableClose: false,
      });
      data_informe.nombre_informe = 'SEGUNDO INFORME';

      //Mandamos los datos al servicio:
      this.datosInformesService.setData(alumno, data_informe);
    }
    if (
      this.formulario.controls.informe.value == 'tercer_informe' &&
      this.data.ESTATUS === 0
    ) {
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

  fechaFormateada: string = ''; //10/09/2021
  fechaFormateada2: string = ''; // 2021/09/10
  listaCarreras: any[] = [];
  nombreGeneracion: string = '';
  ngOnInit() {
    const fechaActual = new Date();
    const formatoFecha: any = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    this.fechaFormateada = fechaActual.toLocaleDateString(
      'es-ES',
      formatoFecha
    );
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Agregar 1 porque enero es 0
    const anio = fechaActual.getFullYear();

    this.fechaFormateada2 = `${anio}-${mes}-${dia}`;
    this.fechaFormateada = fechaActual.toLocaleDateString(
      'es-ES',
      formatoFecha
    );

    //console.log('Fecha actual: ', this.fechaFormateada);
    //console.log('Fecha actual2: ', this.fechaFormateada2);

    this.titulo.emit('GENERAR REPORTE PARCIAL');
    this.loadSpinner.emit('true');
    this.api.obtenerCarreras().subscribe((res: any) => {
      this.listaCarreras = res.data;
      this.api.obtenerGeneraciones().subscribe((res: any) => {
        this.generaciones = res.data;
        this.loadSpinner.emit('false');
        this.renderChart();
      });
    });
  }

  //ngOnInit(): void {
    //this.reporteParcialService.generarReporteParcial({}).subscribe(data => {
      //this.reporteData = data;
    //});
  //}


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

  convertirMayusculas(control: FormControl) {
    control.setValue(control.value.toUpperCase());
  }

  //Esta funcion se utiliza para convertir la fecha y mostrarla en el input.
  convertirFecha(fecha: string): string {
    const fechaObjeto = new Date(fecha);
    const fechaFormateada = fechaObjeto.toISOString().split('T')[0];
    return fechaFormateada;
  }

  // Mapa para almacenar las asignaciones de docentes y alumnos
  asignaciones: Map<any, any[]> = new Map();
  mostrar_btn_guardar: boolean = false;
  // Función para realizar la asignación de alumnos a docentes

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

  dataReporte: any;
  generarReporte() {
    
    let data = {
      id_generacion: this.formulario.controls.generacion.value,
      id_periodo: this.formulario.controls.periodo.value,
      id_carrera: this.formulario.controls.informe.value,
      // id_tutor: this.formulario.controls.tutor.value,
      periodo:
        this.formulario.controls.periodo.value === 'PRIMERO'
          ? 1
          : this.formulario.controls.periodo.value === 'SEGUNDO'
          ? 2
          : this.formulario.controls.periodo.value === 'TERCERO'
          ? 3
          : 4,
    };

    console.log('Data a enviar: ', data);
    if (
      data.id_generacion == '' ||
      data.id_periodo == ''
      // data.informe == ''
      // data.id_tutor == null
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

    //Primero verificamos que pueda generar el reporte semestral:
    this.loadSpinner.emit('true');
    this.api
      .verificacionInformesCoordinadorInst(data)
      .pipe(
        catchError((err: any) => {
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
        })
      )
      .subscribe((res: any) => {
        if (res.codigo === 1) {
          if (res.ESTATUS === 1) {
            this.loadSpinner.emit('false');

            this.api.generarReportesSemestrales(data).subscribe((res: any) => {
              if (res.codigo === 1) {
                //Generamos el reporte semestral:
                this.dataReporte = res.data;

                console.log('Data reporte: ', this.dataReporte);
                Swal.fire({
                  icon: 'info',
                  iconColor: 'rgb(128, 0, 0)',
                  title: 'Generando reporte...',
                  html: `<input type="number" id="tutores_capacitados_year" min="0" class="swal2-input" placeholder="Tutores capacitados en el año" required> <br>
                  `,
                  heightAuto: false,
                  confirmButtonColor: 'rgb(128, 0, 0)',
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  confirmButtonText: 'Generar reporte',
                  cancelButtonText: 'Cancelar',
                  showCancelButton: true,
                }).then((result) => {
                  if (result.isConfirmed) {

                    //Obtenemos los valores de los inputs:
                    //debugger;
                    let tutores_capacitados_year = parseInt(
                      (document.getElementById('tutores_capacitados_year') as HTMLInputElement).value
                      );

                        this.tutores_capacitados_year = tutores_capacitados_year;

                        if(this.tutores_capacitados_year> this.dataReporte.numero_tutores_carrera_total){
                          // Mandamos alerta de que no puede ser mayor al numero total de tutorados:
                          Swal.fire({
                            icon: 'info',
                            iconColor: 'rgb(128, 0, 0)',
                            title: 'No puedes generar el reporte semestral.',
                            text: `El numero de tutores capacitados no puede ser mayor al numero de tutores totales.`,
                            footer: '',
                            heightAuto: false,
                            confirmButtonColor: 'rgb(128, 0, 0)',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                          });
                          return;
                        }else{
                          this.mostrarPeriodos = true;
                          setTimeout(() => {

                            this.renderChart();
                          }, 500);
                        }

                        // this.descargarPDF();
                        //Mostramos periodos:

                      }
                      if(result.isDismissed){
                        return;
                      }
                    });


              }
              if (res.codigo === 2) {
                //NO puede generar el reporte semestral.
              }
            });
          } else {
            //Mandamos alerta de que aun no puede generar el reporte semestral:
            this.loadSpinner.emit('false');
            Swal.fire({
              icon: 'info',
              iconColor: 'rgb(128, 0, 0)',
              title: 'No puedes generar el reporte semestral.',
              text: `${res.mensaje}`,
              html:`

              <h1 style="text-align: center;">INFORMACION DE INFORMES</h1>
              <div style="background-color: #333; color: #fff; padding: 10px;">PRIMER INFORME</div>
              <div style="display: flex; justify-content: space-between; flex-direction:row; width:100%;">
                  <div style="display: flex; justify-content: start; flex-direction:column; width:80%;">
                    <p style="text-align: left;">Informes terminados:</p>
                  </div>
                  <div style="display: flex; justify-content: end; flex-direction:column; width:20%">
                      <p>${res.PRIMERO.total_primer_informe_terminado}</p>
                  </div>
              </div>
              <div style="display: flex; justify-content: space-between; flex-direction:row; width:100%;">
                  <div style="display: flex; justify-content: start; flex-direction:column; width:80%;">
                    <p style="text-align: left;">Total tutorados:</p>
                  </div>
                  <div style="display: flex; justify-content: end; flex-direction:column; width:20%">
                      <p>${res.PRIMERO.total_tutorados}</p>
                  </div>
              </div>
              <div style="display: flex; justify-content: space-between; flex-direction:row; width:100%;">
                  <div style="display: flex; justify-content: start; flex-direction:column; width:80%;">
                    <p style="text-align: left;">Informes pendientes:</p>
                  </div>
                  <div style="display: flex; justify-content: end; flex-direction:column; width:20%">
                      <p>${res.PRIMERO.pendientes}</p>
                  </div>
              </div>

              <div style="background-color: #333; color: #fff; padding: 10px;">SEGUNDO INFORME</div>
                <div style="display: flex; justify-content: space-between; flex-direction:row; width:100%;">
                  <div style="display: flex; justify-content: start; flex-direction:column; width:80%;">
                    <p style="text-align: left;">Informes terminados:</p>
                  </div>
                  <div style="display: flex; justify-content: end; flex-direction:column; width:20%">
                      <p>${res.SEGUNDO.total_segundo_informe_terminado}</p>
                  </div>
              </div>
              <div style="display: flex; justify-content: space-between; flex-direction:row; width:100%;">
                  <div style="display: flex; justify-content: start; flex-direction:column; width:80%;">
                    <p style="text-align: left;">Total tutorados:</p>
                  </div>
                  <div style="display: flex; justify-content: end; flex-direction:column; width:20%">
                      <p>${res.SEGUNDO.total_tutorados}</p>
                  </div>
              </div>
            <div style="display: flex; justify-content: space-between; flex-direction:row; width:100%;">
                  <div style="display: flex; justify-content: start; flex-direction:column; width:80%;">
                    <p style="text-align: left;">Informes pendientes:</p>
                  </div>
                  <div style="display: flex; justify-content: end; flex-direction:column; width:20%">
                      <p>${res.SEGUNDO.pendientes}</p>
                  </div>
            </div>

            <div style="background-color: #333; color: #fff; padding: 10px;">TERCER INFORME</div>
              <div style="display: flex; justify-content: space-between; flex-direction:row; width:100%;">
                    <div style="display: flex; justify-content: start; flex-direction:column; width:80%;">
                      <p style="text-align: left;">Informes terminados:</p>
                    </div>
                    <div style="display: flex; justify-content: end; flex-direction:column; width:20%">
                        <p>${res.TERCERO.total_tercer_informe_terminado}</p>
                    </div>
              </div>
              <div style="display: flex; justify-content: space-between; flex-direction:row; width:100%;">
                  <div style="display: flex; justify-content: start; flex-direction:column; width:80%;">
                    <p style="text-align: left;">Total tutorados:</p>
                  </div>
                  <div style="display: flex; justify-content: end; flex-direction:column; width:20%">
                      <p>${res.TERCERO.total_tutorados}</p>
                  </div>
              </div>
              <div style="display: flex; justify-content: space-between; flex-direction:row; width:100%;">
                  <div style="display: flex; justify-content: start; flex-direction:column; width:80%;">
                    <p style="text-align: left;">Informes pendientes:</p>
                  </div>
                  <div style="display: flex; justify-content: end; flex-direction:column; width:20%">
                      <p>${res.TERCERO.pendientes}</p>
                  </div>
              </div>

              <h2 style="background-color: #333; color: #fff; padding: 10px;">TOTAL</h2>
                  <div style="display: flex; justify-content: space-between; flex-direction:row; width:100%;">
                      <div style="display: flex; justify-content: start; flex-direction:column; width:80%;">
                        <p style="text-align: left;">TOTAL DE INFORMES TERMINADOS:</p>
                      </div>
                      <div style="display: flex; justify-content: end; flex-direction:column; width:20%">
                          <p>${res.TOTAL_INFORMES_TERMINADOS}</p>
                      </div>
                  </div>
                  <div style="display: flex; justify-content: space-between; flex-direction:row; width:100%;">
                      <div style="display: flex; justify-content: start; flex-direction:column; width:80%;">
                        <p style="text-align: left;">TOTAL DE INFORMES PENDIENTES:</p>
                      </div>
                      <div style="display: flex; justify-content: end; flex-direction:column; width:20%">
                          <p>${res.PENDIENTES_TOTALES}</p>
                      </div>
                  </div>
                  <div style="display: flex; justify-content: space-between; flex-direction:row; width:100%;">

              `,
              footer: '',
              heightAuto: false,
              confirmButtonColor: 'rgb(128, 0, 0)',
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
          }
        }
      });
    this.datosCargados = true;
  }
}
