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
import LogoutBtn from '../../Utility/LogoutBtn'
import { sha256 } from 'js-sha256'
import { IoIosArrowBack } from 'react-icons/io'
function Dashboard(props) {
    const [query, setQuery] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)


    const userCtx = useContext(AuthContext)
    const navigator = useNavigate()
    const { id, round } = useParams()
    const [selectedJudge, setSelectedJudge] = useState(data?.rounds[round - 1].judges[0].uid)
    useEffect(() => {
        const colRef = collection(db, 'Events')
        if (userCtx) {
            onSnapshot(colRef, (snapshot) => {
                snapshot.docs.forEach((doc) => {
                    if (doc.id === id) {
                        console.log(doc.id)
                        setSelectedJudge(doc.data().data.rounds[round - 1].judges[0].uid)
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

    useEffect(() => {
        if (sha256(userCtx.currentUser.uid) !== '631c81c139014f8696e0948ffcd88ab8a7ea06a1984a9f3f6b4f88740f7ac959') {
            navigator('/')
        }
    }, [userCtx])

    return (<>
        {loading ? <div>Loading</div> :
            <div className="w-full px-5 relative bg-gray-200  text-black pt-4 ">
                <div className='flex pt-2 pb-1 justify-between items-center mb-2 '>
                    <div onClick={() => navigator(-1)} className='flex flex-row gap-3 hover:opacity-70 transition-all cursor-pointer hover:gap-4 items-center'>
                        <IoIosArrowBack className='text-3xl ' />
                        <div>
                            <h1 className='text-4xl capitalize '>{data.name}</h1>
                            <div className='text-gray-800  text-md'>{`Round ${round}`}
                                {data.rounds[round - 1].completed && <span className='text-green-500 text-lg ml-2 font-semibold'>(Event Completed)</span>}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-5 items-center'>
                        <div className='flex items-center gap-2 bg-gray-200 p-2 pl-3 rounded-md'>
                            <p className='font-semibold'>Select Judge: </p>
                            <select class=" block w-80 px-2 py-1.5 text-base bg-gray-300 rounded transition ease-in-out m-0  focus:bg-gray-600/100 text-black  backdrop-blur focus:border-blue-600 outline-none focus:ring-0  focus:outline-none" value={selectedJudge} onChange={(e) => setSelectedJudge(e.target.value)}>
                                {
                                    data.rounds[round - 1].judges.map(judge => (
                                        <option className='p-2' value={judge.uid}>{judge.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='inline-flex gap-3'>
                            <SearchBar query={query} setQuery={setQuery} />
                            <LogoutBtn className={'text-white'} auth={auth} />
                        </div>
                    </div>
                </div>
                <ScoreSheet winners={data.winners} maxParticipants={data.maxParticipants} query={query} participants={data.participants} id={data.id} uid={selectedJudge} rounds={data.rounds} round={round} />
            </div>

        }

    </>
    )
}



export default Dashboard