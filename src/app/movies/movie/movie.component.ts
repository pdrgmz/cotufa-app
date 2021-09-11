import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class MovieComponent implements OnInit {

  @Input() item;
  imgPath: string;

  loading = false 

  constructor(private moviesService: MoviesService) { }

  flip: string = 'inactive';

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  ngOnInit() {
    this.loading = true

    this.loadMovie();    

    this.loading = false

  }


  async loadMovie(){
    this.imgPath = "https://via.placeholder.com/500x750?text=" + this.item.title;
    await this.moviesService.getExtraMovie(this.item.title).subscribe(response =>{
      if(response){
        this.imgPath = "https://image.tmdb.org/t/p/w500"+ response.results[0].poster_path;
      }
    })
  }

}
