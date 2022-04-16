import React from 'react'
import ParticipantBtn from './ParticipantBtn'

function Round({ id, participants, disabled }) {

    return (
        <div key={id} className={`${disabled && "opacity-50"} relative grow w-full  text-center   border-opacity-40 border-gray-300 border-r-2 `}>
            <h2 className='font-semibold border-b-2 p-2 border-opacity-40 border-gray-300  sm:p-4 text-2xl'>Round {id}</h2>
            {disabled && <div className='absolute z-50 h-full w-full'></div>}
            <div className='py-3'>
                <div className=' h-[70vh] tablescroll overflow-y-scroll w-full'>
                    {participants.map((obj, index) => {
                        const round = Object.values(obj.rounds)[id - 1]
                        console.log(round)
                        return <ParticipantBtn pids={obj.pids} round={round} />
                    }
                    )}

                </div>
            </div>
        </div>
    )
}

export default Round