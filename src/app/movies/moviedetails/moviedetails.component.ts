import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef
  idMovie: string;

  poster_path: string;
  backdrop_path: string;

  movie: any;
  
  constructor( private route: ActivatedRoute, private moviesService: MoviesService, private router: Router, public toasterService: ToastrService) { }

  
  ngOnInit() {

    this.idMovie = this.route.snapshot.params['id'];

    this.moviesService.getMoviebyId(this.idMovie).subscribe(response =>{
      if(response){
        this.movie = response;

        this.loadMovieImages(response.title);
      }
    })

    
  }

  removeMovie(id){
    console.log(id)

    this.moviesService.removeMovie(this.idMovie).subscribe(response =>{
      if(response){
        console.log(response)
        this.router.navigateByUrl('/movies/home');
        this.closeModal.nativeElement.click()  
        this.toasterService.success(null, "Movie removed successfully", { positionClass: 'toast-bottom-center' });      
      }
    })
    
  }


  async loadMovieImages(title){

    this.poster_path = "https://via.placeholder.com/500x750?text="+title;

    await this.moviesService.getExtraMovie(title).subscribe(response =>{
      if(response){
        this.poster_path = response.results[0].poster_path ? "https://image.tmdb.org/t/p/w500"+ response.results[0].poster_path : null;
        this.backdrop_path = response.results[0].backdrop_path ? "https://image.tmdb.org/t/p/original"+ response.results[0].backdrop_path : null;
      }
    })
  }

}
