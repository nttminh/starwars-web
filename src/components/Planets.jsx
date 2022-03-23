import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { fetchInfo } from "../helpers/fetchInfo";
import Planet from './Planet'


const Planets = () => {
    const [page, setPage] = useState(1)
    const { data, status } = useQuery(['planets', 'planets', page], fetchInfo)

    return (<div>
        <h2>Planets</h2>
        <button
            onClick={() => setPage(old => Math.max(old - 1, 1))}
            disabled={page === 1}
        >Prev</button>
        <span>{page}</span>
        <button
            onClick={() => setPage(old => !data || !data.next ? old : old + 1)}
            disabled={!data || !data.next}
        >Next</button>

        {status === 'loading' && (<div>Loading data...</div>)}
        {status === 'error' && (<div>Error fetching data</div>)}
        {status === 'success' && (<div>
            {data.results.map(planet => <Planet key={planet.name} planet={planet} />)}
        </div>)}

    </div>
    )
}

export default Planets