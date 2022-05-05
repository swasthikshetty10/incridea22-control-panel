import React, { useContext, useEffect, useState } from 'react'
import { auth, getEvent, getOrganiser } from '../../firebaseConfig'
import ScoreSheet from './ScoreSheet'
import SearchBar from './Utility/SearchBar'
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
    const [criteria, setCriteria] = useState([
        {
            name: "Criteria-1",
            value: 0
        },
        {
            name: "Criteria-2",
            value: 0
        }, {
            name: "Criteria-3",
            value: 0
        }
    ])
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
                    <h1 className='text-4xl py-5 capitalize '>{data.name}</h1>
                    <SearchBar query={query} setQuery={setQuery} />
                    <button onClick={() => auth.signOut()}>Sign out</button>
                </div>
                <div className='flex justify-between 
             border-2 border-opacity-40 border-gray-300 overflow-hidden shadow-md  shadow-gray-800'>
                    <ScoreSheet criteria={criteria} participants={data.participants} round={2} />
                    {/* <Rounds participants={data.participants} />
                    <Winners participants={data.participants} /> */}
                </div>

            </div>

        }

    </>
    )
}

export default Dashboard