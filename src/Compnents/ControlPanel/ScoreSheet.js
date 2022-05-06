import { doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { addCriteria, db } from '../../firebaseConfig'
import AddBtn from '../../Utility/AddBtn'
import Input from '../../Utility/Input'
import { TiDelete } from 'react-icons/ti'
import Modal from '../../Utility/RemoveModal'
import SubmitModal from '../../Utility/SubmitModal'
import { async } from '@firebase/util'
import { useNavigate } from 'react-router-dom'
function Users({ participants, round, rounds, id, uid }) {
    const [roundParticipants, setRoundParticipants] = useState(participants.filter((ele) => {
        if (round == 1) {
            return true
        }
        else {
            return ele.rounds[round - 2].selected
        }

    }))
    const [modal, setModal] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [checkbox, setCheckbox] = useState(false)
    const navigate = useNavigate()
    const selectParticipant = async (id, pIndex, rIndex, value) => {
        const docRef = doc(db, 'Events', id)
        const eventDoc = await getDoc(docRef)
        const event = { ...eventDoc.data() }
        event.participants[pIndex].rounds[rIndex].selected = value
        await updateDoc(docRef, event)
    }
    const submitRound = async (id, rIndex) => {
        const docRef = doc(db, 'Events', id)
        const eventDoc = await getDoc(docRef)
        const event = { ...eventDoc.data() }
        event.rounds[rIndex].completed = true
        await updateDoc(docRef, event)
    }
    const deleteCriteria = async (id, rIndex) => {
        const docRef = doc(db, 'Events', id)
        const eventDoc = await getDoc(docRef)
        const event = { ...eventDoc.data() }
        event.rounds[rIndex].criteria.pop()
        await updateDoc(docRef, event)
    }
    const updateScore = async (id, pIndex, rIndex, uid, cIndex, score) => {
        console.log(id, pIndex, rIndex, uid, cIndex, score)
        const docRef = doc(db, 'Events', id)
        const eventDoc = await getDoc(docRef)
        const event = { ...eventDoc.data() }
        const scores = event.participants[pIndex].rounds[rIndex].scores
        if (participants[pIndex].rounds[rIndex].scores.some((item) => item.uid === uid)) {
            const judgeIndex = participants[pIndex].rounds[rIndex].scores.findIndex(ele => ele.uid === uid)
            console.log(judgeIndex)
            const len = scores[judgeIndex].criteria.length
            scores[judgeIndex] = { ...scores[judgeIndex], criteria: rounds[round - 1].criteria.map((_, ix) => ix === cIndex ? parseInt(score) : (len > ix ? scores[judgeIndex].criteria[ix] : 0)) }
            scores[judgeIndex].total = scores[judgeIndex].criteria.reduce((a, b) => a + b, 0)
            event.participants[pIndex].rounds[rIndex].scores = scores
        } else {
            const criteria = rounds[round - 1].criteria.map((e, i) => i == cIndex ? parseInt(score) : 0)
            const obj = {
                uid,
                criteria,
                total: criteria.reduce((a, b) => a + b, 0)
            }
            scores.push(obj)
            console.log(scores)
            event.participants[pIndex].rounds[rIndex].scores = scores
        }
        await updateDoc(docRef, event)
    }

    return (
        <div className='h-full transformease-linear duration-300 text-center w-fit border-2 border-opacity-40 border-gray-300 overflow-hidden shadow-md  shadow-gray-800 '>
            <div className='py-3'>
                <div className={`${rounds[round - 1].completed && 'opacity-50'} h-[77vh] tablescroll   overflow-y-scroll  w-full`}>
                    {
                        roundParticipants.map((obj, index) => <>
                            {
                                index == 0 && <div key={index} className={`${rounds[round - 1].completed && 'pointer-events-none'} flex sticky top-0 bg-gray-900/90 backdrop-blur z-[100] flex-col md:flex-row  border-b-[1.5px] border-gray-300/40 items-center justify-start gap-5`} key={`${index}participant`}>
                                    <div className="md:basis-1/4  transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 px-2 py-1 flex justify-between ">

                                        <div className='text-2xl font-semibold  px-4 bg-opacity-20  my-1 justify-between w-full '>
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

                            <div className={`${rounds[round - 1].completed && 'pointer-events-none '} flex flex-col md:flex-row  border-b-[1.5px] border-gray-300/40 items-center justify-start gap-5`} key={`${index}cp`}>
                                <div className="md:basis-1/4 bg-gray-700 hover:bg-opacity-50 cursor-pointer transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 px-2 py-1 flex justify-between ">
                                    <div className='flex-col gap-3 w-full  '>
                                        {obj.pIds.map((pid, index) => <div key={`${index}pId`} className='bg-gray-500 p-2 px-5 bg-opacity-20 whitespace-nowrap my-1 justify-between w-full '>
                                            {pid}
                                        </div>
                                        )}
                                    </div>
                                </div>
                                {
                                    rounds[round - 1].criteria.map((name, ix) =>

                                        <div key={`criteria${ix}`} className='md:basis-1/7 p-3 bg-gray-700'>
                                            <input onChange={
                                                (e) => {
                                                    updateScore(id, index, round - 1, uid, ix, e.target.value)
                                                }

                                            } inputMode='numeric' value={
                                                (() => {
                                                    if (participants[index].rounds[round - 1].scores) {
                                                        let score = 0
                                                        if (participants[index].rounds[round - 1].scores.length > 0) {
                                                            participants[index].rounds[round - 1].scores.forEach((ele, i) => {
                                                                if (ele.uid === uid) {
                                                                    score = participants[index].rounds[round - 1].scores[i].criteria[ix]
                                                                }

                                                            })
                                                            return score
                                                        }
                                                    }

                                                })()
                                            } min={0} max={10} className='text-black p-2 h-8 w-16  focus:outline-none focus:bg-gray-100/90' type="number" />
                                        </div>)
                                }
                                <div className={` ${!checkbox ? " select-none  " : "opacity-100"}  inline-flex mr-3 gap-2 w-full  bg-gray-700 hover:bg-opacity-50 cursor-pointer transform ease-in-out duration-300 bg-opacity-90 justify-center items-center py-4`}>
                                    <span>{
                                        (() => {
                                            try {
                                                let total = 0;
                                                participants[index].rounds[round - 1].scores.forEach(ele => {
                                                    if (ele.uid === uid) {
                                                        total = ele.total
                                                        return
                                                    }
                                                });
                                                return total
                                            } catch {
                                                return 0
                                            }

                                        })()
                                    }</span>
                                    <CheckBox onChange={() => { console.log("Clickkkk"); selectParticipant(id, index, round - 1, !participants[index].rounds[round - 1].selected) }} checked={participants[index].rounds[round - 1].selected} disabled={!checkbox} />
                                </div>
                            </div>
                        </>

                        )}
                </div>
            </div>
            {
                !rounds[round - 1].completed ?
                    <div className='flex justify-end gap-5 mb-3 mr-3'>
                        {!checkbox && <button onClick={() => { setCheckbox(true) }} className="flex items-center justify-between px-5 py-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 hover:shadow-lg focus:outline-none">
                            Select
                        </button>}
                        <button onClick={() => { submitRound(id, round - 1); setSubmit(true) }} className="flex items-center justify-between px-5 py-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 hover:shadow-lg focus:outline-none">
                            Submit
                        </button>
                    </div> : <div className='flex justify-end gap-5 mb-3 mr-3'>
                        <button onClick={() => { navigate("/events") }} className="flex items-center justify-between px-5 py-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 hover:shadow-lg focus:outline-none">
                            Go Back
                        </button>

                    </div>
            }
            <SubmitModal set={submit} onSubmit={() => { setSubmit(false) }} onClose={() => { setSubmit(false) }} />
            <Modal set={modal} onDelete={() => { deleteCriteria(id, round - 1); setModal(false) }} onClose={() => { setModal(false) }} />
        </div>

    )
}

function CheckBox(props) {
    return (
        <input
            {...props}
            type={"checkbox"}
            className={`${props.disabled ? "hidden" : ""} form-check-input appearance-none p-2 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-blue-600 focus:outline-none transformduration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault`}></input>
    )
}

export default Users