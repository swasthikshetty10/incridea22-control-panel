import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    return (
        <div className=' h-screen w-full flex text-center flex-col items-center justify-center items-centers text-white'>
            <div className='max-w-sm'>

                <h2 className='font-semibold text-2xl pb-3'>Select your role</h2>
                <div onClick={() => { navigate("/judge/events") }} className='p-3 text-2xl bg-black hover:bg-opacity-40  cursor-pointer rounded-lg my-2  bg-opacity-30'>
                    <span>
                        Judge
                    </span>
                </div>
                <div onClick={() => { navigate("/organiser/events") }} className='p-3 text-2xl bg-black hover:bg-opacity-40  cursor-pointer rounded-lg my-2  bg-opacity-30'>
                    <span>
                        Organiser
                    </span>
                </div>
            </div>
        </div>

    )
}

export default Home