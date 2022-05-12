import { doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { addCriteria, db } from '../../firebaseConfig'
import AddBtn from '../../Utility/AddBtn'
import { TiDelete } from 'react-icons/ti'
import Modal from '../../Utility/RemoveModal'
import SubmitModal from '../../Utility/SubmitModal'
import { useNavigate } from 'react-router-dom'
import WinnerSelect from '../../Utility/WinnerSelect'
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
    const [modal, setModal] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [checkbox, setCheckbox] = useState(false)
    const [partsModalOpen, setPartsModalOpen] = useState(false)
    const [count, setCount] = useState(0)
    const [pIndex, setPIndex] = useState(null)
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
    useEffect(() => {
        setCount(participants.filter((ele) => ele.rounds[round - 1].selected).length)
    })

    const selectParticipant = async (id, pIndex, rIndex, value) => {
        const docRef = doc(db, 'Events', id)
        const new_participants = [...participants]
        new_participants[pIndex].rounds[rIndex].selected = value
        await updateDoc(docRef, { participants: new_participants })
    }
    const submitRound = async (id, rIndex) => {
        const docRef = doc(db, 'Events', id)
        const new_rounds = [...rounds]
        new_rounds[rIndex].completed = true
        await updateDoc(docRef, { rounds: new_rounds })
    }
    async function addCriteria(id, rIndex) {
        const docRef = doc(db, 'Events', id)
        const new_rounds = [...rounds]
        new_rounds[rIndex].criteria.push("new")
        await updateDoc(docRef, { rounds: new_rounds })
    }

    const deleteCriteria = async (id, rIndex) => {
        const docRef = doc(db, 'Events', id)
        const new_rounds = [...rounds]
        new_rounds[rIndex].criteria.pop()
        await updateDoc(docRef, { rounds: new_rounds })
    }
    const updateScore = async (id, pIndex, rIndex, uid, cIndex, score) => {
        const docRef = doc(db, 'Events', id)
        const new_participants = [...participants]
        const scores = new_participants[pIndex].rounds[rIndex].scores
        if (participants[pIndex].rounds[rIndex].scores.some((item) => item.uid === uid)) {
            const judgeIndex = participants[pIndex].rounds[rIndex].scores.findIndex(ele => ele.uid === uid)
            const len = scores[judgeIndex].criteria.length
            scores[judgeIndex] = { ...scores[judgeIndex], criteria: rounds[round - 1].criteria.map((_, ix) => ix === cIndex ? Number(score) : (len > ix ? scores[judgeIndex].criteria[ix] : 0)) }
            scores[judgeIndex].total = scores[judgeIndex].criteria.reduce((a, b) => a + b, 0)
            new_participants[pIndex].rounds[rIndex].scores = scores
        } else {
            const criteria = rounds[round - 1].criteria.map((e, i) => i == cIndex ? Number(score) : 0)
            const obj = {
                uid,
                criteria,
                total: criteria.reduce((a, b) => a + b, 0)
            }
            scores.push(obj)
            console.log(scores)
            new_participants[pIndex].rounds[rIndex].scores = scores
        }
        await updateDoc(docRef, { participants: new_participants })
    }
    const submitWinners = async (id, winners) => {
        const docRef = doc(db, 'Events', id)
        await updateDoc(docRef, { winners: winners, completed: true })
    }
    return (
        <div className='flex justify-center item-center overflow-hidden'>
            <div className='h-full transformease-linear duration-300 text-center w-fit border-2 border-opacity-40 border-gray-300 overflow-hidden shadow-md  shadow-gray-800 '>
                <div className='pb-2'>
                    <div className={`${rounds[round - 1].completed && 'opacity-50'} h-[75vh] tablescroll   overflow-y-scroll  w-full`}>
                        {roundParticipants.length ?

                            roundParticipants.map((obj, index) => <>
                                {
                                    index == 0 && <div className={`${rounds[round - 1].completed && 'pointer-events-none'} flex sticky  top-0 bg-gray-900/90 backdrop-blur z-[100] flex-col md:flex-row  border-b-[1.5px] border-gray-300/40 items-center justify-start gap-5`} key={`k${index}participant`}>
                                        <div className="md:basis-1/3        transform ease-in-out duration-50 bg-opacity-90 m-2  px-2 py-1 flex justify-between ">

                                            <div className='text-2xl grow  font-semibold  px-4 bg-opacity-20  my-1 justify-between w-full '>
                                                Participant
                                            </div>
                                        </div>
                                        {
                                            rounds[round - 1].criteria.map((name, ix) =>

                                                <div key={`${ix}c`} className='whitespace-nowrap md:basis-1/7 p-3 group text-center'>
                                                    {
                                                        rounds[round - 1].criteria.length - 1 === ix ? <div className='flex gap-[2px]   items-center cursor-pointer '><span >Criteria {ix + 1}</span><button onClick={() => { setModal(true) }} className='hidden group-hover:block transformease-linear duration-400 text-red-600 text-xl'><TiDelete /></button></div> : <span>Criteria {ix + 1} </span>
                                                    }
                                                </div>)
                                        }
                                        <div className='md:basis-1/7 inline-flex gap-2 p-3 text-center'>
                                            <AddBtn onClick={() => { addCriteria(id, round - 1) }} />

                                        </div>
                                    </div>
                                }

                                <div className={`${rounds[round - 1].completed && 'pointer-events-none '}  ${participants[obj.index]?.rounds[round - 1]?.selected && 'bg-green-500 bg-opacity-70'} flex flex-col md:flex-row  border-b-[1.5px] border-gray-300/40 items-center justify-start gap-8`} key={`${index}cp`}>
                                    <div onClick={() => { setPIndex(obj.index); setClickedPIds(obj.pIds); setPartsModalOpen(true) }} className="pointer-events-auto  md:basis-1/4 bg-gray-700 hover:bg-opacity-50 cursor-pointer transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 px-2 py-1 flex justify-between ">
                                        <div className='flex-col gap-3 w-full  '>
                                            <div className=' bg-gray-500 p-2 px-5 bg-opacity-20 whitespace-nowrap my-1 justify-between w-full '>
                                                {
                                                    obj.pIds.length > 4 ?
                                                        obj.teamName :
                                                        <div>
                                                            {obj.pIds.length > 1 && <span className='font-semibold capitalize text-blue-300'>{obj.teamName}</span>}
                                                            {
                                                                obj.pIds.map((pid, idx) =>
                                                                    <div key={`${idx}pId`} className='bg-gray-500 p-2 px-5 bg-opacity-20 whitespace-nowrap my-1 justify-between w-full '>
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

                                            <div key={`criteria${ix}`} className='md:basis-1/7 p-3 bg-gray-700'>
                                                <input onChange={
                                                    (e) => {
                                                        updateScore(id, obj.index, round - 1, uid, ix, e.target.value)
                                                    }

                                                } type="number" value={
                                                    (() => {
                                                        if (participants[obj.index].rounds[round - 1].scores) {
                                                            let score = 0
                                                            if (participants[obj.index].rounds[round - 1].scores.length > 0) {
                                                                participants[obj.index].rounds[round - 1].scores.forEach((ele, i) => {
                                                                    if (ele.uid === uid) {
                                                                        score = participants[obj.index].rounds[round - 1].scores[i].criteria[ix]
                                                                    }

                                                                })
                                                                return score
                                                            }
                                                        }

                                                    })()
                                                } className='text-black p-2 h-8 w-16  focus:outline-none focus:bg-gray-100/90' />
                                            </div>)
                                    }
                                    <div className={` ${!checkbox ? " select-none  " : "opacity-100"}  inline-flex mr-3 gap-1   hover:bg-opacity-50 transform ease-in-out duration-300 bg-opacity-90 justify-center items-center py-4`}>
                                        <span className='py-4 px-5 bg-gray-700 w-16'>{
                                            (() => {
                                                try {
                                                    return participants[obj.index].rounds[round - 1].scores.find(ele => ele.uid === uid).total
                                                } catch {
                                                    return 0
                                                }

                                            })()
                                        }</span>
                                        {checkbox && <div className='p-4  bg-gray-700 ml-2'>{rounds.length != parseInt(round) &&
                                            <CheckBox onChange={() => { selectParticipant(id, obj.index, round - 1, !participants[obj.index].rounds[round - 1].selected) }}
                                                checked={participants[obj.index].rounds[round - 1].selected} disabled={!checkbox} />}
                                        </div>}
                                    </div>
                                </div>
                            </>

                            ) :
                            <div className='text-center p-10 font-light text-3xl text-gray-500'>No participants found! </div>
                        }
                    </div>
                </div>
                {
                    !rounds[round - 1].completed && roundParticipants.length ?
                        <div className='flex justify-end gap-5 mb-3 mr-3'>
                            {!checkbox && <button onClick={() => {

                                setCheckbox(true)
                            }} className="flex items-center justify-between px-5 py-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 hover:shadow-lg focus:outline-none">
                                Select
                            </button>}
                            {rounds.length != parseInt(round) && <button disabled={count == 0} onClick={() => { setSubmit(true) }} className={`${count == 0 && "opacity-50"} flex items-center justify-between px-5 py-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 hover:shadow-lg focus:outline-none`}>
                                Submit
                            </button>}
                        </div> : <div className='flex justify-end gap-5 mb-3 mr-3'>
                            <button onClick={() => { navigate("/events") }} className="flex items-center justify-between px-5 py-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 hover:shadow-lg focus:outline-none">
                                Go Back
                            </button>

                        </div>
                }
                {rounds.length != parseInt(round) && <SubmitModal set={submit} onSubmit={() => { submitRound(id, round - 1); setSubmit(false) }} onClose={() => { setSubmit(false) }} />
                }
                <Modal set={modal} onDelete={() => { deleteCriteria(id, round - 1); setModal(false) }} onClose={() => { setModal(false) }} />

            </div>
            {
                (rounds.length === parseInt(round) && (rounds[round - 1]?.completed || checkbox)) &&
                <WinnerSelect completedWinners={winners} completed={rounds[round - 1]?.completed} id={id} round={round} submitRound={submitRound} submitWinners={submitWinners} maxParticipants={maxParticipants} />
            }
            {partsModalOpen && <ParticipantsModal {...{ pIndex, rIndex: round - 1, uid, id, round, rounds, participantArr: participants }} isJudge set={partsModalOpen} onClose={() => setPartsModalOpen(false)} pIds={clickedPIds} />}

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