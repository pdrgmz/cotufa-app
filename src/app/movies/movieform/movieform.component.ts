import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movieform',
  templateUrl: './movieform.component.html',
  styleUrls: ['./movieform.component.css']
})
export class MovieformComponent implements OnInit {

  mode: string; //add or edit

  idMovie: string;

  poster_path: string;
  backdrop_path: string;

  movie: any;
  suggestedGenres: any;

  constructor( private route: ActivatedRoute, private moviesService: MoviesService, private router: Router, public toasterService: ToastrService) { }

  
  ngOnInit() {

    

    

    console.log("ASDASD")

    
    this.idMovie = this.route.snapshot.params['id'];

    this.mode = this.router.url.split('/').pop();

    this.moviesService.getSuggestedGenres().subscribe(response =>{
      if(response){
        this.suggestedGenres = response.genres;    
        console.log(this.suggestedGenres)    
      }
    })

    if(this.mode == 'add'){
      
      this.poster_path = "https://via.placeholder.com/500x750?text=%20";
      this.movie = { rating: 1};

    }

    if(this.mode == 'edit'){
      this.moviesService.getMoviebyId(this.idMovie).subscribe(response =>{
        if(response){
          this.movie = response;
          this.loadMovieImages(this.movie.title);          
        }
      })

    }



    //Form inline validation iniciator
    (function () {
      'use strict'
    
      var forms = document.querySelectorAll('.needs-validation')

      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
    
            form.classList.add('was-validated')
          }, false)
        })
    })()

  }


  async loadMovieImages(title){
    this.poster_path = "https://via.placeholder.com/500x750?text="+title;
    this.backdrop_path = "";
    await this.moviesService.getExtraMovie(title).subscribe(response =>{
      if(response){
        this.poster_path = "https://image.tmdb.org/t/p/w500"+ response.results[0].poster_path;
        this.backdrop_path = "https://image.tmdb.org/t/p/original"+ response.results[0].backdrop_path;
      }
    }, error =>{
      console.log(error)
    })
  }

  onSubmit(form){

    console.log(form.value)

    if(form.valid){
      if(this.mode == 'edit'){

        console.log('edit')
        this.moviesService.editMovie(form.value, this.movie.id).subscribe(response =>{
          if(response){
            console.log(response)
            this.loadMovieImages(response.title)
            this.router.navigate(['/movies/'+this.movie.id])
            this.toasterService.success(null, "Movie edited successfully", { positionClass: 'toast-bottom-center' });

          }
        })

        

      }
      if(this.mode == 'add'){

        this.moviesService.addMovie(form.value).subscribe(response =>{
          if(response){
            console.log(response)
            this.loadMovieImages(response.title)
            this.router.navigate(['/movies/'+response.id])
            this.toasterService.success(null, "Movie created successfully", { positionClass: 'toast-bottom-center' });
          }
        })

      }
      



    }

  }

}
