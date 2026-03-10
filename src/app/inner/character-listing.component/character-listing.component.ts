import { Component } from '@angular/core';

@Component({
  selector: 'app-character-listing',
  standalone: false,
  templateUrl: './character-listing.component.html',
  styleUrl: './character-listing.component.less',
})
export class CharacterListingComponent {

  readonly mockCharacters: { name: string }[] = [
    {
      name: 'Mage Máté'
    },
    {
      name: 'Archer Ármin'
    }
  ]

}
