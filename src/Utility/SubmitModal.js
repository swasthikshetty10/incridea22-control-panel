import React from 'react'

function SubmitModal({ set, onSubmit, onClose }) {
    return (
        <div className={`${set ? "flex" : "hidden"} backdrop-blur-sm fixed top-0 right-0 z-[999] justify-center items-center  w-full bg-gray-800/50 h-screen`}>
            <div className='p-8 max-w-md bg-gray-900/75 backdrop-blur-md text-center rounded-lg text-white '>
                <p>
                    Are you sure you want to submit you <span className='font-semibold'>cant change score</span> after you submit
                </p>
                <div className='flex pt-3 gap-3 justify-center'>
                    <button onClick={onClose} className='px-4 py-2 border-2 border-green-600 hover:border-green-600/75  rounded-md'>Close</button>
                    <button onClick={onSubmit} className='px-4 py-2 bg-green-600 hover:bg-green-600/75 rounded-md'>Confirm</button>
                </div>


            </div>
        </div>
    )
}

export default SubmitModal