export async function getAllTypes(url?: URL): Promise<string[]> {
    const cacheKey = `list-types`;
    const stored = localStorage.getItem(cacheKey);

    if (stored) {
        return JSON.parse(stored);
    }
    try {
        const res = await fetch(url ?? 'https://pokeapi.co/api/v2/type?limit=25');
        const data = await res.json()
    
        const types: string[] = data.results.map(({name}: {name: string}) => name);
    
        if (data.next) {
            return types.concat(await getAllTypes(data.next))
        }
        return types;
    } catch (e) {
        console.error('Error while trying to fetch types')
        return []
    }
}