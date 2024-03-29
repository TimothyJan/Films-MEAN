import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.scss']
})
export class CardCarouselComponent implements OnInit {
  results: String[] | undefined;
  movies: Product[];

  responsiveOptions: any[] | undefined;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit() {
    this.tmdbService.getProductsSmall().then((movies) => {
      this.movies = movies;
  });

    this.getNowPlaying();

    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
    ];
  }

  async getNowPlaying() {
    this.results = await this.tmdbService.getNowPlaying();
    console.log(this.results);
  }



}
