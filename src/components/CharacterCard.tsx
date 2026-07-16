import type { Person, PersonType } from "../App";
import { Button } from "./Button";

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
  isCrewFull?: boolean;
  isPassengerFull?: boolean;
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
  isCrewFull = false,
  isPassengerFull = false,
}: CharacterCardProps) {
  const avatarUrl = new URL(`../images/avatars/${id}.jpg`, import.meta.url)
    .href;
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[200px] border-2 border-[#666] p-4 rounded-[10px]">
      <div className="flex flex-col items-center gap-2">
        <img
          className="w-[100px] h-[100px] rounded-full object-cover"
          src={avatarUrl}
          alt={`${name}'s Avatar`}
        />
        <p>{name}</p>
      </div>
      <dl className="flex flex-col items-center gap-2">
        <div>
          <dt className="text-[0.8rem] text-[#666]">Gender</dt>
          <dd className="m-0">{gender}</dd>
        </div>
        <div>
          <dt className="text-[0.8rem] text-[#666]">Birth Year</dt>
          <dd className="m-0">{birthYear}</dd>
        </div>
      </dl>
      <div className="flex flex-wrap justify-center gap-2">
        {variant === "complement" ? (
          <Button
            ariaLabel={`Remove ${name} from ship`}
            onClick={() => removeFromShip(id)}
            text="Remove from ship"
          />
        ) : !isSelected ? (
          <>
            <Button
              ariaLabel={`Add ${name} to crew`}
              isDisabled={isCrewFull}
              onClick={() =>
                addToShip("crew", id, { name, gender, birthYear, id })
              }
              text="Add Crew"
            />
            <Button
              ariaLabel={`Add ${name} as a passenger`}
              isDisabled={isPassengerFull}
              onClick={() =>
                addToShip("passenger", id, {
                  name,
                  gender,
                  birthYear,
                  id,
                })
              }
              text="Add Passenger"
            />
          </>
        ) : (
          <p>Added to ship</p>
        )}
      </div>
    </div>
  );
}
