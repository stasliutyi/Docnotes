export interface Note {
  id: string;
  text: string;
  date: string;
}

export interface Client {
  id: string;
  name: string;
  age: number;
  phone: string;
  issue: string;
  notes: Note[];
}
