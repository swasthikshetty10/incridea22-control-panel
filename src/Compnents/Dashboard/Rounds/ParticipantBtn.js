import React, { useContext, useState } from 'react'
import { ModalContext } from '../../../Context/ModalContext'

function ParticipantBtn({ pids, round }) {
    const [modal, showModal] = useContext(ModalContext)
    const setShowModal = (bool) => {
        showModal({ pids, round, active: bool })
    }

    return (
        <div className="bg-gray-700 hover:bg-opacity-50 cursor-pointer transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 px-2 py-1 flex justify-between ">

            <div onClick={() => { setShowModal(true) }} className='flex-col gap-3  w-full mr-5 '>
                {pids.map((pid, index) => <div key={index} className='bg-gray-500 p-2 bg-opacity-20 inline-flex flex-nowrap my-1 justify-between w-full '>
                    <span>{pid}</span>
                    <span>
                        {round.total}
                    </span>
                </div>
                )}
            </div>
            <div className='h-full py-2'>
                <input class="form-check-input appearance-none p-2 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"></input>
            </div>
        </div>
    )
}

export default ParticipantBtn