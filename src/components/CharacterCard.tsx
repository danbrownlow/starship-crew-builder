import type { Person, PersonType } from "../App";

type CharacterCardVariant = "result" | "complement";

interface CharacterCardProps {
  id: string;
  name: string;
  gender: string;
  birthYear: string;
  isSelected: boolean;
  addToShip: (type: PersonType, id: string, person: Person) => void;
  removeFromShip: (id: string) => void;
  variant: CharacterCardVariant;
}
export function CharacterCard({
  id,
  name,
  gender,
  birthYear,
  addToShip,
  removeFromShip,
  isSelected,
  variant,
}: CharacterCardProps) {
  const avatarUrl = new URL(`../images/avatars/${id}.jpg`, import.meta.url)
    .href;
  return (
    <div className="character-card">
      <div className="character-card__header">
        <img
          className="character-card__avatar"
          src={avatarUrl}
          alt={`${name}'s Avatar`}
        />
        <p>{name}</p>
      </div>
      <div className="character-card__body">
        <div className="character-card__details">
          <dl>
            <dt>Gender</dt>
            <dd>{gender}</dd>

            <dt>Birth Year</dt>
            <dd>{birthYear}</dd>
          </dl>
        </div>
      </div>
      <div className="character-card__footer">
        <div className="character-card__options">
          {variant === "complement" ? (
            <button
              aria-label={`Remove ${name} from ship`}
              onClick={() => removeFromShip(id)}
            >
              Remove from ship
            </button>
          ) : !isSelected ? (
            <>
              <button
                aria-label={`Add ${name} to crew`}
                onClick={() =>
                  addToShip("crew", id, { name, gender, birthYear, id })
                }
              >
                Add Crew
              </button>
              <button
                aria-label={`Add ${name} as a passenger`}
                onClick={() =>
                  addToShip("passenger", id, {
                    name,
                    gender,
                    birthYear,
                    id,
                  })
                }
              >
                Add Passenger
              </button>
            </>
          ) : (
            <p>Added to ship</p>
          )}
        </div>
      </div>
    </div>
  );
}
