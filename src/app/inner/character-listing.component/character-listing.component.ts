import {Component, inject, OnInit} from '@angular/core';
import {CharacterService} from '../../_services/character.service';

@Component({
  selector: 'app-character-listing',
  standalone: false,
  templateUrl: './character-listing.component.html',
  styleUrl: './character-listing.component.less',
})
export class CharacterListingComponent implements OnInit {

  private readonly characterService = inject(CharacterService);

  readonly characters = this.characterService.characters;

  ngOnInit() {

  }

  // readonly mockCharacters: { name: string }[] = [
  //   {
  //     name: 'Mage Máté'
  //   },
  //   {
  //     name: 'Archer Ármin'
  //   }
  // ]

  protected readonly name = name;
}
