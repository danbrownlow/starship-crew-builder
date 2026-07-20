import { parseLimit } from "../helpers/parseLimit";

export interface ShipLimits {
  crew: number;
  passengers: number;
}

interface SwapiDetailResponse {
  result: { properties: { crew: string; passengers: string } };
}

export async function fetchShipsComplement(
  shipId: number,
): Promise<ShipLimits> {
  const response = await fetch(`https://swapi.tech/api/starships/${shipId}`);
  if (!response.ok) throw new Error(`Response status: ${response.status}`);

  const data = (await response.json()) as SwapiDetailResponse;

  return {
    crew: parseLimit(data.result.properties.crew),
    passengers: parseLimit(data.result.properties.passengers),
  };
}
