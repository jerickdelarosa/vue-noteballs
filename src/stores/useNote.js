import { defineStore } from 'pinia'
import {
    collection,
    doc,
    addDoc,
    getDocs,
    setDoc,
    deleteDoc,
    updateDoc,
    onSnapshot,
    query, orderBy
} from "firebase/firestore";
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'

let notesCollectionRef
let notesCollectionQuery
let getNotesSnapshot = null

export const useNoteStore = defineStore({
    id: 'useNote',
    state: () => {
        return {
            notes: [
            ],
            notesLoaded: false
        }
    },
    actions: {
        init() {
            // initialize our database refs
            const storeAuth = useStoreAuth()

            // path uid
            notesCollectionRef = collection(db, "users", storeAuth.user.id, "notes");

            /* query to desc order */
            notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));
            this.getNotes()
        },
        async getNotes() {
            this.notesLoaded = false

            getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
                let notes = []
                querySnapshot.forEach((doc) => {
                    let note = {
                        id: doc.id,
                        content: doc.data().content,
                        date: doc.data().date
                    }
                    notes.push(note);
                });
                this.notes = notes
                this.notesLoaded = true
            }, error => {
                console.log('error msg: ', error.message)
            });

        },
        clearNotes() {
            this.notes = []
            if (getNotesSnapshot) getNotesSnapshot(); // unsubscribe from any active listener
        },
        async addNote(newNoteContent) {
            let currentDate = new Date().getTime(),
                date = currentDate.toString();

            await addDoc(notesCollectionRef, {
                content: newNoteContent,
                date: date
            });
        },
        async deleteNote(idToDelete) {
            await deleteDoc(doc(notesCollectionRef, idToDelete));
        },

        async updateNote(id, content) {
            let index = this.notes.findIndex(note => note.id === id)
            this.notes[index].content = content

            await updateDoc(doc(notesCollectionRef, id), {
                content: content
            });
        }
    },
    getters: {
        getNoteContent: (state) => {
            return (id) => {
                return state.notes.filter(note => note.id === id)[0].content
            }
        },
        totalNotesCount: (state) => {
            return state.notes.length
        },
        totalCharactersCount: (state) => {
            let count = 0
            state.notes.forEach(note => {
                count += note.content.length
            })
            return count
        }
    }
})