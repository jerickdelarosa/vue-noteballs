import { defineStore } from 'pinia'

export const useNoteStore = defineStore({
    id: 'useNote',
    state: () => {
        return {
            notes: [
                {
                    id: 1,
                    content:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantiu doloremque, sunt earum quidem et vero quae maxime distinctio delectu debitis, quisquam quaerat modi nostrum impedit facere quia repudianda molestiae ilwewo?",
                },
                {
                    id: 2,
                    content: "This is a shorter notes.",
                },
                {
                    id: 3,
                    content: "Sample notes",
                }
            ]
        }
    },
    actions: {
        addNote(newNoteContent) {
            let currentDate = new Date().getTime(),
                id = currentDate.toString();

            let note = {
                id: id,
                content: newNoteContent,
            };

            this.notes.unshift(note);
        },
        deleteNote(idToDelete) {
            this.notes = this.notes.filter(note => {
                return note.id !== idToDelete
            })
        }
    }
})