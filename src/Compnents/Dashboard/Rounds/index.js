import React from 'react'
import Round from './Round'

function Rounds({ participants, rounds }) {
    const cols = `grid-cols-${rounds}`
    return (
        <div className='grow text-center'>
            <div className={"grid " + cols}>
                {[0, 1, 2].map((_, i) => <Round id={i + 1} participants={participants} disabled={false} />)}
            </div>
        </div>
    )
}

export default Rounds