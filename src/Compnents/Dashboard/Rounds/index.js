import React, { useEffect, useState } from "react";
import Round from "./Round";

function Rounds({ participants, query
}) {
  const rounds = participants[0].rounds.length;
  const [participant, setRoundParticipants] = useState(participants)
  const cols = [
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
  ];
  useEffect(() => {
    setRoundParticipants(participants.filter((ele) => {
      return true && ele.pIds.some((id) => id.toLowerCase().includes(query.toLowerCase()))
    }))

  }, [query, participants])
  return (
    <div className="text-center grow">
      <div className={"grid " + cols[rounds - 1]}>
        {participants[0].rounds.map((_, i) => (
          <Round
            key={i}
            id={i + 1}
            participants={participant}
            disabled={false}
          />
        ))}
      </div>
    </div>
  );
}

export default Rounds;
