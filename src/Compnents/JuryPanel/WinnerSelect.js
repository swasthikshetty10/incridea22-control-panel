import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../firebaseConfig'

function WinnerSelect({ id, round, maxParticipants, completed, winner}) {
    const [winners, setWinners] = useState(completed ? winner : { winner: new Array(maxParticipants).fill(""), runner: new Array(maxParticipants).fill("") })

    console.log(winners)
    return (
        <div className={`p-3 border-2 border-l-0 border-opacity-40 border-gray-300 ${completed &&  'opacity-50'} `}>
            <div className='text-black flex flex-col gap-2 w-44 '>
                <div className='text-xl text-black gap-4 font-bold capitalize text-center'> Winners</div>
                {
                    winners.winner?.map((ele, ix) => {
                        return <div key={ix} className='text-black p-2 min-h-[38px] w-full rounded-md bg-gray-200 mb-2 '>
													{ele}
													</div>
                         
                    })
                }

            </div>
            <div className='text-black flex mt-3 flex-col gap-2 w-44 '>
                <div className='text-xl text-black   gap-4  font-bold capitalize text-center'> Runners</div>
                {
                    winners.runner?.map((ele, ix) => {
											return <div key={ix} className='text-black p-2 min-h-[38px] w-full rounded-md bg-gray-200 mb-2'>
												{ele}
												</div>
                    })
                }

            </div>
            <div className='text-black flex mt-3 flex-col gap-2 w-44 '>
                <div className='text-xl text-black   gap-4  font-bold capitalize text-center'> Second Runners</div>
                {
                    winners.secondRunner?.map((ele, ix) => {
											return <div key={ix} className='text-black p-2 min-h-[38px] w-full rounded-md bg-gray-200 mb-2'>
												{ele}
												</div>
                    })
                }

            </div>
        </div>
    )
}

export default WinnerSelect