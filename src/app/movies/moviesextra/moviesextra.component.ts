import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-moviesextra',
  templateUrl: './moviesextra.component.html',
  styleUrls: ['./moviesextra.component.css']
})
export class MoviesextraComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
  ) { }

  movie

  ngOnInit() {

    let idMovie = this.route.snapshot.params['id'];

    this.moviesService.getMoviebyId(idMovie).subscribe(response =>{
      if(response){
        this.movie = response;
        console.log(this.movie)

        this.loadMovieImages(response.title);
      }
    })

    
  }
  

  async loadMovieImages(title){

    this.movie.poster_path = "https://via.placeholder.com/500x750?text="+title;

    await this.moviesService.getExtraMovie(title).subscribe(response =>{
      if(response){
        this.movie.poster_path = response.results[0].poster_path ? "https://image.tmdb.org/t/p/original"+ response.results[0].poster_path : null;
        this.movie.backdrop_path = response.results[0].backdrop_path ? "https://image.tmdb.org/t/p/original"+ response.results[0].backdrop_path : null;
      }
    })
  }


}
