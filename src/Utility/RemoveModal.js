import React from 'react'

function Modal({ set, onDelete, onClose }) {
    return (
        <div className={`${set ? "flex" : "hidden"} backdrop-blur-sm fixed top-0 right-0 z-[999] justify-center items-center  w-full bg-gray-800/50 h-screen`}>
            <div className='p-8 max-w-md bg-gray-900/75 backdrop-blur-md text-center rounded-lg text-white '>
                <p>
                    Are you sure you want to delete this criteria all the score entered in this criteria will be lost
                </p>
                <div className='flex pt-3 gap-3 justify-center'>
                    <button onClick={onDelete} className='px-4 py-2 bg-red-600 hover:bg-red-600/75 rounded-md'>Delete</button>
                    <button onClick={onClose} className='px-4 py-2 border-2 border-red-600 hover:border-red-600/75  rounded-md'>Close</button>
                </div>

            </div>
        </div>
    )
}

export default Modal