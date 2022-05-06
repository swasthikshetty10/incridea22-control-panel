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
function Dashboard(props) {
    const [query, setQuery] = useState("");
    const eventName = "capture the flag"
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const userCtx = useContext(AuthContext)
    const navigator = useNavigate()
    const { id } = useParams()
    console.log(userCtx)
    useEffect(() => {
        const colRef = collection(db, "Events")
        //real time update
        if (userCtx) {
            onSnapshot(colRef, (snapshot) => {
                snapshot.docs.forEach((doc) => {
                    if (doc.id === id) {
                        console.log(doc.id)
                        setData(doc.data())
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

            <div className="w-full px-5 relative  text-white p-5 bg-gray-900">
                <div className='flex  justify-between items-center '>
                    <div className='py-3'>
                        <h1 className='text-4xl capitalize '>{data.name}</h1>
                        <div className='text-gray-300  text-md'>Round 1</div>
                    </div>
                    <SearchBar query={query} setQuery={setQuery} />
                    <button onClick={() => auth.signOut()}>Sign out</button>
                </div>
                <div className='flex justify-center item-center
              overflow-hidden shadow-md  shadow-gray-800'>
                    <ScoreSheet participants={data.participants} rounds={data.rounds} round={1} />
                </div>

            </div>

        }

    </>
    )
}



export default Dashboard