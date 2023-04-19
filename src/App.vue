<template>
  <!--
      <RouterLink to="/" class="button">Notes</RouterLink>
    <RouterLink to="/stats" class="button">Stats</RouterLink>
    -->
  <router-view name="navigation" />
  <div class="container is-max-desktop px-2 py-4">
    <router-view />
  </div>
</template>

<script setup>
import { useNoteStore } from "@/stores/useNote";
import { onMounted } from "vue";

const storeNotes = useNoteStore();

onMounted(() => {
  storeNotes.getNotes();
});
</script>

<style scoped></style>
