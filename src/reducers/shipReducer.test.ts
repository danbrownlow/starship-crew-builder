import type { Person, PersonWithType } from "../types";
import { shipReducer } from "./shipReducer";
import { it, expect } from "vitest";

const limits = { crew: 2, passengers: 2 };

const crew1: PersonWithType = {
  name: "Luke Skywalker",
  gender: "male",
  birthYear: "19BBY",
  id: "1",
  type: "crew",
};

const crew2: PersonWithType = {
  name: "Darth Vader",
  gender: "male",
  birthYear: "41.9BBY",
  id: "4",
  type: "crew",
};

const person3: Person = {
  name: "Owen Lars",
  gender: "male",
  birthYear: "52BBY",
  id: "6",
};

it("rejects adding a crew member when crew limit is reached", () => {
  const full = new Map([
    ["1", crew1],
    ["2", crew2],
  ]);
  const result = shipReducer(full, {
    kind: "add",
    id: "3",
    type: "crew",
    person: person3,
    limits,
  });

  expect(result.size).toBe(2);
});

it("attempting to add a character with the same ID should be rejected", () => {
  const state = new Map([["1", crew1]]);
  const result = shipReducer(state, {
    kind: "add",
    id: "1",
    type: "crew",
    person: crew1,
    limits,
  });

  expect(result.size).toBe(1);
});
