import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutoresComponent } from './tutores.component';
import { VerGeneracionesComponent } from './pages/ver-generaciones/ver-generaciones.component';
import { PrimerInformeComponent } from '../informes/primer-informe/primer-informe.component';
import { SegundoInformeComponent } from '../informes/segundo-informe/segundo-informe.component';
import { TercerInformeComponent } from '../informes/tercer-informe/tercer-informe.component';
import { InformeSemestralComponent } from '../informes/informe-semestral/informe-semestral.component';

const routes: Routes = [
  {
    path: '',
    component: TutoresComponent,
    children: [
      {
        path: 'ver-generaciones',
        component: VerGeneracionesComponent
      },
      {
        path: 'primer',
        component: PrimerInformeComponent
      },
      {
        path: 'segundo',
        component: SegundoInformeComponent
      },
      {
        path: 'tercer',
        component: TercerInformeComponent
      },
      {
        path: 'semestral',
        component: InformeSemestralComponent
      },
      {
        path: '**',
        redirectTo: 'ver-generaciones'

      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutoresRoutingModule { }
