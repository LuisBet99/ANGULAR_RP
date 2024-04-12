import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutoresRoutingModule } from './tutores-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { TutoresComponent } from './tutores.component';
import { VerGeneracionesComponent } from './pages/ver-generaciones/ver-generaciones.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimerInformeComponent } from '../informes/primer-informe/primer-informe.component';
import { SegundoInformeComponent } from '../informes/segundo-informe/segundo-informe.component';
import { TercerInformeComponent } from '../informes/tercer-informe/tercer-informe.component';
import { InformeSemestralComponent } from '../informes/informe-semestral/informe-semestral.component';


@NgModule({
  declarations: [
    TutoresComponent,
    VerGeneracionesComponent,
    PrimerInformeComponent,
    SegundoInformeComponent,
    TercerInformeComponent,
    InformeSemestralComponent
  ],
  imports: [
    CommonModule,
    TutoresRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class TutoresModule { }
