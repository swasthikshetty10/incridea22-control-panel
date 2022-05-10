import { initializeApp } from 'firebase/app'

import {
    enableIndexedDbPersistence, initializeFirestore, CACHE_SIZE_UNLIMITED, getFirestore, collection, doc, getDocs, addDoc, deleteDoc, query, where, updateDoc, onSnapshot, getDoc
} from 'firebase/firestore'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyChSXTSYZm0-EqrOhVbnP9FNopgEifCqu4",
    authDomain: "incridemo.firebaseapp.com",
    projectId: "incridemo",
    storageBucket: "incridemo.appspot.com",
    messagingSenderId: "599759960850",
    appId: "1:599759960850:web:0c378639e025467c15d1cb"
}

export const app = initializeApp(firebaseConfig);
//  = getFirestore(app);

export const db = initializeFirestore(app, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
});

enableIndexedDbPersistence(db)
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
    });
export async function getEvent(id) {
    const events = [];

    const collRef = collection(db, 'Events')
    const q = query(collRef, where('id', '==', id))
    const eventRef = await getDocs(q);
    eventRef.forEach((event) => {
        events.push({ ...event.data(), id: event.id })
    })
    if (!events[0]) {
        throw new Error("No such event")
    }
    return events[0]
}

export async function getEvents(uid, role) {
    const collRef = collection(db, 'Events2')
    const q = query(collRef, where(`roles.${uid}`, "==", role))
    const querySnaphshot = await getDocs(q)
    const data = []
    querySnaphshot.forEach((event) => {
        data.push({ ...event.data(), id: event.id })
    })
    return data
}

export async function updateRound(eventName, pIds, roundIndex, roundObj) {
    const collRef = collection(db, 'Events')
    const q = query(collRef, where('name', '==', eventName))
    const events = []
    const eventRef = await getDocs(q)
    eventRef.forEach((event) => {
        events.push({ ...event.data(), id: event.id })
    })
    const event = events[0]
    if (!event) {
        throw new Error('No Such Event')
    }
    const participant = event.participants.find((participant) => {
        return (JSON.stringify(participant.pIds) === JSON.stringify(pIds))
    })
    if (!participant) {
        throw new Error('Participant Not Found')
    }
    if (roundIndex > (participant.rounds.length - 1) || roundIndex < 0) {
        throw new Error('Round does not exist')
    }
    const participantIndex = event.participants.indexOf(participant)
    participant.rounds[roundIndex] = roundObj
    event.participants[participantIndex] = participant
    const docRef = doc(db, 'Events', event.id)
    delete event.id
    await updateDoc(docRef, event)
}

export async function select(eventName, set, roundIndex) {
    const collRef = collection(db, 'Events')
    const q = query(collRef, where('name', '==', eventName))
    const events = []
    const eventRef = await getDocs(q)
    eventRef.forEach((event) => {
        events.push({ ...event.data(), id: event.id })
    })
    const event = events[0]
    if (!event) {
        throw new Error('No Such Event')
    }
    const participants = event.participants
    if (roundIndex > (participants[0].rounds.length - 1) || roundIndex < 0) {
        throw new Error('Round does not exist')
    }
    for (let participant of participants) {
        if (set.has(JSON.stringify(participant.pIds))) {
            participant.rounds[roundIndex].selected = true
        }
        else {
            participant.rounds[roundIndex].selected = false
        }

    }
    event.participants = participants
    const docRef = doc(db, 'Events', event.id)
    delete event.id
    await updateDoc(docRef, event)

}   //Not considering invalid array sent (for now)   


export const auth = getAuth(app)

export async function getAllEvents() {
    const eventColRef = collection(db, 'Events')
    const events = []
    const eventsRef = await getDocs(eventColRef)
    eventsRef.forEach((event) => {
        events.push({ name: event.data().name, id: event.id })
    })
    return events
}

export async function createOrganiser(organiser) {
    const orgColRef = collection(db, 'Organisers')
    const { email, password } = organiser
    const userCred = await createUserWithEmailAndPassword(auth, email, password)
    delete organiser.password
    organiser.uid = userCred.user.uid
    await addDoc(orgColRef, organiser)
}

export async function loginOrganiser(email, password) {
    const userCred = await signInWithEmailAndPassword(auth, email, password)
    return userCred.user
}

export async function getOrganiser(uid) {
    const orgColRef = collection(db, 'Organisers')
    const organisers = []
    const q = query(orgColRef, where('uid', '==', uid))
    const organiserRef = await getDocs(q)
    organiserRef.forEach((organiser) => {

        organisers.push({ ...organiser.data(), id: organiser.id })
    })
    return organisers[0]
}

export async function getWinners() {
    const winners = [];
    const collRef = collection(db, 'Events2')
    const eventDocs = await getDocs(collRef)
    eventDocs.forEach((event) => {
        winners.push({ name: event.data().name, id: event.id, winner: event.data().winners, completed: event.data().completed })
    })
    return winners
}



// const organiser = {
//     email,
//     password,
//     name,
//     role,
//     event name /*Optional*/
// }

//TODO: REFACTOR UPDATE ROUND AND SELECT TO USE ID