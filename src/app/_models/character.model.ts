export class Character {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly characterClass: CharacterClass;
  readonly maxHp: number;

  constructor(name: string, image: string, characterClass: CharacterClass, maxHp: number) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.image = image;
    this.characterClass = characterClass;
    this.maxHp = maxHp;
  }
}

export enum CharacterClass {
  MAGE = 'MAGE',
  ROGUE = 'ROGUE',
  WARRIOR = 'WARRIOR'
}

export interface ClassDetail {
  color: 'green' | 'red' | 'blue';
  maxHp: number;
}

// Record<CharacterClass, ClassDetail> === [k in CharacterClass]: ClassDetail }
export const ClassDetails: Record<CharacterClass, ClassDetail> = {
  [CharacterClass.MAGE]: {
    color: 'blue',
    maxHp: 6
  },
  [CharacterClass.ROGUE]: {
    color: 'green',
    maxHp: 8
  },
  [CharacterClass.WARRIOR]: {
    color: 'red',
    maxHp: 12
  },
}
