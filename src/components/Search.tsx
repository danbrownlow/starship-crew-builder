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
    <form onSubmit={handleSubmit}>
      <input
        id="characterName"
        type="text"
        name="characterName"
        placeholder="Character Name"
        value={searchTerm}
        onChange={handleChange}
      />
      <Button type="submit" text="Search" />
    </form>
  );
}
