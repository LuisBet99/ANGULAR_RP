import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoordinadorTutoriasComponent } from './coordinador-tutorias.component';
import { VerGeneracionesComponent } from './pages/ver-generaciones/ver-generaciones.component';
import { ResporteMensualComponent } from './pages/resporte-mensual/resporte-mensual.component';
import { VerAsignacionesComponent } from './pages/ver-asignaciones/ver-asignaciones.component';
import { AvisosComponent } from './pages/avisos/avisos.component';

const routes: Routes = [
  {
    path: '',
    component: CoordinadorTutoriasComponent,
    children: [
      {
        path: 'ver-generaciones',
        component: VerGeneracionesComponent
      },
      {
        path: 'reporte-mensual',
        component: ResporteMensualComponent
      },
      {
        path: 'ver-asignaciones',
        component: VerAsignacionesComponent
      },
      {
        path: 'ver-avisos',
        component: AvisosComponent
      },
      {
        path: '**',
        redirectTo: 'ver-generaciones'
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinadorTutoriasRoutingModule { }
