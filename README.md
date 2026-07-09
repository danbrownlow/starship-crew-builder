# Starship Crew Builder

A small React 19 + TypeScript app for searching Star Wars characters (via [SWAPI](https://www.swapi.tech/)) and assigning them to a starship's crew and passenger complement. When the ship is at capacity, it can be launched.

Built with a focus on accessible, keyboard-friendly UI, honest state management, and testing the parts that can actually go wrong.

## How to run

Node version is pinned with [mise](https://mise.jdx.dev/) (Node 24.13.0).

```
pnpm install
pnpm dev
pnpm test
```

## Stack

- Vite, React 19, TypeScript
- Oxlint for linting, Prettier for formatting
- Vitest for tests

## Key decisions

### The API

My first assumption was that I'd need two calls: `/people?search=` for a result list, then `/people/:id` for each character's details. Reading the docs properly saved me from that. This API silently ignores `?search=` and actually wants `?name=`, which also returns the full character record in one call. A good reminder that an hour reading documentation can delete a whole layer of code.

### App state

State lives in a `Map()`, keyed by character ID, as the single source of truth. What I liked about it:

- O(1) dedupe built in, so a character can't be added twice
- ID keyed lookups
- IMO a pleasant API that's easy to read

The trade offs: no native `map()`/`filter()`/`find()`, and you have to spread it when deriving counts. Crew and passenger counts are derived from the Map rather than stored separately, so they can't drift apart.

State transitions were later refactored into a reducer function, mostly because it made the high-risk logic much easier to test in isolation.

### Form actions

React 19 form actions are designed for mutations and this is really a read, but they earned their place anyway:

- A natural home for error state
- Return values captured automatically
- `isPending` built in
- Less boilerplate in the `<Search />` component

### Starship capacities

Capacities are fetched from SWAPI in a custom hook. If the response is non-OK we fall back to hardcoded defaults, and the string values from the API are parsed into numbers before any comparisons happen. Capacity checks read from the passed-in state rather than a captured value, which avoids stale-state overflows.

### Testing

The two places where a bug would actually matter: capacity limits and duplicate prevention. Tests concentrate there, against the reducer, rather than chasing coverage across presentational components.

## Accessibility

- Semantic markup throughout
- Self-describing `aria-label`s on buttons
- Search form labelled with `htmlFor`
- `aria-describedby` linking explanatory text to the Launch button

## Planned

- `aria-live` announcements for search results
- Visual and aria indication on cards when the ship is at capacity
- Split `<CharacterCard />` so it's purely presentational, with actions provided by context
- Better error messages and display
