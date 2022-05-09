import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'

function ParticipantsModal ({ set, onClose, participants }) {
	
  return (
    <>
      <div
        className={`${
          set ? 'flex' : 'hidden'
        }  backdrop-blur-sm fixed top-0 right-0 z-[999] justify-center   w-full bg-gray-800/50 h-screen overflow-auto`}
      >
        <div className=' w-[90vw] md:w-[50vw] xl:w-[30vw] my-10 h-fit  bg-gray-900/75 backdrop-blur-md text-center rounded-xl text-white '>
          <div className='sticky top-0 bg-gray-800 p-5 flex items-center justify-between mb-3 border-b border-gray-600'>
						<p className='text-xl mr-3'>Participants</p>
							<AiOutlineClose onClick={onClose} className='hover:text-gray-400 cursor-pointer   text-xl' />
					</div>
					<div className='px-8'>
					{participants.map((participant, idx) => (
						<div className='text-left'>
							{idx !== 0 && <hr className='my-3  border-gray-400'/> }
							<div>
								<p className='flex'><div className='font-bold basis-1/3 shrink-0   '>PID:</div><div className='whitespace-nowrap'>{participant.pId}</div></p>
								<p className='flex'><div className='font-bold basis-1/3 shrink-0   '>Name:</div><div className='whitespace-nowrap'>{participant.name} </div></p>
								<p className='flex'><div className='font-bold basis-1/3 shrink-0   '>USN:</div><div className='whitespace-nowrap'>{participant.usn} </div></p>
								<p className='flex'><div className='font-bold basis-1/3 shrink-0   '>Phone:</div><div className='whitespace-nowrap'>{participant.phNo} </div></p>
								<p className='flex'><div className='font-bold basis-1/3 shrink-0   '>Email:</div><div className='whitespace-nowrap'>{participant.email} </div></p>
								<p className='flex'><div className='font-bold basis-1/3 shrink-0   '>College:</div><div className=''>{participant.collegeName} </div></p>
							</div>

						</div>
					))}
					</div>
          <div className='flex py-3 gap-3 mt-3 bg-gray-800 border-gray-600 border-t justify-end '>
            <button
              onClick={onClose}
              className='px-4 mr-4 py-2 border-2 border-red-600 hover:bg-red-600 transition-colors hover:border-red-600/75  rounded-md'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ParticipantsModal
