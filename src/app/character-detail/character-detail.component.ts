import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../swapi.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  character: any;

  constructor(
    private route: ActivatedRoute,
    private swapiService: SwapiService
  ) {}

  ngOnInit(): void {
    const characterId = this.route.snapshot.paramMap.get('id');
    if (characterId) {
      this.swapiService.getCharacterDetails(parseInt(characterId, 10)).subscribe(
        (data: any) => {
          this.character = data;
          console.log(this.character)
        },
        error => {
          console.error('Error fetching character details:', error);
        }
      );
    }
  }

 
}
