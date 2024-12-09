import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ReporteParcialService {
  constructor(public http: HttpClient) {}

  dominio: string = 'http://127.0.0.1:8000/api/';

  login(data: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };

    let url: string = `${this.dominio}usuarios/login?login=${data.login}&password=${data.password}`;
    return this.http.post(url, httpOptions);
  }

  crearAviso(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };

    let url: string = `${this.dominio}coordinadorInstiucional/crearAviso`;
    return this.http.post(url, data ,httpOptions);
  }
  verAviso(){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    }
    let url: string = `${this.dominio}coordinadorInstiucional/verAviso`
    return this.http.get(url, httpOptions);
  }

  crearGeneraciones(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };

    let url: string = `${this.dominio}coordinadorInstiucional/crearGeneraciones`;
    return this.http.post(url, data ,httpOptions);
  }
  obtenerGeneraciones(){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    }
    let url: string = `${this.dominio}coordinadorInstiucional/obtenerGeneraciones`
    return this.http.get(url, httpOptions);
  }
  obtenerGeneracionesAlumnosAsignados(){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    }
    let url: string = `${this.dominio}coordinadorTutorias/obtenerGeneracionesAlumnosAsignados`
    return this.http.get(url, httpOptions);
  }

  obtenerAlumnosGeneraciones(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };

    let url: string = `${this.dominio}coordinadorTutorias/obtenerAlumnosGeneraciones`;
    return this.http.post(url, data ,httpOptions);
  }


  obtenerPeriodosFechasGeneracion(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };

    let url: string = `${this.dominio}coordinadorInstiucional/obtenerPeriodosFechasGeneracion`;
    return this.http.post(url, data ,httpOptions);
  }

  actualizarFechasGeneracion(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };

    let url: string = `${this.dominio}coordinadorInstiucional/actualizarFechasGeneracion`;
    return this.http.post(url, data ,httpOptions);
  }


  cargarNuevosAlumnos(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };

    let url: string = `${this.dominio}coordinadorInstiucional/cargarNuevosAlumnos`;
    return this.http.post(url, data ,httpOptions);
  }
  cargarDocentes(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };

    let url: string = `${this.dominio}coordinadorInstiucional/cargarDocentes`;
    return this.http.post(url, data ,httpOptions);
  }

  obtenerDocentesCarrera(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };

    let url: string = `${this.dominio}coordinadorInstiucional/obtenerDocentesCarrera`;
    return this.http.post(url, data ,httpOptions);
  }
  obtenerCarreras(){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    }
    let url: string = `${this.dominio}coordinadorInstiucional/obtenerCarreras`
    return this.http.get(url, httpOptions);
  }

  asignarTutorCarrera(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };

    let url: string = `${this.dominio}coordinadorInstiucional/asignarTutorCarrera`;
    return this.http.post(url, data ,httpOptions);
  }

  asignacionAlumnosTutorados(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };

    let url: string = `${this.dominio}coordinadorTutorias/asignacionAlumnosTutorados`;
    return this.http.post(url, data ,httpOptions);
  }
  obtenerListaTutorados(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };

    let url: string = `${this.dominio}Tutor/obtenerListaTutorados`;
    return this.http.post(url, data ,httpOptions);

  }
  capturarPrimerInforme(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };
    let url: string = `${this.dominio}Tutor/capturarPrimerInforme`;
    return this.http.post(url, data ,httpOptions);
  }
  capturarSegundoInforme(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };
    let url: string = `${this.dominio}Tutor/capturarSegundoInforme`;
    return this.http.post(url, data ,httpOptions);
  }
  capturarTercerInforme(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };
    let url: string = `${this.dominio}Tutor/capturarTercerInforme`;
    return this.http.post(url, data ,httpOptions);
  }
  verificacionInformes(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };
    let url: string = `${this.dominio}Tutor/verificacionInformes`;
    return this.http.post(url, data ,httpOptions);
  }

  verificacionInformesCoordinadorInst(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };
    let url: string = `${this.dominio}coordinadorInstiucional/verificacionInformesCoordinadorInst`;
    return this.http.post(url, data ,httpOptions);
  }
  loginGeneral(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };
    let url: string = `${this.dominio}coordinadorInstiucional/login`;
    return this.http.post(url, data ,httpOptions);
  }
  validarUsuario(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };
    let url: string = `${this.dominio}coordinadorInstiucional/validarUsuario`;
    return this.http.post(url, data ,httpOptions);
  }

  obtenerDatosReporteSemestralIndividual(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };
    let url: string = `${this.dominio}Tutor/obtenerDatosReporteSemestralIndividual`;
    return this.http.post(url, data ,httpOptions);
  }

  cargarInformeSemestralIndividual(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    };
    let url: string = `${this.dominio}Tutor/cargarInformeSemestralIndividual`;
    return this.http.post(url, data ,httpOptions);
  }
  verificarAlumnoReporteSemestral(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    }
    let url: string = `${this.dominio}Tutor/verificarAlumnoReporteSemestral`
    return this.http.post(url, data,httpOptions);
  }
  obtenerGeneracionesTutores(){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    }
    let url: string = `${this.dominio}Tutor/obtenerGeneracionesTutores`
    return this.http.get(url, httpOptions);
  }

  generarReportesSemestrales(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
      }),
    }
    let url: string = `${this.dominio}coordinadorInstiucional/generarReportesSemestrales`
    return this.http.post(url, data,httpOptions);
  }

  generarReporteParcial(data:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    }
    let url: string = `${this.dominio}coordinadorInstiucional/generarReporteParcial`
    return this.http.post(url, data,httpOptions);
  }



}
  
  
  
  

  

  
