import React from 'react'
import ParticipantBtn from './Rounds/ParticipantBtn'

function Round({ winners, disabled }) {
    console.log("winner", winners)
    return (
        <div className={`${disabled && "opacity-50"} relative text-center   border-opacity-40 border-gray-300 `}>
            <h2 className='font-semibold border-b-2 p-2 border-opacity-40 border-gray-300  sm:p-4 text-2xl'>Winner</h2>
            {disabled && <div className='absolute z-50 h-full w-full'></div>}
            <div className='py-3'>
                <div className='px-2 h-[70vh] tablescroll overflow-y-scroll w-full'>
                    {

                        !(winners === {} || winners.length === 0) && <>
                            <div className='font-semibold text-xl text-center'>Winner</div>
                            <div className='flex-col gap-3  w-full  '>

                                {winners.winner.map((pid, index) => pid && <div key={index} className='bg-gray-500 p-2 bg-opacity-20 inline-flex flex-nowrap my-1 justify-between w-full '>
                                    <span className='whitespace-nowrap'>{pid}</span>
                                </div>
                                )}
                            </div>
                            <div className='font-semibold text-xl text-center'>Runner Up</div>
                            <div className='flex-col gap-3  w-full  '>

                                {winners.runner.map((pid, index) => pid && <div key={index} className='bg-gray-500 p-2 bg-opacity-20 inline-flex flex-nowrap my-1 justify-between w-full '>
                                    <span className='whitespace-nowrap'>{pid}</span>
                                </div>
                                )}
                            </div>
                        </>
                    }


                </div>
            </div>
        </div>
    )
}

export default Round