import React, { useState } from 'react'

import Rounds from './Rounds'
import Modal from './Rounds/Modal'
import Users from './Users'
import Winners from './Winners'

function Dashboard({ data }) {
    console.log(data)
    return (
        <div className="w-full px-5 relative  text-white h-screen  bg-gray-900">
            <h1 className='text-4xl py-5'>Event XYZ</h1>
            <div className='flex justify-between 
             border-2 border-opacity-40 border-gray-300 overflow-hidden shadow-md  shadow-gray-800'>
                <Users participants={data.participants} />
                <Rounds participants={data.participants} rounds={data.rounds} />
                <Winners />
            </div>
            <Modal />

        </div>
    )
}

export default Dashboard