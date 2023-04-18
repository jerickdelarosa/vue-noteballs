<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light mt-2">
          <small>{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink
        :to="`/edit-note/${note.id}`"
        href="#"
        class="card-footer-item"
        >Edit</RouterLink
      >
      <a
        href="#"
        @click.prevent="modals.deleteNote = true"
        class="card-footer-item"
        >Delete</a
      >
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId="note.id"
    />
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import ModalDeleteNote from "@/components/notes/ModalDeleteNote.vue";
import { useNoteStore } from "@/stores/useNote";
/* PROPS */
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

/* REACTIVE OBJECT */
const modals = reactive({
  deleteNote: false,
});

/* STATE */
const storeNotes = useNoteStore();

/* METHODS */

/* COMPUTED */
const characterLength = computed(() => {
  let length = props.note.content.length;
  let description = length > 1 ? "characters" : "character";
  return `${length} ${description}`;
});
</script>