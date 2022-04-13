import React from 'react'
import ParticipantBtn from './ParticipantBtn'

function Round() {
    return (
        <div className='grow w-full h-full text-center  border-opacity-40 border-gray-300 border-r-2 '>
            <h2 className='font-semibold border-b-2 p-2 border-opacity-40 border-gray-300  sm:p-4 text-2xl'>Round 1</h2>
            <div className='py-3'>
                <div className='overflow-y-scroll w-full'>
                    <ParticipantBtn />
                    <ParticipantBtn />
                    <ParticipantBtn />
                    <ParticipantBtn />
                    <ParticipantBtn />
                    <ParticipantBtn />
                </div>
            </div>
        </div>
    )
}

export default Round