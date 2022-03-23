import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { fetchInfo } from '../helpers/fetchInfo'
import Person from './Person'


const People = () => {
    const [page, setPage] = useState(1)
    const { data, status } = useQuery(['people', 'people', page], fetchInfo)

    return (<div>
        <h2>People</h2>
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
            {data.results.map(person => <Person key={person.name} person={person} />)}
        </div>)}

    </div>
    )
}

export default People