import React, { createContext, useState } from 'react'

export const ModalContext = createContext()

function ModalContextProvider(props) {
    const [modal, setModal] = useState({
        round: {},
        pids: [],
        active: false
    })

    return (
        <ModalContext.Provider value={[modal, setModal]}>
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalContextProvider