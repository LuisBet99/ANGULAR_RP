import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { coordinadorInstGuard } from './guards/coordinador-inst.guard';
import { coordinadorTutGuard } from './guards/coordinador-tut.guard';
import { docentesGuard } from './guards/docentes.guard';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'update-password',
    component: UpdatePasswordComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./modules/alumnos/alumnos.module').then((m) => m.AlumnosModule)
  },
  {
    path: 'tutores',
    loadChildren: () => import('./modules/tutores/tutores.module').then((m) => m.TutoresModule),
    canActivate: [docentesGuard]
  },
  {
    path: 'coordinador-tutorias',
    loadChildren: () => import('./modules/coordinador-tutorias/coordinador-tutorias.module').then((m) => m.CoordinadorTutoriasModule),
    canActivate: [coordinadorTutGuard]
  },
  {
    path: 'coordinador-institucional',
    loadChildren: () => import('./modules/coordinador-institucional/coordinador-institucional.module').then((m) => m.CoordinadorInstitucionalModule),
    //canActivate: [coordinadorInstGuard]
  },
  {
    path: 'profesoresprueba',
    loadChildren: () => import('./modules/profesoresprueba/profesoresprueba.module').then((m) => m.ProfesorespruebaModule)
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

