import React from 'react'
import { useNavigate } from 'react-router-dom'

function SubmitModal({ set, onClose, rounds, role }) {
    const navigate = useNavigate()
    console.log(rounds)
    return (
        <div className={`${set ? "flex" : "hidden"} backdrop-blur-sm fixed top-0 right-0 z-[999] justify-center items-center  w-full bg-gray-800/50 h-screen`}>
            <div className='p-8 max-w-md bg-gray-900/75 backdrop-blur-md text-center rounded-lg text-white '>
                <p className='my-2 text-2xl font-semibold'>
                    Select Round
                </p>
                {
                    rounds.map(
                        (ele, ix) => <button onClick={() => { navigate(`/${role}/dashboard/${ele.id}/${ele.round}`) }} key={ix} className=' w-full font-semibold text-xl px-5 rounded-md my-2 bg-gray-700/70 hover:bg-gray-700/40 py-2 gap-3 cursor-pointer justify-center'>
                            {`Round ${ele.round}`}
                        </button>

                    )

                }

                <div className='flex pt-3 gap-3 justify-center'>
                    <button onClick={onClose} className='px-4 py-2 border-2 border-green-600 hover:border-green-600/75  rounded-md'>Close</button>
                </div>


            </div>
        </div>
    )
}

export default SubmitModal