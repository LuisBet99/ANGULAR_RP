import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioPruebaComponentComponent } from './inicio-prueba-component/inicio-prueba-component.component';
import { ProfesorespruebaComponent } from './profesoresprueba.component';

const routes: Routes = [

  {
    path: '',
    component: ProfesorespruebaComponent,
    children: [
      {
        path: 'inicio_prueba',
        component: InicioPruebaComponentComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesorespruebaRoutingModule { }
