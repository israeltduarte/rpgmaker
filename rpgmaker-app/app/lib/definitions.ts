export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
};

export interface ITCharacter {
  id: string;
  name: string;
  type: ITCharacterTypeEnum;
  tendency: string;
  reward: number;
  goal: string;
  isRival: boolean;
  playerName: string;
  power?: ITPower;
  notes: string[];
}

export enum ITCharacterTypeEnum {
  PDM = 'PDM',
  PDJ = 'PDJ',
}

export enum ITPowerCategoryEnum {
  MENTAL = 'MENTAL',
  PHYSICAL = 'PHYSICAL',
  ABILITY = 'ABILITY',
  ELEMENTAL = 'ELEMENTAL',
}


export interface ITPower {
  id: string;
  name: string;
  category: ITPowerCategoryEnum;
  ideas: string[];
  particles: string;
  created: string;
  updated: string;
}

export interface ITWeapon {
  id: string;
  name: string;
  type: string;
  power: number;
  owner: string;
  titles: string[];
  notes: string[];
};

export interface ITGroup {
  id: string;
  leader: string;
  description: string;
  notes: string[];
};

export interface ITCity {
  id: string;
  name: string;
  title: string;
  leader: string;
  size: string;
  places: string[];
  people: string[];
  groups: string[];
  curiosities: string[];
  notes: string[];
};

export interface ITOpponent {
  id: string;
  name: string;
  power: string;
  weapons: string[];
  abilities: string[];
};