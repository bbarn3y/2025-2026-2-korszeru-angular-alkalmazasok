import {Component, inject, input, Input, output} from '@angular/core';
import {Character, CharacterClass} from '@models/character.model';
import {CharacterEditorComponent} from '../character-editor.component/character-editor.component';
import {NzModalService} from 'ng-zorro-antd/modal';
import {CharacterService} from '../../_services/character.service';

@Component({
  selector: 'app-character-card',
  standalone: false,
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.less',
})
export class CharacterCardComponent {
  // @Input() character!: Character;
  character = input.required<Character>();

  characterSelected = output<Character>();

  public readonly characterService = inject(CharacterService);
  private readonly nzModalService = inject(NzModalService);

  editCharacter() {
    this.nzModalService.create({
      nzTitle: `Edit "${this.character()?.name}"`,
      nzContent: CharacterEditorComponent,
      nzFooter: null,
      nzData: {
        character: this.character()
      }
    })
  }


}
