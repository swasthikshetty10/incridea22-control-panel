import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { auth, db, getEvents } from '../../firebaseConfig'
import LogoutBtn from '../../Utility/LogoutBtn'
import RoundsModal from '../../Utility/RoundsModal'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { collection, getDocs } from 'firebase/firestore'
function Events() {
    const userCtx = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState([])
    const [modal, setModal] = useState(false)
    const [rounds, setRounds] = useState([])
    const [role, setRole] = useState([])
    console.log(userCtx)
    async function getAllEvents() {
        const eventColRef = collection(db, 'Events')
        const events = []
        const eventsRef = await getDocs(eventColRef)
        eventsRef.forEach((event) => {
            events.push({ name: event.data().name, rounds: event.data().rounds, id: event.id })
        })
        return events
    }

    const navigate = useNavigate()
    useEffect(() => {
        if (userCtx.currentUser) {
            getAllEvents(userCtx.currentUser.uid).then((res) => {
                if (res.length === 0) {
                    navigate("/")
                } else {
                    setEvents(res)
                    setRole("jury")
                }
                setLoading(false)
            }).catch(err => {
                console.log(err)
            })

        }
    }, [])
    return (
        <div className='min-h-screen bg-white text-black pt-3'  >
            <div className='flex gap-10 items-center justify-center'>
                <h1 className='text-center text-3xl'>
                    All Events
                </h1>
                <LogoutBtn auth={auth} />
            </div>
            <div className='p-10 max-w-md mx-auto '>
                {
                    !loading ?
                        events.map((ele, key) => {
                            return <div onClick={() => {
                                setRounds(ele.rounds.map((e, i) => ({ ...e, round: i + 1, id: ele.id })));
                                setModal(true)

                            }} key={key} className='p-3 text-2xl bg-gray-400 hover:bg-opacity-40  cursor-pointer rounded-lg my-2  bg-opacity-30'>
                                <span>
                                    {ele.name}
                                </span>
                            </div>
                        })
                        :
                        <>
                            <AiOutlineLoading3Quarters className="mx-auto mt-[20vh] animate-spin text-5xl " />
                        </>
                }
                {role === "jury" && <RoundsModal role={role} set={modal} rounds={rounds} onClose={() => { setModal(false) }} />}
            </div>
        </div>
    )
}

export default Events