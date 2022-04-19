import React from 'react'
import WinnerBtn from './WinnerBtn'

function Round({ participants, disabled }) {
    const id = participants[0].rounds.length
    return (
        <div key={id} className={`${disabled && "opacity-50"} relative  text-center   border-opacity-40 border-gray-300 `}>
            <h2 className='font-semibold border-b-2 p-2 border-opacity-40 border-gray-300  sm:p-4 text-2xl'>Winner</h2>
            {disabled && <div className='absolute z-50 h-full w-full'></div>}
            <div className='py-3'>
                <div className=' h-[70vh] tablescroll overflow-y-scroll w-full'>
                    {participants.map((obj, index) => {

                        if (obj.rounds[id - 1].selected) {
                            return <WinnerBtn key={index} pIds={obj.pIds} round={obj.rounds[id - 1]} />
                        }
                        else
                            return <></>
                    }
                    )}

                </div>
            </div>
        </div>
    )
}

export default Round