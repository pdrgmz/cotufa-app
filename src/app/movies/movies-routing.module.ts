import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';

import { UserGuard } from '../auth/user.guard';

import { HomeComponent } from './home/home.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { MovieformComponent } from './movieform/movieform.component';
import { MoviesextraComponent } from './moviesextra/moviesextra.component';


const routes: Routes = [
  
  {path: '', redirectTo:'/movies/home' , pathMatch: 'full'},
   
  {path: 'auth/login', component: LoginComponent },
  {path: 'auth/register', component: RegisterComponent},
  

  {path: 'movies/:id/edit', component: MovieformComponent, canActivate: [UserGuard]},
  {path: 'movies/add', component: MovieformComponent,  canActivate: [UserGuard]},

  {path: 'movies/home', component: HomeComponent},
  {path: 'movies/:id', component: MoviesextraComponent},

  {path: 'moviesextra/:id', component: MoviesextraComponent}

  
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { 

  
}
