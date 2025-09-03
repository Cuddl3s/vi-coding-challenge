import type { Pokemon } from "../pokemon-gridview";

const pokemonCache: Map<String,Pokemon> = new Map()

export async function getPokemonList(limit = 20, page = 0){
    const offset = page * limit
    const cacheKey = `list-${limit}-${offset}`;
    const stored = localStorage.getItem(cacheKey);
    if (stored) {
        return JSON.parse(stored)
    }
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
        const data = await res.json()
        const details = await Promise.all(
            data.results.map(async (p: { name: string; url: string }) => {
                if (pokemonCache.has(p.name)) {
                    return pokemonCache.get(p.name)
                }
                const r = await fetch(p.url);
                const d = await r.json();
                pokemonCache.set(p.name, d)
                return d;
            })
        )
        const pokemon: Pokemon[] = details.map(({id, name, sprites, types}) => ({id,name, sprite: sprites.front_default, types}))
        localStorage.setItem(cacheKey, JSON.stringify(pokemon))
        return pokemon
    } catch (e) {
        console.error("Something went wrong trying to fetch Pokemon: ", e)
    }
}