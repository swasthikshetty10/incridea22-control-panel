import React from "react";
import Round from "./Round";

function Rounds({ participants }) {
  const rounds = participants[0].rounds.length;
  const cols = [
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
  ];
  return (
    <div className="text-center grow">
      <div className={"grid " + cols[rounds - 1]}>
        {participants[0].rounds.map((_, i) => (
          <Round
            key={i}
            id={i + 1}
            participants={participants}
            disabled={false}
          />
        ))}
      </div>
    </div>
  );
}

export default Rounds;
