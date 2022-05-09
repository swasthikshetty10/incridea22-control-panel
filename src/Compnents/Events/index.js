import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { getEvents, getOrganiser } from '../../firebaseConfig'
import RoundsModal from '../../Utility/RoundsModal'
function Events({ role }) {
    const userCtx = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState([])
    const [modal, setModal] = useState(false)
    const [rounds, setRounds] = useState([])

    console.log(userCtx)
    useEffect(() => {
        if (userCtx.currentUser) {
            getEvents(userCtx.currentUser.uid).then((res) => {
                setEvents(res)
                setLoading(false)
            }).catch(err => {
                console.log(err)
            })

        }
    }, [])
    const navigate = useNavigate()
    return (
        <div className='min-h-screen bg-gray-700 text-white pt-3'  >
            <h1 className='text-center text-3xl'>
                Your Events
            </h1>
            <div className='p-10 max-w-md mx-auto '>
                {
                    !loading &&
                    events.map((ele, key) => {
                        return <div onClick={() => {
                            setRounds(ele.rounds.map((e, i) => ({ ...e, round: i + 1, id: ele.id })).filter((item) => { console.log(item); return item.judges.some((e) => e.uid === userCtx.currentUser.uid) }));
                            setModal(true)
                        }} key={key} className='p-3 text-2xl bg-black hover:bg-opacity-40  cursor-pointer rounded-lg my-2  bg-opacity-30'>
                            <span>
                                {ele.name}
                            </span>
                        </div>
                    })
                }
                <RoundsModal role={role} set={modal} rounds={rounds} onClose={() => { setModal(false) }} />
            </div>
        </div>
    )
}

export default Events