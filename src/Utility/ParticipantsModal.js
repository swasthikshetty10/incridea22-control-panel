import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { db } from '../firebaseConfig';

function ParticipantsModal({ isWinners, pIndex, rIndex, uid, id, round, rounds, participantArr, isJudge, set, onClose, pIds }) {
  const [participants, setParticipants] = useState([])
  const [winners, setWinners] = useState([])
  const [runners, setRunners] = useState([])
  const [secondRunners, setSecondRunners] = useState([])
  const [loading, setLoading] = useState(false)
  const [typing, setTyping] = useState(false)
  const [comment, setComment] = useState(isJudge ? (() => {
    if (participantArr[pIndex].rounds[round - 1].scores) {
      let comment = ""
      if (participantArr[pIndex].rounds[round - 1].scores.length > 0) {
        participantArr[pIndex].rounds[round - 1].scores.forEach((ele, i) => {
          if (ele.uid === uid) {
            comment = participantArr[pIndex].rounds[round - 1].scores[i].comment

          }

        })
        return comment
      }
    }

  })() : "")
  useEffect(() => {
    if (isJudge) {
      setTyping(true)
      const delayDebounceFn = setTimeout(() => {
        console.log(comment)
        updateComment(participantArr)
        setTyping(false)
      }, 1000)
      return () => clearTimeout(delayDebounceFn)
    }
  }, [comment])


  const updateComment = async (participants) => {
    const docRef = doc(db, 'Events2', id)
    const new_participants = [...participants]
    const scores = new_participants[pIndex].rounds[rIndex].scores
    if (participants[pIndex].rounds[rIndex].scores.some((item) => item.uid === uid)) {
      const judgeIndex = participants[pIndex].rounds[rIndex].scores.findIndex(ele => ele.uid === uid)

      scores[judgeIndex] = { ...scores[judgeIndex], comment: comment }
      new_participants[pIndex].rounds[rIndex].scores = scores
    } else {
      const criteria = rounds[round - 1].criteria.map((e, i) => 0)
      const comment = ""
      const obj = {
        uid,
        criteria,
        comment,
        total: criteria.reduce((a, b) => a + b, 0)
      }
      scores.push(obj)
      console.log(scores)
      new_participants[pIndex].rounds[rIndex].scores = scores
    }
    await updateDoc(docRef, { participants: new_participants })
  }

  async function getParticipants(pIds) {
    setLoading(true)
    const participants = [];
    // setParticipants([])
    const collRef = collection(db, 'Participants')
    if (isWinners) {
      for (const pId of pIds.winner) {         //needed for loading to work idk why
        const q = query(collRef, where('pId', '==', pId))
        await getDocs(q).then((participantRef) => {
          participantRef.forEach((participant) => {
            setWinners(prev => {
              if (prev.filter(p => p.pId === participant.data().pId).length > 0)
                return prev
              return [...prev, { ...participant.data() }]
            })
          })
        })
      }
      for (const pId of pIds.runner) {      
        const q = query(collRef, where('pId', '==', pId))
        await getDocs(q).then((participantRef) => {
          participantRef.forEach((participant) => {
            setRunners(prev => {
              if (prev.filter(p => p.pId === participant.data().pId).length > 0)
                return prev
              return [...prev, { ...participant.data() }]
            })
          })
        })
      }
      for (const pId of pIds.secondRunner) {      
        const q = query(collRef, where('pId', '==', pId))
        await getDocs(q).then((participantRef) => {
          participantRef.forEach((participant) => {
            setSecondRunners(prev => {
              if (prev.filter(p => p.pId === participant.data().pId).length > 0)
                return prev
              return [...prev, { ...participant.data() }]
            })
          })
        })
      }
    } else {
      for (const pId of pIds) {         //needed for loading to work idk why
        const q = query(collRef, where('pId', '==', pId))
        await getDocs(q).then((participantRef) => {
          participantRef.forEach((participant) => {
            setParticipants(prev => {
              if (prev.filter(p => p.pId === participant.data().pId).length > 0)
                return prev
              return [...prev, { ...participant.data() }]
            })
          })
        })
      }
    }
    return participants
  }

  useEffect(() => {
    if (!isJudge) getParticipants(pIds).finally(() => setLoading(false))
  }, [isJudge, pIds])


  if (isJudge) {
    return (
      <>
        <div
          className={`${set ? 'flex' : 'hidden'
            }  backdrop-blur-sm fixed top-0 right-0 z-[999] justify-center w-screen bg-gray-800/50 h-screen overflow-auto`}
        >
          <div className=' w-[90vw] md:w-[50vw] xl:w-[32vw] my-10 h-fit justify-center items-center  bg-gray-900/75 backdrop-blur-md text-center rounded-xl text-white '>
            <div className='sticky top-0 bg-gray-800 p-5 flex items-center justify-between mb-3 border-b border-gray-600'>
              <p className='text-xl mr-3'>Team Members</p>
              <AiOutlineClose onClick={onClose} className='hover:text-gray-400 cursor-pointer   text-xl' />
            </div>
            <>
              <div className='px-8'>
                {pIds.map(pId => (
                  <p className='font-semibold text-left text-lg mb-2'>{pId}</p>
                ))}
              </div>
              <div className='mx-2 p-3   rounded-md bg-gray-700/50'>
                <p className='mb-2'>Enter Remarks</p>
                <textarea className="w-full text-black focus:outline-none rounded-md  p-1" value={comment} onChange={e => { setComment(e.target.value) }} rows={4} placeholder="Enter Remarks remarks" />
              </div>
              <div className='flex py-3 gap-3 mt-3 bg-gray-800 border-gray-600 border-t justify-end '>
                <button
                  onClick={onClose}
                  disabled={typing}
                  className='px-4 mr-4 py-2 border-2 border-red-600 hover:bg-red-600 transition-colors hover:border-red-600/75  rounded-md'
                >
                  Close
                </button>
              </div>
            </>
          </div>

        </div>
      </>
    )
  }

  if (isWinners) {
    return (
      <>
        <div
          className={`${set ? 'flex' : 'hidden'
            }  backdrop-blur-sm fixed top-0 right-0 z-[999] justify-center w-screen bg-gray-800/50 h-screen overflow-auto`}
        >
          <div className=' w-[90vw] md:w-[50vw] xl:w-[32vw] my-10 h-fit justify-center items-center  bg-gray-900/75 backdrop-blur-md text-center rounded-xl text-white '>
            <div className='sticky top-0 bg-gray-800 p-5 flex items-center justify-between mb-3 border-b border-gray-600'>
              <p className='text-xl mr-3'>Winner Details</p>
              <AiOutlineClose onClick={onClose} className='hover:text-gray-400 transition-colors cursor-pointer   text-xl' />
            </div>
            {!loading ?
              <>
                <p className='text-xl text-gray-300 font-bold uppercase text-left mx-4 mt-7'>Winners</p>
                <hr className=' mx-4 border-gray-400' />
                {winners?.length ?
                  <>
                    <div className='px-8'>
                      {winners.map((participant, idx) => (
                        <div className='text-left'>
                          {idx !== 0 && <hr className='my-3  border-gray-400' />}
                          <div>
                            <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>PID:</div><div className='whitespace-nowrap'>{participant.pId}</div></p>
                            <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>Name:</div><div className='whitespace-nowrap'>{participant.name} </div></p>
                            <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>USN:</div><div className='whitespace-nowrap'>{participant.usn} </div></p>
                            <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>Phone:</div><div className='whitespace-nowrap'>{participant.phNo} </div></p>
                            <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>Email:</div><div className='whitespace-nowrap'>{participant.email} </div></p>
                            <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>College:</div><div className=''>{participant.collegeName} </div></p>
                          </div>

                        </div>
                      ))}
                    </div>
                  </> :
                  <div className='h-[25vh] text-lg text-gray-400 font-light flex justify-center items-center'>
                    <p>No Winner Details Found!</p>
                  </div>}
                <p className='mt-5 text-xl text-gray-300 font-bold uppercase text-left mx-4'>Runner Ups</p>
                <hr className=' mx-4 border-gray-400' />
                {
                  runners?.length ?
                    <>
                      <div className='px-8'>
                        {runners.map((participant, idx) => (
                          <div className='text-left'>
                            {idx !== 0 && <hr className='my-3  border-gray-400' />}
                            <div>
                              <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>PID:</div><div className='whitespace-nowrap'>{participant.pId}</div></p>
                              <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>Name:</div><div className='whitespace-nowrap'>{participant.name} </div></p>
                              <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>USN:</div><div className='whitespace-nowrap'>{participant.usn} </div></p>
                              <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>Phone:</div><div className='whitespace-nowrap'>{participant.phNo} </div></p>
                              <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>Email:</div><div className='whitespace-nowrap'>{participant.email} </div></p>
                              <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>College:</div><div className=''>{participant.collegeName} </div></p>
                            </div>

                          </div>
                        ))}
                      </div>
                    </> :
                    <div className='h-[25vh] text-lg text-gray-400 font-light flex justify-center items-center'>
                      <p>No Runner Up Details Found!</p>
                    </div>
                }
                <p className='mt-5 text-xl text-gray-300 font-bold uppercase text-left mx-4'>Second Runner Ups</p>
                <hr className=' mx-4 border-gray-400' />
                {
                  secondRunners?.length ?
                    <>
                      <div className='px-8'>
                        {secondRunners.map((participant, idx) => (
                          <div className='text-left'>
                            {idx !== 0 && <hr className='my-3  border-gray-400' />}
                            <div>
                              <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>PID:</div><div className='whitespace-nowrap'>{participant.pId}</div></p>
                              <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>Name:</div><div className='whitespace-nowrap'>{participant.name} </div></p>
                              <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>USN:</div><div className='whitespace-nowrap'>{participant.usn} </div></p>
                              <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>Phone:</div><div className='whitespace-nowrap'>{participant.phNo} </div></p>
                              <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>Email:</div><div className='whitespace-nowrap'>{participant.email} </div></p>
                              <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>College:</div><div className=''>{participant.collegeName} </div></p>
                            </div>

                          </div>
                        ))}
                      </div>
                    </> :
                    <div className='h-[25vh] text-lg text-gray-400 font-light flex justify-center items-center'>
                      <p>No Second Runner Up Details Found!</p>
                    </div>
                }
              </>

              :
              <div className='h-[70vh] flex justify-center items-center'>
                <AiOutlineLoading3Quarters className='animate-spin text-4xl text-white' />
              </div>}
              <div className='flex py-3 gap-3 mt-3 bg-gray-800 border-gray-600 border-t justify-end '>
                        <button
                          onClick={onClose}
                          className='px-4 mr-4 py-2 border-2 border-red-600 hover:bg-red-600 transition-colors hover:border-red-600/75  rounded-md'
                        >
                          Close
                        </button>
                      </div>

          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div
        className={`${set ? 'flex' : 'hidden'
          }  backdrop-blur-sm fixed top-0 right-0 z-[999] justify-center w-screen bg-gray-800/50 h-screen overflow-auto`}
      >
        <div className=' w-[90vw] md:w-[50vw] xl:w-[32vw] my-10 h-fit justify-center items-center  bg-gray-900/75 backdrop-blur-md text-center rounded-xl text-white '>
          <div className='sticky top-0 bg-gray-800 p-5 flex items-center justify-between mb-3 border-b border-gray-600'>
            <p className='text-xl mr-3'>Participants</p>
            <AiOutlineClose onClick={onClose} className='hover:text-gray-400 cursor-pointer   text-xl' />
          </div>
          {!loading ?
            participants?.length ?
              <>
                <div className='px-8'>
                  {participants.map((participant, idx) => (
                    <div className='text-left'>
                      {idx !== 0 && <hr className='my-3  border-gray-400' />}
                      <div>
                        <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>PID:</div><div className='whitespace-nowrap'>{participant.pId}</div></p>
                        <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>Name:</div><div className='whitespace-nowrap'>{participant.name} </div></p>
                        <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>USN:</div><div className='whitespace-nowrap'>{participant.usn} </div></p>
                        <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>Phone:</div><div className='whitespace-nowrap'>{participant.phNo} </div></p>
                        <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>Email:</div><div className='whitespace-nowrap'>{participant.email} </div></p>
                        <p className='flex'><div className='font-bold basis-1/3 shrink-0   '>College:</div><div className=''>{participant.collegeName} </div></p>
                      </div>

                    </div>
                  ))}
                </div>
                <div className='flex py-3 gap-3 mt-3 bg-gray-800 border-gray-600 border-t justify-end '>
                  <button
                    onClick={onClose}

                    className='px-4 mr-4 py-2 border-2 border-red-600 hover:bg-red-600 transition-colors hover:border-red-600/75  rounded-md'
                  >
                    Close
                  </button>
                </div>
              </> :
              <div className='h-[70vh] text-lg text-gray-400 font-bold flex justify-center items-center'>
                <p>No Participant Details Found!</p>
              </div>

            :
            <div className='h-[70vh] flex justify-center items-center'>
              <AiOutlineLoading3Quarters className='animate-spin text-4xl text-white' />
            </div>}
        </div>
      </div>
    </>
  )
}

export default ParticipantsModal
