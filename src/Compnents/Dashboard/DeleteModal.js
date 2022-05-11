import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

function DeleteModal({ set, onClose, pIds, deleteFn}) {

    const [loading, setLoading] = useState(false)

    return (
        <>
            <div
                className={`${set ? 'flex' : 'hidden'
                    }  backdrop-blur-sm fixed top-0 right-0 z-[999] justify-center   w-full bg-red-800/50 h-screen overflow-auto`}
            >
                <div className=' w-[90vw] md:w-[50vw] xl:w-[30vw] my-10 h-fit  bg-gray-900/75 backdrop-blur-md text-center rounded-xl text-white '>
                    <div className='sticky top-0 bg-gray-800 p-5 flex items-center justify-between mb-3 border-b border-gray-600'>
                        <p className='text-xl mr-3'>Sure you want to delete?</p>
                        <AiOutlineClose onClick={onClose} className='hover:text-gray-400 cursor-pointer   text-xl' />
                    </div>
                    <div className='px-8  flex flex-col items-center justify-center '>
											<p className='font-bold'>Deleting the following pIds: </p>
                        {pIds.map(pId => <p>{pId}</p>)}
                    </div>
                    <div className='flex  py-3 gap-3 mt-3 bg-gray-800 border-gray-600 border-t justify-center '>
                        <button onClick={async () => {
                            setLoading(true)
                            await deleteFn()
                            setLoading(false)
														onClose()
                        }} disabled={loading} className='disabled:opacity-70 px-3 py-2 rounded-md border-2 hover:bg-red-600 border-red-500'>Submit</button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteModal
