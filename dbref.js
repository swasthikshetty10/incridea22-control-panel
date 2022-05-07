const events = {
    name: "eventName",
    maxParticipants: 2,
    roles: {
        "uid1": "judge",
        "uid2": "judge",
        "uid3": "judge",
        "UserId2": "organiser",
    },
    participants: [
        {
            pIds: ["pId1", "pId2"],
            rounds: [
                {
                    scores: [
                        {
                            uid: "uid1",
                            criteria: [2, 2, 6],
                            total: 10,

                        },
                        {
                            uid: "uid2",
                            criteria: [5, 1, 3],
                            total: 9,
                        },
                    ],
                    selected: false
                }, {
                    scores: [
                        {
                            uid: "uid1",
                            criteria: [9, 1, 5],
                            total: 15,

                        },
                        {
                            uid: "uid3",
                            criteria: [1, 2, 3],
                            total: 6,
                        },
                    ],
                    selected: false
                },
            ],
            comments: ""
        }
    ],
    rounds: [
        {
            criteria: ["criteria 1", "criteria 1", "criteria 1"],
            judges: ["uid1", "uid2"]
        },
        {
            criteria: ["criteria 1", "criteria 1", "criteria 1"],
            judges: ["uid1", "uid3"]
        }
    ],
    completed: false,
    winners: [
        "FirstPlaceName", "SecondPlaceName"
    ]

}