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
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    AuthModule,
    BrowserAnimationsModule,
    DashboardModule,
    HttpClientModule,
    ProfesorespruebaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
