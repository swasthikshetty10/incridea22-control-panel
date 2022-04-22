import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { getOrganiser } from '../../firebaseConfig'

function Events() {
    const userCtx = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        getOrganiser(userCtx.currentUser.uid).then(
            (res) => {
                userCtx.setOrganizer(res)
                setLoading(false)
            }
        )

    }, [])
    console.log(userCtx)
    return (
        <div className='min-h-screen bg-gray-700 text-white pt-3'  >
            <h1 className='text-center text-3xl'>
                Your Events
            </h1>
            <div className='p-10 max-w-md mx-auto '>
                {
                    !loading &&
                    userCtx.currentOrganizer.eventIds.map((ele, key) => {

                        return <div key={key} className='p-3 text-2xl bg-black hover:bg-opacity-40  cursor-pointer rounded-lg my-2  bg-opacity-30'>
                            <span>
                                {ele.name}
                            </span>
                        </div>
                    }

                    )
                }


            </div>
        </div>
    )
}

export default Events