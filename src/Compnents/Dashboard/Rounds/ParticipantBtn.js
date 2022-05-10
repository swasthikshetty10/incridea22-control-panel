import React, { useContext, useEffect, useState } from 'react'
import ParticipantsModal from '../../../Utility/ParticipantsModal'

function ParticipantBtn({ selected, setSelected, pIds, round, teamName }) {

    const [modal, setModal] = useState(false)

    return (
       <>
       {modal && <ParticipantsModal set={modal} onClose={() => setModal(false)} pIds={pIds} />}
            <div onClick={() => setModal(true)} 
            className="bg-gray-700 hover:bg-opacity-50 min-w-fit  cursor-pointer transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 px-2 py-1 flex justify-center ">
                <div className='flex-col gap-3  w-full  '>
                {
                    pIds.length > 4 ?
                        teamName :                            
                        <div>
                            {pIds.length > 1 && <span className='font-semibold capitalize text-blue-300'>{teamName}</span>}
                            {
                                pIds.map((pid, idx) => 
                                <div key={`${idx}pId`} className='bg-gray-500 p-2 bg-opacity-20 inline-flex flex-nowrap whitespace-nowrap my-1 justify-between w-full '>
                                    {pid}
                                </div>)
                            }
                        </div>

                }
                </div>
            </div >
       </>
    )
}

export default ParticipantBtn