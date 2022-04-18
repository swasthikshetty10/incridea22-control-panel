import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, doc, getDocs, addDoc, deleteDoc, query, where
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyChSXTSYZm0-EqrOhVbnP9FNopgEifCqu4",
    authDomain: "incridemo.firebaseapp.com",
    projectId: "incridemo",
    storageBucket: "incridemo.appspot.com",
    messagingSenderId: "599759960850",
    appId: "1:599759960850:web:0c378639e025467c15d1cb"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

export async function select(eventName, setArrs, roundIndex) {
    if (!setArrs.length) {
        throw new Error('No Participants selected');
    }
    const set = new Set(setArrs)
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

    }
    event.participants = participants
    const docRef = doc(db, 'Events', event.id)
    delete event.id
    await updateDoc(docRef, event)

}   //Not considering invalid array sent (for now)   

//const setArrs = arrs.map((arr) => { return JSON.stringify(arr) }) where arrs is the array of Pids of selected participants

