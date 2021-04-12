<template>
  <v-app-bar>
    <v-toolbar-title class="pa-2">Restaurents</v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items>
      <v-btn text @click="goToListeRestaurent">Liste de restaurant</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    goToListeRestaurent () {
      this.$router.push('/')
    }

  }
}
</script>

<style scoped>

</style>