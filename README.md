# Technical Challenge

- Set up
        - Using Vite + TS + React to create project.
        - Oxlint for linting, prettier for formatting.

- API
        - In the test documentation, it asks me to use the `https://swapi.tech` and use the `https://swapi.tech/api/people/?search=` to search characters.
        - For swapi.tech, the search functionality uses `?name=` (https://swapi.tech/documentation#search)
        - The`?search` parameter is completely ignored and returns a paginated list of 10 entries.
        - `?name` also returns the full character data in a single response, so no secondary call is required.
        - I've used `?name` for this challenge.

- Using React 19 form actions
        - Maybe overkill for a small form that returns a list of names, however:
            - automatically capturing the return value
            - exposing an `isPending` variable is genuinely useful in this instance. 
            - Gives us error state "for free" and is also genuinely useful.
            - Having access to the previous state is not really a concern here.
        - Not as important, but the syntax makes the `<Search />` component much cleaner and reduces the component's responsibility.
        - Important to note that form actions are designed for mutations, and we're only reading (hence arguably overkill).

- Fetching a list of characters
        - We have an ID available for each character returned in the response.
        - This makes a great candidate for our key, as it's already returned whilst being stable and unique.
        - It means we don't need to create one ourselves with uuid() or similar.
        - Tests still need to be implemented now we have our core functionality almost done.

- Character cards
        - I'm feeling that the cards have become too "heavy" at this point, will consider making them lighter.

- Launch
        - Quite easy to implement as we already calculated capacity
        - Gives a descriptive message to the user to understand when the button will be enabled

- Using a Map for app state
        - Seemed appropriate due to the fact we're adding and removing often, and get/delete are nice to work with. 
        - O(1) dedupe, id-keyed access
        - Tradeoff is no array-native functions like map() or filter()
        - An array would have worked great here too, I just preferred Maps syntax.

- Hooks
        - Used a custom hook to fetch starship data, which returns a tuple of crew/passenger capacity, and any errors. 
        - Provides a fallback in case of an API failure. Fallback is only used in the case of a non-OK response (i.e. an error message not in the 200-299 range)

- UI
        - Needs responsive work, using flexbox. Consider using a grid in this instance.

- a11y 
        - semantic structure
        - aria-labels used to provide descriptive feedback
        - Native buttons and inputs aid keyboard navigation
        - Using a real form, so enter to search, labelling, all included.
        - Use `aria-describedby` to provide a link between text and button describing when the button will be enabled.
        - Disabled with description is implemented for launch button but needs to be implemented for the character cards.
