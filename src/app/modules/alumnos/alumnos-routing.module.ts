import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos.component';
import { InicioComponent } from './pages/inicio/inicio.component';

const routes: Routes = [

  {
    path: '',
    component: AlumnosComponent,
    children: [
      {
        path: 'inicio',
        component: InicioComponent
      },
      {
        path: '**',
        redirectTo: 'inicio',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
