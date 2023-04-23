<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column">{{ dateFormatted }}</small>
          <small class="column has-text-right">{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/edit-note/${note.id}`" href="#" class="card-footer-item">Edit</RouterLink>
      <a href="#" @click.prevent="modals.deleteNote = true" class="card-footer-item">Delete</a>
    </footer>
    <ModalDeleteNote v-if="modals.deleteNote" v-model="modals.deleteNote" :noteId="note.id" />
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import ModalDeleteNote from "@/components/notes/ModalDeleteNote.vue";
import { useNoteStore } from "@/stores/useNote";
import { useDateFormat } from "@vueuse/core";

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

const dateFormatted = computed(() => {
  let date = new Date(parseInt(props.note.date))
  let formattedDate = useDateFormat(date, 'MM-DD-YYYY @ HH:mm')
  return formattedDate.value
})
</script>