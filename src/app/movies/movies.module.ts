import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';

import { HomeComponent } from './home/home.component';
import { MoviesService } from '../services/movies.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from '../services/jwt-interceptor.service';
import { PaginatorComponent } from './paginator/paginator.component';
import { MovieComponent } from './movie/movie.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { MovieformComponent } from './movieform/movieform.component';
import { AuthService } from '../services/auth.service';
import { HttpErrorInterceptor } from '../services/httperror-interceptor.service';





@NgModule({
  declarations: [HomeComponent, PaginatorComponent, MovieComponent, MoviedetailsComponent, MovieformComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MoviesRoutingModule
  ],
  providers:[
    MoviesService,
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
    }
  ]
})
export class MoviesModule { }
