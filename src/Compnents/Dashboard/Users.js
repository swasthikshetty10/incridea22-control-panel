import React, { useState } from 'react'
import RegisterUser from './RegisterUser'
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'
import DeleteModal from './DeleteModal'

function Users({ participants, events }) {
    const [modal, setModal] = useState(true)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectedPIds, setSelectedPIds] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(null)
    return (
        <div className='h-full text-center  border-opacity-40 border-gray-300 border-r-2 '>
            <h2 className='font-semibold flex justify-between gap-3 items-center border-b-2 p-2 border-opacity-40 border-gray-300  sm:p-4 text-2xl'>Participants
                <button onClick={() => { setModal(true) }} className='p-1 text-green-500 hover:text-white hover:bg-green-600 transition-colors text-center font-bold rounded-md border border-green-500'>
                    <AiOutlinePlus className='' />
                </button>
            </h2>
            <div className='py-3'>
                <div className='h-[72vh] tablescroll  overflow-y-scroll w-full'>
                    {
                        participants.map((obj, index) =>
                            <div key={index} className="group bg-gray-700 relative hover:bg-gray-500 hover:bg-opacity-50 cursor-pointer transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 px-2 py-1 flex justify-between ">
                                <div className='items-end grow flex flex-col  w-min '>
                                    <div onClick={() => {
                                        setSelectedIndex(obj.index)
                                        setSelectedPIds(obj.pIds)
                                        setDeleteModalOpen(true)
                                        }} className='hidden top-0 right-0 rounded-sm absolute group-hover:block bg-red-500 p-1 m-0 '>
                                        <AiOutlineDelete className='text-white text-2xl opacity-100' />
                                    </div>
                                    {obj.pIds.map((pid, index) => 
                                    <div key={index} className='items-center bg-gray-500 whitespace-nowrap p-2 bg-opacity-20 inline-flex flex-nowrap my-1 justify-between w-full '>
                                        {pid}
                                    </div>
                                    )}
                                </div>
                            </div>)}

                </div>
            </div>
            {modal && <RegisterUser set={modal} onClose={() => { setModal(false) }} events={events} />}
            {deleteModalOpen && <DeleteModal set={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} deleteFn={() => {}} pIds={selectedPIds} />}
        </div>
    )
}

export default Users