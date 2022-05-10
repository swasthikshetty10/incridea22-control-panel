import React, { useContext, useState } from 'react'

function WinnerBtn({ pIds, round }) {
    return (
        <div className="bg-gray-700 hover:bg-opacity-50 cursor-pointer transform ease-in-out duration-50 bg-opacity-90 m-2 mx-6 px-2 py-1 flex justify-between ">
            <div className='flex-col gap-3  w-full  '>
                {pIds.map((pid, index) => <div key={index} className='bg-gray-500 p-2 bg-opacity-20 gap-5 inline-flex flex-nowrap my-1 justify-between w-full '>
                    <span>{pid}</span>
                    <span>
                        {round.total}
                    </span>
                </div>
                )}
            </div>
        </div>
    )
}

export default WinnerBtn