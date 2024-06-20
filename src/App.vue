<template>
  <div id="app">
    <List />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import List from './components/List.vue'

export default defineComponent({
  name: 'App',
  components: {
    List
  }
})
</script>
