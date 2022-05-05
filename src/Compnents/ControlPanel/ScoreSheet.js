import React, { useState } from 'react'
import AddBtn from '../../Utility/AddBtn'
import Input from '../../Utility/Input'
function Users({ participants, criteria, round, rounds }) {
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
        <div className='h-full w-full text-center  border-opacity-40 border-gray-300 border-r-2 '>
            <div className='py-3'>
                <div className='h-[77vh] tablescroll  overflow-y-scroll  w-full'>
                    {
                        roundParticipants.map((obj, index) => <>
                            {
                                index == 0 && <div className="flex sticky top-0 bg-gray-900/90 backdrop-blur z-[100] flex-col md:flex-row  border-b-[1.5px] border-gray-300/40 items-center justify-start gap-5" key={index}>
                                    <div className="md:basis-1/4  transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 px-2 py-1 flex justify-between ">

                                        <div className='text-2xl  px-5 bg-opacity-20  my-1 justify-between w-full '>
                                            Participant
                                        </div>
                                    </div>
                                    {
                                        rounds[round - 1].criteria.map((name, ix) =>

                                            <div key={ix} className='md:basis-1/7 p-3 text-center'>
                                                <span>{name}</span>
                                            </div>)


                                    }
                                    <div className='md:basis-1/7 p-3 text-center'>
                                        <AddBtn />
                                    </div>
                                </div>
                            }

                            <div className="flex flex-col md:flex-row  border-b-[1.5px] border-gray-300/40 items-center justify-start gap-5" key={index}>
                                <div className="md:basis-1/4 bg-gray-700 hover:bg-opacity-50 cursor-pointer transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 px-2 py-1 flex justify-between ">
                                    <div className='flex-col gap-3 w-full  '>
                                        {obj.pIds.map((pid, index) => <div key={index} className='bg-gray-500 p-2 px-5 bg-opacity-20  my-1 justify-between w-full '>
                                            {pid}
                                        </div>
                                        )}
                                    </div>
                                </div>
                                {
                                    rounds[round - 1].criteria.map((name, ix) =>

                                        <div key={ix} className='md:basis-1/7 p-3 bg-gray-700'>
                                            <input inputmode='numeric' min={0} max={10} className='text-black p-2 h-8 w-16  focus:outline-none focus:bg-gray-100/90' type="number" />
                                        </div>)
                                }

                            </div>
                        </>

                        )}
                </div>
            </div>
        </div>
    )
}

export default Users