import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoordinadorInstitucionalComponent } from './coordinador-institucional.component';
import { VerGeneracionesComponent } from './pages/ver-generaciones/ver-generaciones.component';
import { CargarGeneracionesComponent } from './pages/cargar-generaciones/cargar-generaciones.component';
import { CargarAlumnosComponent } from './pages/cargar-alumnos/cargar-alumnos.component';
import { VerAlumnosComponent } from './pages/ver-alumnos/ver-alumnos.component';
import { CargarCarrerasComponent } from './pages/cargar-carreras/cargar-carreras.component';
import { CargarTutoresComponent } from './pages/cargar-tutores/cargar-tutores.component';
import { CargarDocentesComponent } from './pages/cargar-docentes/cargar-docentes.component';
import { ReporteSemestralComponent } from './pages/reporte-semestral/reporte-semestral.component';
import { AvisosComponent } from './pages/avisos/avisos.component';
import { ReporteParcialComponent } from './pages/reporte-parcial/reporte-parcial.component';

const routes: Routes = [
  {
    path: '',
    component: CoordinadorInstitucionalComponent,
    children: [
      {
        path: 'ver-generaciones',
        component: VerGeneracionesComponent
      },
      {
        path: 'cargar-generaciones',
        component: CargarGeneracionesComponent
      },
      {
        path: 'ver-alumnos',
        component: VerAlumnosComponent
      },
      {
        path: 'cargar-alumnos',
        component: CargarAlumnosComponent
      },
      {
        path: 'ver-docentes',
        component: VerGeneracionesComponent
      },
      {
        path: 'cargar-docentes',
        component: CargarDocentesComponent
      },
      {
        path: 'ver-carreras',
        component: VerGeneracionesComponent
      },
      {
        path: 'cargar-carreras',
        component: CargarCarrerasComponent
      },
       {
        path: 'cargar-tutores',
        component: CargarTutoresComponent
      },
      {
        path: 'reporte-semestral',
        component: ReporteSemestralComponent
      },
      {
        path: 'reporte-parcial',
        component: ReporteParcialComponent
      },
      {
        path: 'ver-avisos',
        component: AvisosComponent
      },
      {
        path: '**',
        redirectTo: 'ver-generaciones',
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'ver-generaciones',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinadorInstitucionalRoutingModule { }
