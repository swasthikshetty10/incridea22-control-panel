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
        <div className='h-full text-center w-fit border-2 border-opacity-40 border-gray-300 overflow-hidden shadow-md  shadow-gray-800 '>
            <div className='py-3'>
                <div className='h-[77vh] tablescroll  overflow-y-scroll  w-full'>
                    {
                        roundParticipants.map((obj, index) => <>
                            {
                                index == 0 && <div className="flex sticky top-0 bg-gray-900/90 backdrop-blur z-[100] flex-col md:flex-row  border-b-[1.5px] border-gray-300/40 items-center justify-start gap-5" key={index}>
                                    <div className="md:basis-1/4  transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 px-2 py-1 flex justify-between ">

                                        <div className='text-2xl font-semibold  px-5 bg-opacity-20  my-1 justify-between w-full '>
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
                                        {obj.pIds.map((pid, index) => <div key={index} className='bg-gray-500 p-2 px-5 bg-opacity-20 whitespace-nowrap my-1 justify-between w-full '>
                                            {pid}
                                        </div>
                                        )}
                                    </div>
                                </div>
                                {
                                    rounds[round - 1].criteria.map((name, ix) =>

                                        <div key={ix} className='md:basis-1/7 p-3 bg-gray-700'>
                                            <input onChange={
                                                (e) => {
                                                    // setScore(round, ix)
                                                }

                                            } inputmode='numeric' min={0} max={10} className='text-black p-2 h-8 w-16  focus:outline-none focus:bg-gray-100/90' type="number" />
                                        </div>)
                                }
                                <div className='inline-flex gap-2  bg-gray-700 hover:bg-opacity-50 cursor-pointer transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 px-2 py-4 flex'>
                                    <span>10</span>
                                    <CheckBox />
                                </div>

                            </div>
                        </>

                        )}
                </div>
            </div>
            <div className='flex justify-end gap-5 mb-3 mr-3'>
                <button className="flex items-center justify-between px-5 py-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 hover:shadow-lg focus:outline-none">
                    Save
                </button>
                <button className="flex items-center justify-between px-5 py-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 hover:shadow-lg focus:outline-none">
                    Submit
                </button>
            </div>
        </div>
    )
}

function CheckBox(props) {
    return (
        <input
            {...props}
            className="form-check-input appearance-none p-2 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"></input>
    )
}

export default Users