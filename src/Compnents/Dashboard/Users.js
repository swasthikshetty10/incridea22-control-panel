import React, { useState } from 'react'
import RegisterUser from './RegisterUser'
import { AiOutlinePlus } from 'react-icons/ai'

function Users({ participants, events }) {
    const [modal, setModal] = useState(false)
    return (
        <div className='h-full text-center  border-opacity-40 border-gray-300 border-r-2 '>
            <h2 className='font-semibold flex justify-between items-center border-b-2 p-2 border-opacity-40 border-gray-300  sm:p-4 text-2xl'>Participants
                <button onClick={() => { setModal(true) }} className='ml-2 p-1 text-green-500 hover:text-white hover:bg-green-600 transition-colors text-center font-bold rounded-md border border-green-500'>
                    <AiOutlinePlus className='' />
                </button>
            </h2>
            <div className='py-3'>
                <div className='h-[72vh] tablescroll  overflow-y-scroll w-full'>
                    {
                        participants.map((obj, index) =>
                            <div key={index} className="bg-gray-700 hover:bg-opacity-50 cursor-pointer transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 px-2 py-1 flex justify-between ">
                                <div className='flex-col gap-3  w-full '>
                                    {obj.pIds.map((pid, index) => <div key={index} className='bg-gray-500 whitespace-nowrap p-2 bg-opacity-20 inline-flex flex-nowrap my-1 justify-between w-full '>
                                        {pid}
                                    </div>
                                    )}
                                </div>
                            </div>)}

                </div>
            </div>
            {modal && <RegisterUser set={modal} onClose={() => { setModal(false) }} events={events} />}
        </div>
    )
}

export default Users