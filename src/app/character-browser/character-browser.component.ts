import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../swapi.service';

@Component({
  selector: 'app-character-browser',
  templateUrl: './character-browser.component.html',
  styleUrls: ['./character-browser.component.scss']
})
export class CharacterBrowserComponent implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  filter: any = {
    movie: '',
    species: '',
    birthYear: ''
  };
  birthYears: string[] = [];
  movies: any[] = [];
  speciesList: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.fetchCharacters(this.currentPage);

    this.swapiService.getMovies().subscribe(movies => {
      this.movies = movies;
    });

    this.swapiService.getSpecies().subscribe(species => {
      this.speciesList = species;
    });
  }

  fetchCharacters(page: number): void {
    this.swapiService.getCharacters(page).subscribe((data: any) => {
      this.characters = data.results;
      this.filteredCharacters = this.characters;
      this.extractBirthYears();
      this.totalPages = Math.ceil(data.count / 10); 
    });
  }

  extractBirthYears(): void {
    const years = new Set<string>();
    this.characters.forEach(character => {
      if (character.birth_year && character.birth_year !== 'unknown') {
        years.add(character.birth_year);
      }
    });
    this.birthYears = Array.from(years).sort();
  }

  getSpeciesNames(speciesUrls: string[]): string {
    return speciesUrls.map(url => {
      const species = this.speciesList.find(s => s.url === url);
      return species ? species.name : '-';
    }).join(', ');
  }


  applyFilter(): void {
    this.filteredCharacters = this.characters.filter(character => {
      const matchesMovie = !this.filter.movie || character.films.some((film: string) => film.includes(this.filter.movie));
      const matchesSpecies = !this.filter.species || character.species.some((species: string) => species.includes(this.filter.species));
      const matchesBirthYear = !this.filter.birthYear || character.birth_year === this.filter.birthYear;
      return matchesMovie && matchesSpecies && matchesBirthYear;
    });
  }


  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchCharacters(this.currentPage);
    }
  }

}
