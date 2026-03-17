import {Injectable, signal} from '@angular/core';
import {Character, CharacterClass} from '../_models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly CHARACTERS_KEY = 'characters';

  private readonly _characters = signal<Character[]>(this.getCharactersFromLocalStorage());

  characters = this._characters.asReadonly();

  addCharacter(character: Character) {
    this._characters.set([...this._characters(), character]);
    this.saveCharactersToStorage(this._characters());
  }

  editCharacter (id: string, character: Character) {
    this._characters
      .update((characters) => characters.map((c) => c.id === id ? {...character} : c));
    this.saveCharactersToStorage(this._characters());
  }

  removeCharacter(id: string): void {
    this._characters.update((characters) => characters.filter((c) => c.id !== id));
    this.saveCharactersToStorage(this._characters());
  }

  private getCharactersFromLocalStorage(): Character[] {
    return [
      new Character('Mage Máté', '/assets/classes/mage.webp', CharacterClass.MAGE, 4),
      new Character('Rogue Rozália', '/assets/classes/rogue.webp', CharacterClass.ROGUE, 7),
      new Character('Warrior Vazul', '/assets/classes/warrior.webp', CharacterClass.WARRIOR, 10),
    ];

    // const storageString = localStorage.getItem(this.CHARACTERS_KEY);
    // return storageString
    //   ? JSON.parse(storageString) as Character[]
    //   : [];
  }

  private saveCharactersToStorage(characters: Character[]): void {
    localStorage.setItem(this.CHARACTERS_KEY, JSON.stringify(characters));
  }

}
