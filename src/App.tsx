import { useActionState, useState } from "react";
import "./App.css";
import { Search } from "./components/Search";
import {
  searchCharactersActions,
  type SearchState,
} from "./actions/searchAction";
import { CharacterCard } from "./components/CharacterCard";
import { useGetShipComplement } from "./hooks/useGetShipComplement";
import { shipReducer } from "./reducers/shipReducer";

const initialState: SearchState = { characters: [], error: null };

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

const SHIP_ID = 10;
const PASSENGER_LIMIT_FALLBACK = 2;
const CREW_LIMIT_FALLBACK = 2;

function App() {
  const [state, formAction, isPending] = useActionState(
    searchCharactersActions,
    initialState,
  );
  const [shipComplement, setShipcomplement] = useState<
    Map<string, PersonWithType>
  >(new Map());

  const [compliment, _error] = useGetShipComplement(SHIP_ID);

  const [crewLimit, passengerLimit] = compliment ?? [
    CREW_LIMIT_FALLBACK,
    PASSENGER_LIMIT_FALLBACK,
  ];

  const people = Array.from(shipComplement.values());

  const crew = people.filter((person) => person.type === "crew");

  const passengers = people.filter((person) => person.type === "passenger");

  const readyToLaunch =
    crew.length === crewLimit && passengers.length === passengerLimit;

  const addToShipcomplement = (
    type: PersonType,
    id: string,
    person: Person,
  ) => {
    setShipcomplement((prevMap) => {
      return shipReducer(prevMap, {
        kind: "add",
        type: type,
        id: id,
        person: person,
        limits: { crew: crewLimit, passengers: passengerLimit },
      });
    });
  };

  const removeFromShipcomplement = (id: string) => {
    setShipcomplement((prevMap) => {
      return shipReducer(prevMap, {
        kind: "remove",
        id: id,
      });
    });
  };

  const resetShipState = () => {
    setShipcomplement((prevMap) => {
      return shipReducer(prevMap, {
        kind: "reset",
      });
    });
  };

  return (
    <>
      <section id="header">
        <div className="search-bar">
          <Search action={formAction} />
        </div>
        <div>
          {isPending && <p>Loading</p>}

          <ul className="character-results-list">
            {state.characters.map((char) => (
              <li key={char.uid}>
                <CharacterCard
                  id={char.uid}
                  name={char.properties.name}
                  gender={char.properties.gender}
                  birthYear={char.properties.birth_year}
                  addToShip={addToShipcomplement}
                  removeFromShip={removeFromShipcomplement}
                  isSelected={shipComplement.has(char.uid)}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="content">
        <div>
          <h2>
            Crew - {crew.length}/{crewLimit}
          </h2>
          <ul className="character-results-list">
            {crew.map((char) => (
              <li key={char.id}>
                <CharacterCard
                  id={char.id}
                  name={char.name}
                  gender={char.gender}
                  birthYear={char.birthYear}
                  addToShip={addToShipcomplement}
                  removeFromShip={removeFromShipcomplement}
                  isSelected={shipComplement.has(char.id)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>
            Passengers - {passengers.length}/{passengerLimit}
          </h2>
          <ul className="character-results-list">
            {passengers.map((char) => (
              <li key={char.id}>
                <CharacterCard
                  id={char.id}
                  name={char.name}
                  gender={char.gender}
                  birthYear={char.birthYear}
                  addToShip={addToShipcomplement}
                  removeFromShip={removeFromShipcomplement}
                  isSelected={shipComplement.has(char.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="launch-control">
        <div className="launch">
          {readyToLaunch ? (
            <p id="launchReadiness">Ready to Launch!</p>
          ) : (
            <p id="launchReadiness">Fill crew and passenger slots to launch</p>
          )}
          <button
            aria-describedby="launchReadiness"
            onClick={resetShipState}
            disabled={!readyToLaunch}
          >
            LAUNCH!!!
          </button>
        </div>
      </section>
    </>
  );
}

export default App;
