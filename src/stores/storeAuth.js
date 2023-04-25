import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '@/js/firebase'
import { useNoteStore } from '@/stores/useNote';


export const useStoreAuth = defineStore({
    id: 'storeAuth',
    state: () => {
        return {
            user: {}
        }
    },
    actions: {
        init() {
            const storeNotes = useNoteStore();

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.user.id = user.uid
                    this.user.email = user.email
                    this.router.push('/')
                    storeNotes.init()
                } else {
                    this.user = {}
                    this.router.replace('/auth')
                    storeNotes.clearNotes()
                }
            });
        },
        registerUser(credentials) {
            createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then((userCredential) => {
                    const user = userCredential.user
                    // console.log('user: ', user)
                })
                .catch((error) => {
                    console.log('error message: ', error.message)
                })
        },
        loginUser(credentials) {
            signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then((userCredential) => {
                    const user = userCredential.user
                    // console.log('user: ', user)
                })
                .catch((error) => {
                    console.log('error message: ', error.message)
                });
        },
        logoutUser() {
            signOut(auth).then(() => {
                // console.log('user signed-out')
            }).catch((error) => {
                console.log('error message: ', error.message)
            });
        }
    },

})