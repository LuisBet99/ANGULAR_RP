import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from './primeng/primeng.module';
import { AuthModule } from './modules/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ProfesorespruebaModule } from './modules/profesoresprueba/profesoresprueba.module';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    UpdatePasswordComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    PrimengModule,
    AuthModule,
    BrowserAnimationsModule,
    DashboardModule,
    HttpClientModule,
    ProfesorespruebaModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }