import React, { useState } from 'react'
import ParticipantBtn from './ParticipantBtn'

function Round({ id, participants, disabled }) {
    const [selected, setSelected] = useState({ roundIdx: id - 1, pIds: new Set() })
    console.log(selected)
    return (
        <div key={id} className={`${disabled && "opacity-50"} relative   w-full  text-center   border-opacity-40 border-gray-300 border-r-2 `}>
            <h2 className='font-semibold border-b-2 p-2 border-opacity-40 border-gray-300  sm:p-4 text-2xl'>Round {id}</h2>
            {disabled && <div className='absolute z-50 h-full w-full'></div>}
            <div className='py-3'>
                <div className=' h-[70vh] tablescroll overflow-y-scroll w-full'>
                    {participants.map((obj, i) => {
                        if (id === 1) {
                            return <ParticipantBtn selected={selected} setSelected={setSelected} key={i} pIds={obj.pIds} round={obj.rounds[id - 1]} />
                        }
                        else if (obj.rounds[id - 2].selected) {
                            return <ParticipantBtn selected={selected} setSelected={setSelected} key={i} pIds={obj.pIds} round={obj.rounds[id - 1]} />
                        } else
                            return < ></>
                    }
                    )}

                </div>
            </div>
            <div className='flex justify-evenly gap-5 p-2 border-t-2 border-opacity-40 border-gray-300'>

                <button
                    className="bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                > save</button>
                <button
                    className="bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                >submit</button>
            </div>

        </div>
    )
}

export default Round    