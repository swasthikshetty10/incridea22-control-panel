import { initializeApp } from 'firebase/app'

import {
    getFirestore, collection, doc, getDocs, addDoc, deleteDoc, query, where, updateDoc, onSnapshot
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

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getEvent(eventName) {
    const events = [];

    const collRef = collection(db, 'Events')
    const q = query(collRef, where('name', '==', eventName))
    const eventRef = await getDocs(q);
    eventRef.forEach((event) => {
        events.push({ ...event.data(), id: event.id })
    })
    if (!events[0]) {
        throw new Error("No such event")
    }
    return events[0]
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

const auth = getAuth(app)

async function createOrganiser(organiser) {
    const orgColRef = collection(db, 'Organisers')
    const { email, password } = organiser
    const userCred = await createUserWithEmailAndPassword(auth, email, password)
    delete organiser.password
    organiser.uid = userCred.user.uid
    await addDoc(orgColRef, organiser)
}

async function loginOrganiser(email, password) {
    const orgColRef = collection(db, 'Organisers')
    const organisers = []
    const userCred = await signInWithEmailAndPassword(auth, email, password)
    const q = query(orgColRef, where('uid', '==', userCred.user.uid))
    const orgRef = await getDocs(q)
    orgRef.forEach((organiser) => {
        organisers.push({ ...organiser.data(), id: organiser.id })
    })
    return organisers[0]
}

// const organiser = {
//     email,
//     password,
//     name,
//     role, 
//     event name /*Optional*/
// }