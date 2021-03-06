import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { auth, getEvents, getOrganiser } from '../../firebaseConfig'
import LogoutBtn from '../../Utility/LogoutBtn'
import RoundsModal from '../../Utility/RoundsModal'
import { AiOutlineLoading3Quarters} from 'react-icons/ai'
import { sha256 } from 'js-sha256'
function Events() {
    const userCtx = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState([])
    const [modal, setModal] = useState(false)
    const [rounds, setRounds] = useState([])
    const [role, setRole] = useState([])
    console.log(userCtx)

    const navigate = useNavigate()
    useEffect(() => {
        if(sha256(userCtx.currentUser.uid) === '631c81c139014f8696e0948ffcd88ab8a7ea06a1984a9f3f6b4f88740f7ac959') {
            navigate('/jury')
        }
    }, [userCtx])

    useEffect(() => {
        if (userCtx.currentUser) {
            getEvents(userCtx.currentUser.uid, "judge").then((res) => {
                if (res.length === 0) {
                    getEvents(userCtx.currentUser.uid, "organiser").then((response) => {
                        setEvents(response)
                        setRole("organiser")
                    }).catch((err) => {
                        console.log(err)
                    })
                } else {
                    setEvents(res)
                    setRole("judge")
                }
                setLoading(false)
            }).catch(err => {
                console.log(err)
            })

        }
    }, [])
    return (
        <div className='min-h-screen pt-9 bg-gray-700 text-white pt-3'  >
            <div className='flex gap-10 items-center justify-center'>
                <h1 className='text-center text-3xl'>
                    Events you're {role === "judge" ? "judging" : "organising"}
                </h1>
                <LogoutBtn className={'text-lg px-3 py-2 absolute right-10 top-7'} auth={auth} />
            </div>
            <div className='p-10 max-w-md mx-auto '>
                {
                    !loading ?
                        events.map((ele, key) => {
                            return <div onClick={() => {
                                if (role === "judge") {
                                    setRounds(ele.rounds.map((e, i) => ({ ...e, round: i + 1, id: ele.id })).filter((item) => { console.log(item); return item.judges.some((e) => e.uid === userCtx.currentUser.uid) }));
                                    setModal(true)
                                } else {
                                    navigate(`/organiser/dashboard/${ele.id}`)
                                }
                            }} key={key} className='p-3 text-2xl bg-black hover:bg-opacity-40  cursor-pointer rounded-lg my-2  bg-opacity-30'>
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
                {role === "judge" && <RoundsModal role={role} set={modal} rounds={rounds} onClose={() => { setModal(false) }} />}
            </div>
        </div>
    )
}

export default Events