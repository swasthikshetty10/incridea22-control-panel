import React, { useState } from 'react'

function Users({ participants, criteria, round }) {
    console.log(participants)
    const [roundParticipants, setRoundParticipants] = useState(participants.filter((ele) => {
        if (round == 1) {
            return true
        }
        if (round == 2) {
            return ele.rounds[round - 2].selected
        }
    }))
    return (
        <div className='h-full text-center  border-opacity-40 border-gray-300 border-r-2 '>
            <h2 className='font-semibold border-b-2 p-2 border-opacity-40 border-gray-300  sm:p-4 text-2xl'>Participants</h2>
            <div className='py-3'>
                <div className='h-[77vh] tablescroll  overflow-y-scroll w-full'>
                    {
                        roundParticipants.map((obj, index) =>
                            <div key={index} className="bg-gray-700 hover:bg-opacity-50 cursor-pointer transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 px-2 py-1 flex justify-between ">
                                <div className='flex-col gap-3  w-full '>
                                    {obj.pIds.map((pid, index) => <div key={index} className='bg-gray-500 p-2 bg-opacity-20 inline-flex flex-nowrap my-1 justify-between w-full '>
                                        {pid}
                                    </div>
                                    )}
                                </div>
                            </div>)}

                </div>
            </div>
        </div>
    )
}

export default Users