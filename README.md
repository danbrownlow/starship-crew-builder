# Technical Challenge

- Set up
        - Using Vite + TS + React to create project.
        - Oxlint for linting, prettier for formatting.

- Using React 19 form actions
        - Maybe overkill for a small form that returns a list of names, however:
            - automatically caputuring the return value
            - exposing an `isPending` variable is genuinly useful in this instance. 
            - Gives us error state "for free" and is also genuinly useful.
            - Having access to the previous state is not really a concern here.
        - Not as important, but the syntax makes the `<Search />` component much cleaner and reduces the components responsibility.
        - Important to note that form actions are designed for mutations, and we're only reading (hence arguably overkill).

- Fetching a list of characters
        - We have an ID available for each character returned in the response.
        - This makes a great candidate for our key, as it's already returned whilst being stable and unique.
        - It means we don't need to create one ourselves with uuid() or similar.
        - Currently, we're just implementing plumbing, tests to follow.
