<template>
  <div class="notes">
    <AddEditNote v-model="newNote" placeholder="Add a new note" ref="addEditNoteRef">
      <template #buttons>
        <button @click="addNote" :disabled="!newNote" class="button is-link has-background-success">
          Add New Note
        </button>
      </template>
    </AddEditNote>

    <Note v-for="note in storeNotes.notes" :key="`note-key-${note.id}`" :note="note" />
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

/* STATE */
const storeNotes = useNoteStore();

/* METHOD */
const addNote = () => {
  storeNotes.addNote(newNote.value);
  newNote.value = "";
  addEditNoteRef.value.focusTextarea();
};

useWatchCharacters(newNote, 100);

</script>