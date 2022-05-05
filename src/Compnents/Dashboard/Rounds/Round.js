import React, { useState } from "react";
import { select } from "../../../firebaseConfig";
import AddBtn from "../../../Utility/AddBtn";
import ParticipantBtn from "./ParticipantBtn";

function Round({ id, participants, disabled }) {
    const [selected, setSelected] = useState({
        roundIdx: id - 1,
        pIds: new Set(),
    });
    console.log(selected);
    const handleSave = () => {
        select("capture the flag", selected.pIds, selected.roundIdx);
    };
    return (
        <div
            key={id}
            className={`${disabled && "opacity-50"
                } relative   w-full  text-center   border-opacity-40 border-gray-300 border-r-2 `}
        >
            <h2 className="p-2 text-2xl font-semibold border-b-2 border-gray-300 border-opacity-40 sm:p-4">
                Round {id}
            </h2>
            {disabled && <div className="absolute z-50 w-full h-full"></div>}
            <div className="py-3">
                <div className=" h-[70vh] tablescroll overflow-y-scroll w-full">
                    {participants.map((obj, i) => {
                        if (id === 1) {
                            return (
                                <ParticipantBtn
                                    selected={selected}
                                    setSelected={setSelected}
                                    key={i}
                                    pIds={obj.pIds}
                                    round={obj.rounds[id - 1]}
                                />
                            );
                        } else if (obj.rounds[id - 2].selected) {
                            return (
                                <ParticipantBtn
                                    selected={selected}
                                    setSelected={setSelected}
                                    key={i}
                                    pIds={obj.pIds}
                                    round={obj.rounds[id - 1]}
                                />
                            );
                        } else return <></>;
                    })}
                </div>
            </div>
            <div className="flex gap-5 p-2 border-t-2 border-gray-300 justify-evenly border-opacity-40">
                <button
                    className="px-4 py-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 hover:shadow-lg focus:outline-none"
                    onClick={handleSave}
                >
                    {" "}
                    save
                </button>
                <button className="px-4 py-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 hover:shadow-lg focus:outline-none">
                    submit
                </button>
                <AddBtn />
            </div>
        </div>
    );
}

export default Round;
