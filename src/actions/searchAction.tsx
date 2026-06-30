export interface SearchState {
  characters: any[];
  error: string | null;
}

export async function searchCharactersActions(
  _prevState: SearchState,
  formData: FormData,
): Promise<SearchState> {
  const characterName = formData.get("characterName") as string;

  try {
    const response = await fetch(
      `https://swapi.tech/api/people/?name=${characterName}`,
    );
    if (!response.ok) throw new Error("Fail");

    const data = await response.json();

    return { characters: data.result, error: null };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { characters: [], error: err.message };
    }
    return { characters: [], error: "An unexpected error occured" };
  }
}
