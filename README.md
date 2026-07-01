# Technical Challenge

# How to run

    - Mise set to switch to Node 24.13.0
    - `pnpm install` to install dependencies
    - `pnpm dev` to run app locally
    - `pnpm test` to run tests

# Approach and overview

    The technical task was to build a frontend which would fetch a list of characters from the SWAPI. The user would be able to add these characters to either crew or passengers to their ships complement. Once the ship was at capacity, the ship could be launched.

    My first task was to breakdown the AC presented into tickets. This would provide a useful build order for myself, as well as highlighting potential issues before I've even started on the development work. 

    The tickets are in a tickets.md file provided in this directory.

# Key decisions and trade offs

## Set up
        - Using Vite + TS + React to create project.
        - Oxlint for linting, prettier for formatting.
        - Mise to pin a specific node version

## API

    The first ticket was a spike for looking into the SWAPI first, to see how the json response was structured. My initial assumption was that I'd have to call `/people?search` which would give a list of results which included only the `uid`, `name`, and `url`. This would mean that to fulfil the requirements, I would need to make a second call to `/people/:id` to get the gender and birthdate.

    However, after reading the documentation, I found out that for this particular api, `?search=` would just be silently ignored, and the actual parameter we needed to provide was `?name=`. This had the added bonus of also returning all a character's information so that a second call would not be required.

## App State

    I decided to use a Map() for my state. This had a few immediate benefits:
        - O(1) dedupe built in
        - ID keyed
        - IMO, a pleasant API that's easy to read and understand.

    However, the downsides were:
        - No native array methods like map(), filter(), or find()
        - Have to spread when we're deriving the crew and passenger count

    Either way, the Map() was our single source of truth. We derived passenger and crew counts from here. This meant they couldn't drift apart.

## Form Actions

    Form actions are designed for mutations, and our use was just reading. However, the benefits we get are:
        - Place to put error state
        - Automatically captures return value
        - isPending built-in
        - Reduces boilerplate in <Search /> component

## Responsiveness

    Layout uses flexbox with wrap so content reflows across screen sizes. 

## Starship Capacities
    
    Using a custom hook to fetch capacities from SWAPI. 
    If we get a non-OK response (non 200-299 range) we fallback to a hardcoded default. 
    Here we parse the return values which are strings into numbers which are used for comparisons.

## Testing

    The most high-risk areas for testing were the capacities and the duplicates should not be added.
    The state was refactored to a reducer function, which made the functionality we wanted to test much easier.
    We read capacity from the passed in state to avoid stale state and overflows that can be caused by this.
    

# Accessibility
    ## What is implemented
        - Semantic markup
        - Self describing aria-labels on buttons
        - Labelled search form `htmlFor`
        - `aria-describedby` for linking text to button (in the case of the Launch button)

    ## What I would implement next
        - `aria-live` for results

# What I would do with more time

    - Card at capacity aria tags with visual indication also (maybe greyed out)
    - Remove the any[] from the action, we should type the response from the SWAPI.
    - Improve error messages and how they're displayed
    - Launch readiness to be extracted and tested 
    - <CharacterCard /> takes a variant so each context renders the correct action, but looking forward the next step would be to consider splitting into a separate component to make the CharacterCard purely presentational.
    - I think using the Grid api would be better for this instance, but I find flex faster to implement.

# Time

    - I tried to stick to three hours, but in all honesty I think I went for about 3 hours 45mins or thereabouts. 
    - Prioritised core AC and high-risk testing which meant styling and "flair" took a back seat.
