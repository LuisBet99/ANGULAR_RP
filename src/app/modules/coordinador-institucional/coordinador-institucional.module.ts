import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinadorInstitucionalRoutingModule } from './coordinador-institucional-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { CoordinadorInstitucionalComponent } from './coordinador-institucional.component';
import { VerGeneracionesComponent } from './pages/ver-generaciones/ver-generaciones.component';
import { CargarGeneracionesComponent } from './pages/cargar-generaciones/cargar-generaciones.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CargarAlumnosComponent } from './pages/cargar-alumnos/cargar-alumnos.component';
import { VerAlumnosComponent } from './pages/ver-alumnos/ver-alumnos.component';
import { CargarTutoresComponent } from './pages/cargar-tutores/cargar-tutores.component';
import { CargarCarrerasComponent } from './pages/cargar-carreras/cargar-carreras.component';
import { CargarDocentesComponent } from './pages/cargar-docentes/cargar-docentes.component';
import { ReporteSemestralComponent } from './pages/reporte-semestral/reporte-semestral.component';
import { AvisosComponent } from './pages/avisos/avisos.component';
import { ReporteParcialComponent } from './pages/reporte-parcial/reporte-parcial.component';


@NgModule({
  declarations: [
    CoordinadorInstitucionalComponent,
    VerGeneracionesComponent,
    CargarGeneracionesComponent,
    CargarAlumnosComponent,
    VerAlumnosComponent,
    CargarTutoresComponent,
    CargarCarrerasComponent,
    CargarDocentesComponent,
    ReporteSemestralComponent,
    AvisosComponent,
    ReporteParcialComponent
  ],
  imports: [
    CommonModule,
    CoordinadorInstitucionalRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class CoordinadorInstitucionalModule { }
