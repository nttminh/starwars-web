export const fetchInfo = async ({ queryKey }) => {
    const [_, type, page] = queryKey

    const res = await fetch(`http://swapi.dev/api/${type}/?page=${page}`)
    const data = await res.json()
    return data
}