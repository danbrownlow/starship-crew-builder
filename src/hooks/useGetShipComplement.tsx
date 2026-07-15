import { useQuery } from "@tanstack/react-query";
import { fetchShipsComplement } from "../api/shipsComplement";

export const useGetShipComplement = (shipId: number) => {
  return useQuery({
    queryKey: ["shipComplement", shipId],
    queryFn: () => fetchShipsComplement(shipId),
  });
};
