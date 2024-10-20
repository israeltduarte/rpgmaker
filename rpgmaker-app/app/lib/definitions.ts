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
  reward: string;
  goal: string;
  isRival: boolean;
  playerName: string;
  power?: ITPower;
  notes: string[];
  updated: string;
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
  leader: string;
  size: string;
  titles: string[];
  curiosities: string[];
  places: string[];
  people: string[];
  groups: string[];
  notes: string[];
  updated: string;
}

export interface ITOpponent {
  id: string;
  name: string;
  power: string;
  weapons: string[];
  abilities: string[];
};

export interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
};

export interface CityCardProps {
  city: ITCity;
  isSelected: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface CharacterCardProps {
  character: ITCharacter;
  isSelected: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface ITTodo {
  id: string;
  name: string;
}
