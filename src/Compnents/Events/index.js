import React from 'react'

function Events() {
    return (
        <div className='min-h-screen bg-gray-700 text-white pt-3' w-full >
            <h1 className='text-center text-3xl'>
                Your Events
            </h1>
            <div className='p-10 max-w-md mx-auto '>
                <div className='p-3 text-2xl bg-black hover:bg-opacity-40  cursor-pointer rounded-lg my-2  bg-opacity-30'>
                    <span>
                        Event Abc
                    </span>
                </div>

            </div>
        </div>
    )
}

export default Events