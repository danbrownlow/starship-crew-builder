interface SearchProps {
  action: (formData: FormData) => void;
}

export function Search({ action }: SearchProps) {
  return (
    <form action={action}>
      <div>
        <label htmlFor="characterName">Search Star Wars Characters</label>
      </div>
      <input
        id="characterName"
        type="text"
        name="characterName"
        placeholder="Character Name"
      />
      <button type="submit">Search</button>
    </form>
  );
}
