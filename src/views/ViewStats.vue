<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of Characters (of all notes)</td>
          <td>{{ totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <input v-model="loveNoteballs" class="input" type="text" placeholder="Do you love noteballs?" v-autofocus>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNoteStore } from "@/stores/useNote";
import { vAutofocus } from "@/directives/vAutofocus";
import { useWatchCharacters } from '@/use/useWatchCharacters'

const loveNoteballs = ref('');

const storeNotes = useNoteStore();

const totalNotesCount = storeNotes.totalNotesCount;
const totalCharactersCount = storeNotes.totalCharactersCount;

/* Composables */
useWatchCharacters(loveNoteballs, 50);
</script>