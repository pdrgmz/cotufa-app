import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  constructor(private moviesService: MoviesService, private authService: AuthService, private router: Router) { }

  @ViewChild('closeModal') closeModal: ElementRef
  
  movies: Movie[];

  genres: any;

  genre: string  = "All";

  title: string = "";

  page: number;
  size: number;
  total: number;

  loading = false

  ngOnInit() {
    this.loading = true

    
    this.moviesService.getMoviesGenre().subscribe(response =>{
      if(response){
        this.genres =  response;
      }
    })

    this.moviesService.getMovies(null, null, 0, 8, null).subscribe(response=>{
      if(response){

        this.page = 0;
        this.size = 8;
        this.total = response.totalPages;
        this.movies =  response.content;
      }
    })
    this.loading = false
  }

  searchMovie(form){

    var genre = this.genre;
    var title = form.value.title;

    if(genre == "All"){
      genre = null;
      this.genre = "All";
    }
    this.genre = genre;
    this.moviesService.getMovies(genre, title ? title.trim() : title, 0, 8, null).subscribe(response =>{
      if(response){

        this.page = 0;
        this.size = 8;
        this.total = response.totalPages;
        this.movies =  response.content;
      }
    })

  }

  loadMovies(genre?, title?){

    if(genre == "All"){
      genre = null;
      this.genre = "All";
    }
    this.genre = genre;
    this.moviesService.getMovies(genre, title ? title.trim() : title, 0, 8, null).subscribe(response =>{
      if(response){

        this.page = 0;
        this.size = 8;
        this.total = response.totalPages;
        this.movies =  response.content;
      }
    })

  }

  loadMoreMovies(){
    this.page = this.page + 1;
    this.moviesService.getMovies(null, null, this.page, this.size, null).subscribe(response =>{
      if(response){  
        this.movies = this.movies.concat(response.content) ;
      }
    })
  }


  logOut(){

    this.authService.eliminarToken();

    this.router.navigateByUrl('/auth/login');
    this.closeModal.nativeElement.click()   

  }


 

}
