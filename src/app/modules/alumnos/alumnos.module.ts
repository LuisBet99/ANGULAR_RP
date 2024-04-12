import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { AlumnosComponent } from './alumnos.component';
import { InicioComponent } from './pages/inicio/inicio.component';


@NgModule({
  declarations: [
    AlumnosComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    MaterialModule,
  ]
})
export class AlumnosModule { }
