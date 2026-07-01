import { useEffect, useState } from "react";

export const useGetShipComplement = (shipId: number) => {
  const [response, setResponse] = useState<Array<number> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShipData() {
      try {
        const result = await fetch(
          `https://swapi.tech/api/starships/${shipId}`,
        );
        if (!result.ok) {
          throw new Error(`Response status: ${result.status}`);
        }
        const data = await result.json();
        const crewLimit = data.result.properties.crew;
        const passengerLimit = data.result.properties.passengers;

        setResponse([crewLimit, passengerLimit]);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }

        setResponse(null);
        console.error(err);
      }
    }
    fetchShipData();
  }, [shipId]);
  return [response, error] as const;
};
