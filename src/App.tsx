import { useState } from "react";
import { Search } from "./components/Search";
import { CharacterCard } from "./components/CharacterCard";
import { useGetShipComplement } from "./hooks/useGetShipComplement";
import { shipReducer } from "./reducers/shipReducer";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "./api/characters";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [shipComplement, setShipcomplement] = useState<
    Map<string, PersonWithType>
  >(new Map());

  const {
    data: characters,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["characters", searchTerm],
    queryFn: () => fetchCharacters(searchTerm),
    enabled: searchTerm.trim().length > 0,
  });

  const { data: shipLimits, isLoading: isShipLimitsLoading } =
    useGetShipComplement(SHIP_ID);

  const crewLimit = shipLimits?.crew ?? CREW_LIMIT_FALLBACK;
  const passengerLimit = shipLimits?.passengers ?? PASSENGER_LIMIT_FALLBACK;

  const people = Array.from(shipComplement.values());

  const crew = people.filter((person) => person.type === "crew");

  const passengers = people.filter((person) => person.type === "passenger");

  const readyToLaunch =
    crew.length === crewLimit && passengers.length === passengerLimit;

  const isCrewFull = crew.length >= crewLimit;
  const isPassengerFull = passengers.length >= passengerLimit;

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
      <section className="flex flex-col gap-[25px] px-6 py-4 max-lg:gap-[18px] max-lg:px-5 max-lg:pt-8 max-lg:pb-6">
        <div className="flex flex-col items-center gap-2 my-2">
          <Search onSearch={setSearchTerm} />
          {isError && (
            <p className="text-[0.8em] text-[red]">{error.message}</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-[25px] px-6 py-4 max-lg:gap-[18px] max-lg:px-5 max-lg:pt-8 max-lg:pb-6">
        <div className="flex flex-col gap-3">
          {isLoading && <p>Loading</p>}
          {isFetching && !isLoading && (
            <p className="updating-indicator">Updating…</p>
          )}

          {!isLoading && !isError && characters?.length === 0 && (
            <p>No characters found for "{searchTerm}"</p>
          )}

          {!isLoading && !isError && characters && characters.length > 0 && (
            <ul className="flex flex-wrap gap-3 list-none p-0">
              {characters.map((char) => (
                <li key={char.uid} className="flex-[0_0_200px]">
                  <CharacterCard
                    id={char.uid}
                    name={char.properties.name}
                    gender={char.properties.gender}
                    birthYear={char.properties.birth_year}
                    addToShip={addToShipcomplement}
                    removeFromShip={removeFromShipcomplement}
                    isSelected={shipComplement.has(char.uid)}
                    isCrewFull={isCrewFull}
                    isPassengerFull={isPassengerFull}
                    variant="result"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-[25px] px-6 py-4 max-lg:gap-[18px] max-lg:px-5 max-lg:pt-8 max-lg:pb-6">
        <div className="flex flex-col gap-3">
          <Header
            level="h2"
            title={
              isShipLimitsLoading
                ? `Crew`
                : `Crew - ${crew.length}/${crewLimit}`
            }
          />

          <ul className="flex flex-wrap gap-3 list-none p-0">
            {crew.map((char) => (
              <li key={char.id} className="flex-[0_0_200px]">
                <CharacterCard
                  id={char.id}
                  name={char.name}
                  gender={char.gender}
                  birthYear={char.birthYear}
                  addToShip={addToShipcomplement}
                  removeFromShip={removeFromShipcomplement}
                  isSelected={shipComplement.has(char.id)}
                  variant="complement"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Header
            level="h2"
            title={
              isShipLimitsLoading
                ? `Passengers`
                : `Passengers - ${passengers.length}/${passengerLimit}`
            }
          />
          <ul className="flex flex-wrap gap-3 list-none p-0">
            {passengers.map((char) => (
              <li key={char.id} className="flex-[0_0_200px]">
                <CharacterCard
                  id={char.id}
                  name={char.name}
                  gender={char.gender}
                  birthYear={char.birthYear}
                  addToShip={addToShipcomplement}
                  removeFromShip={removeFromShipcomplement}
                  isSelected={shipComplement.has(char.id)}
                  variant="complement"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-[25px] px-6 py-4 max-lg:gap-[18px] max-lg:px-5 max-lg:pt-8 max-lg:pb-6">
        <div className="flex flex-col items-center gap-3">
          {readyToLaunch ? (
            <p id="launchReadiness">Ready to Launch!</p>
          ) : (
            <p id="launchReadiness">Fill crew and passenger slots to launch</p>
          )}
          <Button
            describedBy="launchReadiness"
            onClick={resetShipState}
            isDisabled={!readyToLaunch}
            text="LAUNCH!!!"
          />
        </div>
      </section>
    </>
  );
}

export default App;
