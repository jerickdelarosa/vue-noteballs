import { defineStore } from 'pinia'
import {
    collection,
    doc,
    getDocs,
    setDoc,
    deleteDoc,
    updateDoc,
    onSnapshot
} from "firebase/firestore";
import { db } from '@/js/firebase'

const notesCollectionRef = collection(db, "notes");

export const useNoteStore = defineStore({
    id: 'useNote',
    state: () => {
        return {
            notes: [
                /* {
                    id: 'id1',
                    content:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantiu doloremque, sunt earum quidem et vero quae maxime distinctio delectu debitis, quisquam quaerat modi nostrum impedit facere quia repudianda molestiae ilwewo?",
                },
                {
                    id: 'id2',
                    content: "This is a shorter notes.",
                },
                {
                    id: 'id3',
                    content: "Sample notes",
                } */
            ]
        }
    },
    actions: {
        async getNotes() {
            onSnapshot(notesCollectionRef, (querySnapshot) => {
                let notes = []
                querySnapshot.forEach((doc) => {
                    let note = {
                        id: doc.id,
                        content: doc.data().content
                    }
                    notes.push(note);
                });
                this.notes = notes
            });

            // later on
            // unsubscribe();
        },
        async addNote(newNoteContent) {
            let currentDate = new Date().getTime(),
                id = currentDate.toString();

            await setDoc(doc(notesCollectionRef, id), {
                content: newNoteContent
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