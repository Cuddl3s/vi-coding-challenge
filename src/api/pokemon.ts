const pokemonCache: Map<String,Pokemon> = new Map()

type MinimalType = {
    slot: number;
    type: {
        name: String;
        url: String;
    }
}

type MinimalPokemon = {
    name: string;
    url: string;
}

export type Pokemon = {
    id: number;
    name: String;
    sprite: String;
    types: MinimalType[]
}

export async function getPokemon(typesList: String[], page = 0, limit = 20): Promise<Pokemon[]>{
    try {
        if (typesList.length > 0){
            return await getPokemonByTypesList(typesList, page, limit)
        } else {
            return await getPokemonList(page, limit)
        }
    } catch (e) {
        console.error("Something went wrong trying to fetch Pokemon: ", e)
    }
    return []
}

function getIdFromURL(url: string): number{
    const match = url.match(/\/(\d+)\/?$/);
    return match ? Number(match[1]) : -1;
}

export async function getPokemonByTypesList(typesList: String[], page = 0, limit = 20): Promise<Pokemon[]>{
    const offset = page * limit
    const cacheKey = `list-[${typesList.join(',')}]-${limit}-${offset}`;
    const stored = localStorage.getItem(cacheKey);
    if (stored) {
        return JSON.parse(stored)
    }
    const typeResults = await Promise.all(typesList.map(type => fetch(`https://pokeapi.co/api/v2/type/${type}`).then(res => res.json())))
    const pokemonList = typeResults
        .reduce((acc, current) => {
            return acc.concat(current.pokemon.map(({pokemon}: {pokemon: MinimalPokemon}) => pokemon))
        }, [] as MinimalPokemon[])
        .sort((pokeA: MinimalPokemon, pokeB: MinimalPokemon) => getIdFromURL(pokeA.url) - getIdFromURL(pokeB.url))
        .slice(offset,offset + limit)
    
    const pokemonDetails = await getPokemonDetails(pokemonList)
    const pokemon: Pokemon[] = pokemonDetails.map(({id, name, sprites, types}) => ({id,name, sprite: sprites.front_default, types}))

    localStorage.setItem(cacheKey, JSON.stringify(pokemon))
    return pokemon
}

export async function getPokemonList(page = 0, limit = 20): Promise<Pokemon[]> {
    const offset = page * limit
    const cacheKey = `list-${limit}-${offset}`;
    const stored = localStorage.getItem(cacheKey);
    if (stored) {
        return JSON.parse(stored)
    }
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
    const data = await res.json()
    const details = await getPokemonDetails(data.results)
    const pokemon: Pokemon[] = details.map(({id, name, sprites, types}) => ({id,name, sprite: sprites.front_default, types}))

    localStorage.setItem(cacheKey, JSON.stringify(pokemon))
    return pokemon
    
}

async function getPokemonDetails(pokemonList: MinimalPokemon[]) {
    return await Promise.all(
        pokemonList.map(async ({name, url}) => {
            if (pokemonCache.has(name)) {
                return pokemonCache.get(name);
            }
            const res = await fetch(url);
            const data = await res.json();
            pokemonCache.set(name, data);
            return data;
        })
    );
}
