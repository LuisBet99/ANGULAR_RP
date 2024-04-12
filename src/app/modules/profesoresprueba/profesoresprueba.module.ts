import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesorespruebaRoutingModule } from './profesoresprueba-routing.module';
import { ProfesorespruebaComponent } from './profesoresprueba.component';
import { InicioPruebaComponentComponent } from './inicio-prueba-component/inicio-prueba-component.component';


@NgModule({
  declarations: [
    ProfesorespruebaComponent,
    InicioPruebaComponentComponent
  ],
  imports: [
    CommonModule,
    ProfesorespruebaRoutingModule
  ]
})
export class ProfesorespruebaModule { }
