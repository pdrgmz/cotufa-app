import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AuthRoutingModule  } from './auth-routing.module';

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

import { AuthService } from '../services/auth.service';
import { HttpErrorInterceptor } from '../services/httperror-interceptor.service';
import { JwtInterceptorService } from '../services/jwt-interceptor.service';


import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }]
})
export class AuthModule { }
