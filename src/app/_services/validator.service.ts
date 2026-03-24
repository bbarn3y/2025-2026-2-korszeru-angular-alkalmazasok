import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup, ValidationErrors} from '@angular/forms';
import {CharacterClass, ClassDetails} from '../_models/character.model';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {

  fullNameValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (typeof value !== 'string') return null;

    const splitName = value.trim().split(/\s+/);
    if (splitName.length < 2 || splitName.length > 3) {
      return {
        invalidFullName: true
      };
    } else {
      return null;
    }
  }

  maxHpByClassValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!(control instanceof FormGroup)) {
      return null;
    }

    const characterClass: CharacterClass = control.get('characterClass')?.value;
    const maxHp: number = control.get('maxHp')?.value;

    if (characterClass && maxHp) {
      if (maxHp > ClassDetails[characterClass].maxHp) {
        return {
          invalidMaxHpForClass: ClassDetails[characterClass].maxHp
        }
      } else {
        return null;
      }
    } else {
      return null;
    }

  }

}
