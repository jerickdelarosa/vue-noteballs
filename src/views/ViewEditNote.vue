<template>
  <div class="edit-notes">
    <AddEditNote
      v-model="noteContent"
      ref="addEditNoteRef"
      bgColor="link"
      placeholder="Edit note..."
      label="Edit Note"
    >
      <template #buttons>
        <button class="button is-link is-light mr-2" @click="$router.push('/')">
          Cancel
        </button>
        <button
          @click="handleSaveClicked"
          class="button is-link has-background-link"
          :disabled="!noteContent"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AddEditNote from "@/components/notes/AddEditNote.vue";
import { useNoteStore } from "@/stores/useNote";

const route = useRoute();
const router = useRouter();

const storeNotes = useNoteStore();

const noteContent = ref();

noteContent.value = storeNotes.getNoteContent(route.params.id);

const handleSaveClicked = () => {
  // for payload params
  storeNotes.updateNote(route.params.id, noteContent.value);
  router.push("/");
};
</script>