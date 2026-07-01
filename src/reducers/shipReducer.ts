import type { Person, PersonType, PersonWithType } from "../App";

type ShipState = Map<string, PersonWithType>;

type ShipAction =
  | {
      kind: "add";
      type: PersonType;
      id: string;
      person: Person;
      limits: any;
    }
  | { kind: "remove"; id: string }
  | { kind: "reset" };

export function shipReducer(state: ShipState, action: ShipAction): ShipState {
  switch (action.kind) {
    case "add": {
      const count = [...state.values()].filter(
        (p) => p.type === action.type,
      ).length;
      const limit =
        action.type === "crew" ? action.limits.crew : action.limits.passengers;
      if (count >= limit) return state;
      const next = new Map(state);
      next.set(action.id, { ...action.person, type: action.type });
      return next;
    }

    case "remove": {
      const next = new Map(state);
      next.delete(action.id);
      return next;
    }
    case "reset":
      return new Map();
  }
}
