import React, { useContext } from "react";
import { ModalContext } from "../../../Context/ModalContext";
export default function Modal() {
    const [modal, setModal] = useContext(ModalContext)
    const setShowModal = (bool) => {
        setModal({ ...modal, active: bool })
    }
    console.log(modal)

    return (
        <>
            {modal.active ? (
                <>
                    <div
                        className="justify-center   items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-600 outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {modal.pIds.toString()}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative px-6 py-3 flex-auto">
                                    {
                                        modal.round.judges.map((judge, i) =>
                                            <div key={i} className="w-full my-3">
                                                <h3 className="text-lg">{judge.name}</h3>
                                                <div className="flex justify-evenly">
                                                    {
                                                        judge.criteria.map((c, ix) =>

                                                            <div key={ix}>
                                                                <p>{c.name}</p>
                                                                <input

                                                                    onChange={(e) => {
                                                                        let criteriaObj = { ...modal.round.judges[i].criteria[ix], score: parseInt(e.target.value) }
                                                                        let criteria = [...modal.round.judges[i].criteria]
                                                                        criteria[ix] = criteriaObj
                                                                        let judges = [...modal.round.judges]
                                                                        judges[i] = { ...judges[i], criteria }

                                                                        setModal(
                                                                            {
                                                                                ...modal,
                                                                                round: {
                                                                                    ...modal.round,
                                                                                    judges: judges
                                                                                }
                                                                            })
                                                                    }}
                                                                    type="number" placeholder="" className="px-3 py-3 placeholder-slate-300 numinput text-slate-700 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring  w-14" />
                                                            </div>
                                                        )
                                                    }

                                                </div>
                                            </div>


                                        )
                                    }




                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}