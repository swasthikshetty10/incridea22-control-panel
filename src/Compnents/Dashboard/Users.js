import React from 'react'

function Users() {
    return (
        <div className='h-full text-center  border-opacity-40 border-gray-300 border-r-2 '>
            <h2 className='font-semibold border-b-2 p-2 border-opacity-40 border-gray-300  sm:p-4 text-2xl'>Participants</h2>
            <div className='py-3'>
                <div className='h-[70vh] tablescrolll overflow-y-scroll w-full'>
                    <div className="bg-gray-700 hover:bg-opacity-50 cursor-pointer transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 p-2 ">user-1</div>
                    <div className="bg-gray-700 hover:bg-opacity-50 cursor-pointer transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 p-2 ">user-2</div>
                    <div className="bg-gray-700 hover:bg-opacity-50 cursor-pointer transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 p-2 ">user-3</div>
                </div>
            </div>
        </div>
    )
}

export default Users