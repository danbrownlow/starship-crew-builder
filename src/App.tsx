import { useActionState } from "react";
import "./App.css";
import { Search } from "./components/Search";
import {
  searchCharactersActions,
  type SearchState,
} from "./actions/searchAction";

const initialState: SearchState = { characters: [], error: null };

function App() {
  const [state, formAction, isPending] = useActionState(
    searchCharactersActions,
    initialState,
  );

  return (
    <>
      <section id="header">
        <div className="search-bar">
          <Search action={formAction} />
        </div>
        <div>
          {isPending && <p>Loading</p>}

          <ul>
            {state.characters.map((char) => (
              <li key={char._id}>{char.properties.name}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default App;
