export interface SearchState {
  // NOTE: With more time, should type the SWAPI response
  characters: any[];
  error: string | null;
}

export async function searchCharactersActions(
  _prevState: SearchState,
  formData: FormData,
): Promise<SearchState> {
  const characterName = formData.get("characterName") as string;
  if (!characterName)
    return { characters: [], error: "An unexpected error occured" };

  if (characterName.trim().length <= 0)
    return { characters: [], error: "Please enter a search term" };

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
