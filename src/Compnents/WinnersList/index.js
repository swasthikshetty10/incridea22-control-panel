import React, { useEffect, useState } from 'react'
import { getWinners } from '../../firebaseConfig'
import ParticipantsModal from '../../Utility/ParticipantsModal'
import SearchBar from '../../Utility/SearchBar'

function WinnersList() {
  const [winners, setWinners] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [clickedPIds, setClickedPIds] = useState([])
  const [searchResults, setSearchResults] = useState(winners)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchWinners = async () => {
      setLoading(true)
      let innerWinners = await getWinners()
      setWinners(innerWinners)
      setSearchResults(innerWinners)
      setLoading(false)
    }
    fetchWinners()
  }, [])

  useEffect(() => {
    setSearchResults(
      winners.filter(winner =>
        winner.name.toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [query, winners])

  console.log(winners)

  return (
    <div className='min-h-screen pt-9 bg-gray-700 text-white pt-3'>
      <div className='flex gap-10 items-center justify-center'>
        <h1 className='text-center text-3xl'>
          Click an event to view its winners
          <p className='text-base text-green-500'>(Events in green are completed)</p>
        </h1>
      </div>
      <div className='p-10 max-w-md mx-auto'>
        {loading ? (
          <></>
        ) : (
          <>
            <div>
              <SearchBar
                winners
                setQuery={setQuery}
                query={query}
                onSearch={() => { }}
              />
              <label class='inline-flex justify-center w-full mt-3 items-center'>
                <input
                  type='checkbox'
                  onChange={e => {
                    if (e.target.checked)
                      setSearchResults(p => p.filter(event => event.completed))
                    else
                      setSearchResults(
                        winners.filter(winner =>
                          winner.name
                            .toLowerCase()
                            .includes(query.toLowerCase())
                        )
                      )
                  }}
                  class='w-6 accent-blue-500 bg-blue-500 h-6 rounded checked'
                />
                <span class='ml-2 font-semibold'>
                  Show only completed events
                </span>
              </label>
            </div>
            <div className='h-[65vh] overflow-auto'>
              {searchResults.map((event, idx) => {
                return (
                  <div
                    onClick={() => {
                      setModalOpen(true)
                      setClickedPIds(event.winner)
                    }}
                    key={idx}
                    className={`p-3 text-2xl ${event.completed ? 'bg-green-500' : 'bg-black'
                      } hover:bg-opacity-40  cursor-pointer rounded-lg my-2  bg-opacity-30`}
                  >
                    <span>{event.name}</span>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
      <ParticipantsModal
        isWinners
        onClose={() => setModalOpen(false)}
        set={modalOpen}
        pIds={clickedPIds}
      />
    </div>
  )
}

export default WinnersList
