import { doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { addCriteria, db } from '../../firebaseConfig'
import AddBtn from '../../Utility/AddBtn'
import { TiDelete } from 'react-icons/ti'
import Modal from '../../Utility/RemoveModal'
import SubmitModal from '../../Utility/SubmitModal'
import { useNavigate } from 'react-router-dom'
import WinnerSelect from './WinnerSelect'
import ParticipantsModal from '../../Utility/ParticipantsModal'
function Users({ query, participants, round, rounds, id, uid, maxParticipants, winners }) {
    const [roundParticipants, setRoundParticipants] = useState(participants.filter((ele) => {
        if (round == 1) {
            return true
        }
        else {
            return ele.rounds[round - 2].selected
        }

    }))
    const [clickedPIds, setClickedPIds] = useState([])

    const [partsModalOpen, setPartsModalOpen] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        setRoundParticipants(participants.filter((ele) => {

            if (round == 1) {
                return true && ele.pIds.some((id) => id.toLowerCase().includes(query.toLowerCase()))
            }
            else {
                return ele.rounds[round - 2].selected && ele.pIds.some((id) => id.toLowerCase().includes(query.toLowerCase()))
            }

        }))

    }, [query])


    const submitRound = async (id, rIndex) => {
        const docRef = doc(db, 'Events', id)
        const new_rounds = [...rounds]
        new_rounds[rIndex].completed = true
        await updateDoc(docRef, { rounds: new_rounds })
    }



    const submitWinners = async (id, winners) => {
        const docRef = doc(db, 'Events', id)
        await updateDoc(docRef, { winners: winners })
    }
    return (
        <div className='flex justify-center item-center overflow-hidden'>
            <div className='h-full transformease-linear duration-300 text-center w-fit border-2 border-opacity-40 border-gray-300 overflow-hidden  '>
                <div className='pb-2'>
                    <div className={` h-[75vh] tablescroll bg-white  overflow-y-auto  w-full`}>
                        {roundParticipants.length ?

                            roundParticipants.map((obj, index) => <>
                                {
                                    index == 0 && <div className={`${true && 'pointer-events-none'} flex sticky  top-0 bg-gray-100/90 backdrop-blur z-[100] flex-col md:flex-row  border-b-[1.5px] border-gray-300/40 items-center justify-start gap-5`} key={`k${index}participant`}>
                                        <div className="md:basis-1/3 transform ease-in-out duration-50 bg-opacity-90 m-2  px-2 py-1 flex justify-between ">

                                            <div className='text-2xl grow  font-semibold  px-4 bg-opacity-20  my-1 justify-between w-full '>
                                                Participant
                                            </div>
                                        </div>
                                        {
                                            rounds[round - 1].criteria.map((name, ix) =>

                                                <div key={`${ix}c`} className='whitespace-nowrap md:basis-1/7 p-3 group text-center'>
                                                    <span>Criteria {ix + 1} </span>
                                                </div>)
                                        }
                                        <div className='whitespace-nowrap grow p-3 group text-center'>
                                            <span>Total </span>
                                        </div>

                                    </div>
                                }

                                <div className={`  ${participants[obj.index]?.rounds[round - 1]?.selected && 'bg-gray-500 bg-opacity-70'} flex flex-col md:flex-row  border-b-[1.5px] border-gray-300/40 items-center justify-start gap-8`} key={`${index}cp`}>
                                    <div onClick={() => { setClickedPIds(obj.pIds); setPartsModalOpen(true) }} className="md:basis-1/4 bg-gray-300 hover:bg-opacity-50 cursor-pointer transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 px-2 py-1 flex justify-between ">
                                        <div className='flex-col gap-3 w-full  '>
                                            <div className=' bg-gray-200 p-2 px-5 bg-opacity-20 whitespace-nowrap my-1 justify-between w-full '>
                                                {
                                                    obj.pIds.length > 4 ?
                                                        obj.teamName :
                                                        <div>
                                                            {obj.pIds.length > 1 && <span className='font-semibold capitalize text-blue-300'>{obj.teamName}</span>}
                                                            {
                                                                obj.pIds.map((pid, idx) =>
                                                                    <div key={`${idx}pId`} className='bg-gray-100 p-2 px-5 bg-opacity-20 whitespace-nowrap my-1 justify-between w-full '>
                                                                        {pid}
                                                                    </div>)
                                                            }
                                                        </div>

                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        rounds[round - 1].criteria.map((name, ix) =>

                                            <div key={`criteria${ix}`} className='md:basis-1/7 p-3 bg-gray-200'>
                                                <div className='w-14 py-2'>
                                                    {
                                                        (() => {
                                                            if (participants[obj.index].rounds[round - 1].scores) {
                                                                let score = 0
                                                                if (participants[obj.index].rounds[round - 1].scores.length > 0) {
                                                                    participants[obj.index].rounds[round - 1].scores.forEach((ele, i) => {
                                                                        console.log(ele.uid, uid)
                                                                        if (ele.uid === uid) {
                                                                            score = participants[obj.index].rounds[round - 1].scores[i].criteria[ix]
                                                                        }
                                                                        console.log(participants[obj.index].rounds[round - 1].scores[i].criteria[ix])

                                                                    })
                                                                    return score
                                                                }
                                                            }

                                                        })()
                                                    }
                                                </div>
                                            </div>)
                                    }
                                    <div className={` select-none   inline-flex mr-3 gap-1   hover:bg-opacity-50 transform ease-in-out duration-300 bg-opacity-90 justify-center items-center py-4`}>
                                        <span className='py-4 px-5 bg-gray-200 w-16'>{
                                            (() => {
                                                try {
                                                    return participants[obj.index].rounds[round - 1].scores.find(ele => ele.uid === uid).total
                                                } catch {
                                                    return 0
                                                }

                                            })()
                                        }</span>
                                    </div>
                                </div>
                            </>
                            ) :
                            <div className='text-center p-10 font-light text-3xl text-gray-500'>No participants found! </div>
                        }
                    </div>
                </div>

                <div className='flex justify-end gap-5 mb-3 mr-3'>
                    <button onClick={() => { navigate(-1) }} className="flex items-center justify-between px-5 py-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 hover:shadow-lg focus:outline-none">
                        Go Back
                    </button>

                </div>

            </div>
            {
                rounds.length === parseInt(round) &&
                <WinnerSelect winner={winners} completed={rounds[round - 1]?.completed} id={id} round={round} submitRound={submitRound} submitWinners={submitWinners} maxParticipants={maxParticipants} />
            }
            {partsModalOpen && <ParticipantsModal set={partsModalOpen} onClose={() => setPartsModalOpen(false)} pIds={clickedPIds} />}

        </div>
    )
}

function CheckBox(props) {
    return (
        <input
            {...props}
            type={"checkbox"}
            className={`${props.disabled ? "hidden" : ""} cursor-pointer form-check-input appearance-none p-2 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-blue-600 focus:outline-none transformduration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left  cursor-pointer" type="checkbox" value="" id="flexCheckDefault`}></input>
    )
}

export default Users