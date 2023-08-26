import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
  @Input() tmdbId: string;
  title: string;
  image_path = "https://image.tmdb.org/t/p/original/";
  backdropPath: string;
  image_url: string;

  ngOnInit(): void {
    this.getMovieData();
  }

  async getMovieData() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/` + this.tmdbId + `?api_key=` +  environment.tmdbApiKey
    );
    const data = await response.json();
    this.title = data.title;
    this.backdropPath = data.backdrop_path;
    this.image_url = this.image_path + this.backdropPath;
    console.log(this.image_url);

    return data;
  }
}
