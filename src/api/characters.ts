export interface CharacterProperties {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species?: string[];
  vehicles: string[];
  starships: string[];
  url: string;
  created: string;
  edited: string;
}

export interface Character {
  properties: CharacterProperties;
  uid: string;
  _id: string;
  description: string;
  __v: number;
}

export interface SwapiListResponse {
  result: Character[];
}

export async function fetchCharacters(name: string): Promise<Character[]> {
  const response = await fetch(`https://swapi.tech/api/people/?name=${name}`);
  if (!response.ok) throw new Error("Fail");

  const data = (await response.json()) as SwapiListResponse;

  return data.result;
}
