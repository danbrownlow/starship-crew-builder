export interface Person {
  id: string;
  name: string;
  gender: string;
  birthYear: string;
}

export type PersonType = "crew" | "passenger";
export type PersonWithType = Person & {
  type: PersonType;
};
