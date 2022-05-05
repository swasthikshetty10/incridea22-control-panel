import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { getEvents } from '../../firebaseConfig'

function Events() {
    const userCtx = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState([])
    console.log(userCtx)
    useEffect(() => {
        console.log(userCtx.currentUser.uid)
        getEvents(userCtx.currentUser.uid).then((res) => {
            setEvents(res)
            console.log(res)
            setLoading(false)
        })
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
                        console.log(ele)
                        return <Link to={`/dashboard/${ele.id}`}>
                            <div key={key} className='p-3 text-2xl bg-black hover:bg-opacity-40  cursor-pointer rounded-lg my-2  bg-opacity-30'>
                                <span>
                                    {ele.name}
                                </span>
                            </div>
                        </Link>
                    }

                    )
                }


            </div>
        </div>
    )
}

export default Events