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
    crew: Number(data.result.properties.crew),
    passengers: Number(data.result.properties.passengers),
  };
}
