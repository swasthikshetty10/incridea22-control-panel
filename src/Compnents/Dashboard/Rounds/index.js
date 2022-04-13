import React from 'react'
import Round from './Round'

function Rounds() {
    return (
        <div className='grow text-center'>
            <div className='grid grid-cols-3'>
                <div>
                    <Round />
                </div>
                <div>
                    <Round />
                </div>
                <div>
                    <Round />
                </div>
            </div>
        </div>
    )
}

export default Rounds