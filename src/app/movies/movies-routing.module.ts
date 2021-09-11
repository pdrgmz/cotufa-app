import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { MovieformComponent } from './movieform/movieform.component';


const routes: Routes = [
  {path: '', redirectTo:'/movies/home' , pathMatch: 'full'},
   
  {path: 'home', component: HomeComponent},
  {path: 'add', component: MovieformComponent},

  {path: ':id', component: MoviedetailsComponent},
  {path: ':id/edit', component: MovieformComponent, pathMatch: 'full'}
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { 

  
}
