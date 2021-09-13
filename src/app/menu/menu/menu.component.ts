import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';
import { SharedService } from 'src/app/shared/shared.service';
import jwt_decode from "jwt-decode";
import { HomeComponent } from 'src/app/movies/home/home.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @ViewChild('closeModalLogOut') closeModalLogOut: ElementRef

  @ViewChild('closeModalRemoveMovie') closeModalRemoveMovie: ElementRef
  
  movies: Movie[];

  genres: any;

  genre: string  = "All";

  title: string = "";

  page: number;
  size: number;
  total: number;

  username;

  loading = false;

  jwt: string
  roles: any;

  constructor(
    private moviesService: MoviesService, 
    private authService: AuthService, 
    private router: Router, 
    private shared: SharedService) { }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  ngOnInit() {

    this.loading = true

    this.shared.getJWT().subscribe(
      jwt => {
        
        this.jwt = jwt

        let tokenInfo = this.getDecodedAccessToken(jwt)

        console.log(tokenInfo)

        if(tokenInfo){
          this.username = tokenInfo.sub
          this.roles = tokenInfo.role
        }else{
          this.username = '';
          this.roles = '';
        }
        
        
      }
    )
    this.loading = false
  }



  logOut(){

    this.authService.eliminarToken();

    this.router.navigateByUrl('/auth/login');
    this.closeModalLogOut.nativeElement.click()   

  }





}
