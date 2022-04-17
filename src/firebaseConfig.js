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
    return events[0]
}