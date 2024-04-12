import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinadorTutoriasRoutingModule } from './coordinador-tutorias-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { CoordinadorTutoriasComponent } from './coordinador-tutorias.component';
import { VerGeneracionesComponent } from './pages/ver-generaciones/ver-generaciones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResporteMensualComponent } from './pages/resporte-mensual/resporte-mensual.component';
import { VerAsignacionesComponent } from './pages/ver-asignaciones/ver-asignaciones.component';

import { AvisosComponent } from './pages/avisos/avisos.component';

@NgModule({
  declarations: [
    CoordinadorTutoriasComponent,
    VerGeneracionesComponent,
    ResporteMensualComponent,
    VerAsignacionesComponent,
    AvisosComponent

  ],
  imports: [
    CommonModule,
    CoordinadorTutoriasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CoordinadorTutoriasModule { }
