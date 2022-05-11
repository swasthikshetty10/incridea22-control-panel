import React, { useState } from 'react'
import RegisterUser from './RegisterUser'
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'
import DeleteModal from './DeleteModal'
import { db } from '../../firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore'

function Users({ participants, events }) {
    const [modal, setModal] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectedPIds, setSelectedPIds] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(null)
    const onConfirm = async (index) => {
        const docRef = doc(db, 'Events2', events.id)
        const new_participants = participants.filter(ele => ele.index != index).map((ele, ix) => { ele.index = ix; return ele })
        await updateDoc(docRef, { participants: new_participants })
    }

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
                                <div className=' grow flex flex-col  w-min '>
                                    {!events.rounds[0].completed && <div onClick={() => {
                                        setSelectedIndex(obj.index)
                                        setSelectedPIds(obj.pIds)
                                        setDeleteModalOpen(true)
                                    }} className='hidden top-0 right-0 rounded-sm absolute group-hover:block bg-red-500 p-1 m-0 '>
                                        <AiOutlineDelete className='text-white text-2xl opacity-100' />
                                    </div>}
                                    {obj.pIds.length > 4 ?
                                        obj.teamName :
                                        <div>
                                            {obj.pIds.length > 1 && <span className='font-semibold capitalize text-blue-300'>{obj.teamName}</span>}
                                            {
                                                obj.pIds.map((pid, idx) =>
                                                    <div key={`${idx}pId`} className='bg-gray-500 p-2 bg-opacity-20 inline-flex flex-nowrap whitespace-nowrap my-1 justify-center items-center w-full '>
                                                        {pid}
                                                    </div>)
                                            }
                                        </div>
                                    }
                                </div>
                            </div>)}

                </div>
            </div>
            {modal && <RegisterUser set={modal} onClose={() => { setModal(false) }} events={events} />}
            {(deleteModalOpen && !events.rounds[0].completed) && <DeleteModal set={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={onConfirm} pIds={selectedPIds} selectedIndex={selectedIndex} />}
        </div>
    )
}

export default Users