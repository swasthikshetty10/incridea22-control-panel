import React, { useContext, useEffect, useState } from 'react'
import { auth, getEvent, getOrganiser } from '../../firebaseConfig'
import ScoreSheet from './ScoreSheet'
import SearchBar from '../../Utility/SearchBar'
import {
    collection, onSnapshot
} from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import WinnerSelect from '../../Utility/WinnerSelect'
import LogoutBtn from '../../Utility/LogoutBtn'
function Dashboard(props) {
    const [query, setQuery] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const userCtx = useContext(AuthContext)
    const navigator = useNavigate()
    const { id, round } = useParams()
    useEffect(() => {
        const colRef = collection(db, "Events2")
        if (userCtx) {
            onSnapshot(colRef, (snapshot) => {
                snapshot.docs.forEach((doc) => {
                    if (doc.id === id) {
                        console.log(doc.id)
                        setData({ ...doc.data(), id: doc.id })
                        setLoading(false)
                        return
                    }
                })
            }
            )

        }
        else {
            navigator("/")
        }

    }, [])
    return (<>
        {loading ? <div>Loading</div> :
            <div className="w-full px-5 relative  text-white pt-4 ">
                <div className='flex pt-2 pb-1 justify-between items-start '>
                    <div className=''>
                        <h1 className='text-4xl capitalize '>{data.name}</h1>
                        <div className='text-gray-300  text-md'>{`Round ${round}`}</div>
                    </div>
                    <div className='inline-flex gap-3'>
                        <SearchBar query={query} setQuery={setQuery} />
                        <LogoutBtn auth={auth} />
                    </div>
                </div>
                <ScoreSheet maxParticipants={data.maxParticipants} query={query} participants={data.participants} id={data.id} uid={userCtx.currentUser.uid} rounds={data.rounds} round={round} />
            </div>

        }

    </>
    )
}



export default Dashboard