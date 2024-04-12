import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { AuthComponent } from './auth.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PrimengModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  exports:[
    AuthComponent
  ]
})
export class AuthModule { }
