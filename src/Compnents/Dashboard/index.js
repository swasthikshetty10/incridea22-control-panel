import React from 'react'

import Rounds from './Rounds'
import Users from './Users'
import Winners from './Winners'

function Dashboard() {
    return (
        <div className="w-full p-5  text-white h-screen bg-gray-900">
            <h1 className='text-4xl py-5'>Event XYZ</h1>

            <div className='flex justify-between 
             border-2 border-opacity-40 border-gray-300 shadow-md shadow-gray-800'>
                <Users />
                <Rounds />
                <Winners />
            </div>

        </div>
    )
}

export default Dashboard