import React from 'react'
import ParticipantBtn from './ParticipantBtn'

function Round({ disabled }) {
    return (
        <div className={`${disabled && "opacity-50"} relative grow w-full  text-center   border-opacity-40 border-gray-300 border-r-2 `}>
            <h2 className='font-semibold border-b-2 p-2 border-opacity-40 border-gray-300  sm:p-4 text-2xl'>Round 1</h2>
            {disabled && <div className='absolute z-50 h-full w-full'></div>}
            <div className='py-3'>
                <div className=' h-[70vh] tablescroll overflow-y-scroll w-full'>
                    <ParticipantBtn />
                    <ParticipantBtn />
                    <ParticipantBtn />
                    <ParticipantBtn />
                    <ParticipantBtn />
                    <ParticipantBtn />
                    <ParticipantBtn />
                    <ParticipantBtn />
                    <ParticipantBtn />
                    <ParticipantBtn />
                    <ParticipantBtn />
                    <ParticipantBtn />
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