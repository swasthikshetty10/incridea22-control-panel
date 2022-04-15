import React, { useState } from 'react'
import Modal from './Modal'

function ParticipantBtn() {
    const [modal, setModal] = useState(false)
    return (
        <div onClo className="bg-gray-700 hover:bg-opacity-50 cursor-pointer transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 p-2 flex justify-between ">
            <Modal />
            <div onClick={() => { setModal(true) }} className='pl-3 inline-flex justify-between w-full mr-5 '>
                <span>User 1</span>
                <span>
                    72
                </span>
            </div>
            <div >

                <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"></input>
            </div>
        </div>
    )
}

export default ParticipantBtn