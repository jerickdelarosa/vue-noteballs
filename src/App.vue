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
import { useStoreAuth } from "@/stores/storeAuth";
import { onMounted } from "vue";

const storeAuth = useStoreAuth();

onMounted(() => {
  storeAuth.init();
});

</script>

<style scoped></style>
