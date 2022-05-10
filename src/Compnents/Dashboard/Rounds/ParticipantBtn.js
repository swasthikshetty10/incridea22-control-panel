import React, { useContext, useEffect, useState } from 'react'
import Rounds from '.'
import { ModalContext } from '../../../Context/ModalContext'

function ParticipantBtn({ selected, setSelected, pIds, round }) {
    const [modal, showModal] = useContext(ModalContext)


    return (
        <div className="bg-gray-700 hover:bg-opacity-50 min-w-[5rem]  cursor-pointer transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 px-2 py-1 flex justify-center ">

            <div className='flex-col gap-3  w-full  '>
                {pIds.map((pid, index) => <div key={index} className='bg-gray-500 p-2 bg-opacity-20 inline-flex flex-nowrap my-1 justify-between w-full '>
                    <span className='whitespace-nowrap'>{pid}</span>
                </div>
                )}
            </div>
        </div >
    )
}

export default ParticipantBtn