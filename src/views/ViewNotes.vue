<template>
  <div class="notes">
    <AddEditNote class="mb-4" v-model="newNote" placeholder="Add a new note" ref="addEditNoteRef">
      <template #buttons>
        <button @click="addNote" :disabled="!newNote" class="button is-link has-background-success">
          Add New Note
        </button>
      </template>
    </AddEditNote>

    <progress v-if="!storeNotes.notesLoaded" class="progress is-large is-success" max="100" />

    <template v-else>
      <Note v-for="note in storeNotes.notes" :key="`note-key-${note.id}`" :note="note" />

      <div class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
        v-if="!storeNotes.notes.length">
        No notes here yet..
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Note from "@/components/notes/Note.vue";
import AddEditNote from "@/components/notes/AddEditNote.vue";
import { useNoteStore } from "@/stores/useNote";
import { useWatchCharacters } from '@/use/useWatchCharacters'

/* Notes */
const newNote = ref("");
const addEditNoteRef = ref(null);


/* METHOD */
const addNote = () => {
  storeNotes.addNote(newNote.value);
  newNote.value = "";
  addEditNoteRef.value.focusTextarea();
};

useWatchCharacters(newNote, 100);

/* STATE */
const storeNotes = useNoteStore();



</script>