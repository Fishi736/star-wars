import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private apiUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/people?page=${page}`);
  }

  getCharacterDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/people/${id}`).pipe(
      switchMap((character: any) => {
        const filmRequests = character.films.map((filmUrl: string) => this.http.get(filmUrl));
        const speciesRequests = character.species.map((speciesUrl: string) => this.http.get(speciesUrl));
        const starshipRequests = character.starships.map((starshipUrl: string) => this.http.get(starshipUrl));
        
        return forkJoin([...filmRequests, ...speciesRequests, ...starshipRequests]).pipe(
          map(responses => {
            const films = responses.slice(0, character.films.length);
            const species = responses.slice(character.films.length, character.films.length + character.species.length);
            const starships = responses.slice(character.films.length + character.species.length);
            return { ...character, films, species, starships };
          })
        );
      })
    );
  }
  getMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/films`).pipe(
      map((data: any) => data.results)
    );
  }

  getSpecies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/species`).pipe(
      map((data: any) => data.results)
    );
  }
}
