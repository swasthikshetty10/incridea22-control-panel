import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../firebaseConfig'
import WinnerSubmit from './WinnerSubmitModal'
function WinnerSelect({ id, round, maxParticipants }) {
    const [winners, setWinners] = useState({ winner: [...Array(maxParticipants).keys()].map(_ => ""), runner: [...Array(maxParticipants).keys()].map(_ => "") })
    const [submit, setSubmit] = useState(false)
    const submitWinners = async (id) => {
        const docRef = doc(db, 'Events2', id)
        await updateDoc(docRef, { winners: winners })
    }
    const submitRound = async (id, rIndex) => {
        const docRef = doc(db, 'Events2', id)
        const eventDoc = await getDoc(docRef)
        const event = { ...eventDoc.data() }
        event.rounds[rIndex].completed = true
        await updateDoc(docRef, event)
    }
    return (
        <div className='p-3 border-2 border-l-0 border-opacity-40 border-gray-300  '>
            <div className='text-black flex flex-col gap-2 w-44 '>
                <div className='text-xl text-white   gap-4  font-bold capitalize text-center'>Select winner</div>
                {
                    winners.winner.map((ele, ix) => {
                        return <input className='p-2 ' placeholder='enter winner PID' onChange={(e) => {
                            let winner = [...winners.winner]
                            winner[ix] = e.target.value.toUpperCase()
                            setWinners({ ...winners, winner })
                        }} value={winners.winner[ix]} />
                    })
                }

            </div>
            <div className='text-black flex mt-3 flex-col gap-2 w-44 '>
                <div className='text-xl text-white   gap-4  font-bold capitalize text-center'>Select Runner</div>
                {
                    winners.winner.map((ele, ix) => {
                        return <input className='p-2 ' placeholder='enter runner PID' onChange={(e) => {
                            let runner = [...winners.runner]
                            runner[ix] = e.target.value
                            setWinners({ ...winners, runner })
                        }} value={winners.runner[ix].toUpperCase()} />
                    })
                }

            </div>
            <button onClick={() => { setSubmit(true) }} className={`mt-3 flex items-center justify-between px-5 py-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 hover:shadow-lg focus:outline-none`}>
                Submit
            </button>
            <WinnerSubmit set={submit} onSubmit={() => { submitWinners(id); submitRound(id, round - 1); setSubmit(false) }} onClose={() => { setSubmit(false) }} />
        </div>
    )
}

export default WinnerSelect