import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private http: HttpClient) { }

  test() {
    return "TEST";
  }

  search(term:string) {
    let requestURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=` + environment.tmdbApiKey;
    return this.http.get(requestURL);
  }

  getNowPlaying() {
    /**
     * Returns list of movieIds from the "Now Playing" list
     */
    let movieIds: String[] = [];
    let requestURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=` + environment.tmdbApiKey;
    let authorizationHeader:string = environment.authorizationHeader;
    let options: {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: typeof authorizationHeader
      }
    } | undefined;

    const response = fetch(
      requestURL,
      options
    ).then(response => response.json())
    .then(response => {
      let results = response.results;
      for(let i=0; i<results.length; i++){
        movieIds.push(results[i].id);
      }
    })
    .catch(err => console.error(err));

    return movieIds;
  }

}
