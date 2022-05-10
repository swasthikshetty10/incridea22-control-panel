import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { db, select } from '../../firebaseConfig'

function RegisterModal({ set, onClose, events }) {
    const [participant, setparticipant] = useState({
        index: null,
        teamName: "",
        pIds: Array.from(Array(events.maxParticipants).keys()).map(_ => ""),
        rounds: events.rounds.map(() => {
            return {
                scores: [],
                selected: false
            }
        }),
        comments: ""
    })
    async function registerParticpant() {
    }
    const submitHandler = async () => {
        const final_pIds = participant.pIds.filter(pid => pid != "")
        let reqUsers = []
        const collRef = collection(db, 'Participants')
        if (final_pIds.length === 0) {
            alert(`Enter PID`)
            return
        }
        for (const pId of final_pIds) {         //needed for loading to work idk why
            const q = query(collRef, where('pId', '==', pId))
            const participantRef = await getDocs(q)
            reqUsers = [];
            participantRef.forEach(ele => {
                reqUsers.push({ ...ele.data() })
            })
            console.log("participant refff", reqUsers)
            if (reqUsers.length == 0) {
                alert(`Invalid PID ${pId}`)
                return
            }
        }
        let final_obj = { ...participant }
        final_obj.pIds = final_pIds
        console.log(final_obj)
        const docRef = doc(db, 'Events2', events.id)
        let participants = [...events.participants]
        final_obj.index = participants.length
        participants.push(final_obj)
        await updateDoc(docRef, { participants })
        alert("Registerd User")
        onClose();
    }
    useEffect(() => {

    }, [])
    return (
        <>
            <div
                className={`${set ? 'flex' : 'hidden'
                    }  backdrop-blur-sm fixed top-0 right-0 z-[999] justify-center   w-full bg-gray-800/50 h-screen overflow-auto`}
            >
                <div className=' w-[90vw] md:w-[50vw] xl:w-[30vw] my-10 h-fit  bg-gray-900/75 backdrop-blur-md text-center rounded-xl text-white '>
                    <div className='sticky top-0 bg-gray-800 p-5 flex items-center justify-between mb-3 border-b border-gray-600'>
                        <p className='text-xl mr-3'>Enter Participant Details</p>
                        <AiOutlineClose onClick={onClose} className='hover:text-gray-400 cursor-pointer   text-xl' />
                    </div>

                    <div className='px-8  flex flex-col items-center justify-center '>
                        {events.maxParticipants > 1 &&
                            <div className='flex flex-col items-start'>
                                <label>{`Team Name`}</label>
                                <input required={true} onChange={(e) => { setparticipant((prev) => ({ ...prev, teamName: e.target.value.trim() })) }} className='text-black p-3 mb-2' placeholder={`Enter Team Name`} type="text" />
                            </div>
                        }
                        {Array.from(Array(events.maxParticipants).keys()).map((key) =>
                            <div className='flex flex-col items-start'>
                                <label>{`Participant ${key + 1}`}</label>
                                <input onChange={(e) => {
                                    setparticipant((prev) => {
                                        let new_pIds = [...prev.pIds]
                                        new_pIds[key] = e.target.value.toUpperCase().trim()
                                        return {
                                            ...prev, pIds: new_pIds
                                        }
                                    }
                                    )
                                }} className='text-black p-3 mb-2' placeholder={`Enter Participant ${key + 1} PID`} type="text" />
                            </div>
                        )}
                    </div>
                    <div className='flex  py-3 gap-3 mt-3 bg-gray-800 border-gray-600 border-t justify-center '>
                        <button type="submit" onClick={submitHandler} className='px-3 py-2 rounded-md border-2 hover:bg-green-600 border-green-500'>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterModal
