import { useState } from "react";
import { Button } from "./Button";

interface SearchProps {
  onSearch: (term: string) => void;
}

export function Search({ onSearch }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };
  return (
    <form onSubmit={handleSubmit} className="flex justify-center gap-2">
      <input
        id="characterName"
        type="text"
        name="characterName"
        placeholder="Character Name"
        value={searchTerm}
        onChange={handleChange}
        className="rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-[var(--text-h)] placeholder:text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
      />
      <Button type="submit" text="Search" />
    </form>
  );
}
