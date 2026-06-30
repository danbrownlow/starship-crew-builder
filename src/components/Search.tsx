interface SearchProps {
  action: (formData: FormData) => void;
}

export function Search({ action }: SearchProps) {
  return (
    <form action={action}>
      <input type="text" name="characterName" placeholder="Character Name" />
      <button type="submit">Search</button>
    </form>
  );
}
