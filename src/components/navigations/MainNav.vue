<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop">
      <div class="navbar-brand">
        <a class="navbar-item is-size-4 is-familiy-monospace"> NOTEBALLS </a>

        <a @click.prevent="showMobileNav = !showMobileNav" role="button" class="navbar-burger"
          :class="{ 'is-active': showMobileNav }" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
          ref="navbarBurgerRef">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': showMobileNav }" ref="navbarMenuRef">
        <div class="navbar-end">
          <RouterLink @click="showMobileNav = false" class="navbar-item" active-class="is-active" :to="{ name: 'notes' }">
            Notes
          </RouterLink>
          <RouterLink @click="showMobileNav = false" class="navbar-item" :to="{ name: 'stats' }">
            Stats
          </RouterLink>
          <button v-if="storeAuth.user.id" @click="logout" class="button is-small is-info m-2 mt-3">
            Log out {{ storeAuth.user.email }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useStoreAuth } from '@/stores/storeAuth';

const showMobileNav = ref(false);
const navbarMenuRef = ref(null);
const navbarBurgerRef = ref(null);

/* store */
const storeAuth = useStoreAuth();

onClickOutside(navbarMenuRef, () => {
  showMobileNav.value = false;
});

onClickOutside(
  navbarBurgerRef,
  () => {
    showMobileNav.value = false;
  },
  {
    ignore: [navbarBurgerRef],
  }
);

const logout = () => {
  showMobileNav.value = false
  storeAuth.logoutUser()
}

</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>