import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from '@angular/forms';
import {Character, CharacterClass} from '../../_models/character.model';
import {CharacterService} from '../../_services/character.service';
import {ValidatorService} from '../../_services/validator.service';
import {NZ_MODAL_DATA} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-character-editor.component',
  templateUrl: './character-editor.component.html',
  styleUrl: './character-editor.component.less',
  standalone: false
})
export class CharacterEditorComponent {
  characterForm: FormGroup<{
    name: FormControl<string>;
    image: FormControl<string>;
    characterClass: FormControl<CharacterClass>;
    maxHp: FormControl<number>;
  }>;

  private readonly characterService = inject(CharacterService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly nzModalData: { character?: Character } = inject(NZ_MODAL_DATA, { optional: true });
  private readonly validatorService = inject(ValidatorService);

  private readonly originalCharacter = this.nzModalData?.character ?? null;

  constructor() {
    this.characterForm = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      name: [this.originalCharacter?.name ?? '', [Validators.required, this.validatorService.fullNameValidator]],
      image: [this.originalCharacter?.image ?? '', [Validators.required]],
      characterClass: [this.originalCharacter?.characterClass ?? CharacterClass.MAGE, [Validators.required]],
      maxHp: [this.originalCharacter?.maxHp ?? 1, [Validators.required, Validators.min(1), Validators.max(30)]],
    }, {
      validators: [this.validatorService.maxHpByClassValidator]
    })
  }

  saveCharacter() {
    if (this.characterForm.invalid) {
      return;
    }

    const character = new Character(
      this.characterForm.controls.name.value,
      this.characterForm.controls.image.value,
      this.characterForm.controls.characterClass.value,
      this.characterForm.controls.maxHp.value,
    )

    if (this.originalCharacter) {
      this.characterService.editCharacter(this.originalCharacter.id, character);
    } else {
      this.characterService.addCharacter(character);
    }
  }

  protected readonly CharacterClass = CharacterClass;
}
