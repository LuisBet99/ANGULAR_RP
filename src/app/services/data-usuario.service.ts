import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataUsuarioService {
  OnInit(){
    this.obtenerDatosLocalStorage();
  }
  constructor() {}
  nombre: string = '';
  apellido_paterno: string = '';
  apellido_materno: string = '';
  numero_checador: string = '';
  id_usuario: string = '';
  id_carrera: string = '';
  nombre_carrera: string = '';
  // {"id":1,"nombre":"ALAN","apellido_paterno":"CUEVAS","apellido_materno":"MELENDEZ","numero_checador":"192310781","mostrar":1,"id_usuario":1,"id_carrera":1,"nombre_carrera":"INGENIERÍA INFORMÁTICA"}
  obtenerDatosLocalStorage() {
    //debugger;
    let data_usuario = localStorage.getItem('data_usuario');
    if (data_usuario) {
      let data = JSON.parse(data_usuario);
      this.nombre = data.nombre;
      this.apellido_paterno = data.apellido_paterno;
      this.apellido_materno = data.apellido_materno;
      this.numero_checador = data.numero_checador;
      this.id_usuario = data.id_usuario;
      this.id_carrera = data.id_carrera;
      this.nombre_carrera = data.nombre_carrera;
    }
  }

  obtenerNombreCompleto() {
    this.obtenerDatosLocalStorage();
    return `${this.nombre} ${this.apellido_paterno} ${this.apellido_materno}`;
  }
  obteneridUsuario() {
    this.obtenerDatosLocalStorage();

    return this.id_usuario;
  }
  obteneridCarrera() {
    this.obtenerDatosLocalStorage();

    return this.id_carrera;
  }
  obtenerNombreCarrera() {
    this.obtenerDatosLocalStorage();

    return this.nombre_carrera;
  }
  obtenerNumeroChecador() {
    this.obtenerDatosLocalStorage();

    return this.numero_checador;
  }
  obtenerTodosLosDatos() {
    return {
      nombre: this.nombre,
      apellido_paterno: this.apellido_paterno,
      apellido_materno: this.apellido_materno,
      numero_checador: this.numero_checador,
      id_usuario: this.id_usuario,
      id_carrera: this.id_carrera,
      nombre_carrera: this.nombre_carrera,
    };
  }
  setDatosUsuario(data: any) {
    this.nombre = data.nombre;
    this.apellido_paterno = data.apellido_paterno;
    this.apellido_materno = data.apellido_materno;
    this.numero_checador = data.numero_checador;
    this.id_usuario = data.id_usuario;
    this.id_carrera = data.id_carrera;
    this.nombre_carrera = data.nombre_carrera;
    localStorage.setItem('data_usuario', JSON.stringify(data));
  }
}
