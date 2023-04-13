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

</script>

<style scoped></style>
