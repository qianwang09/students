<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  props: ['title'],
  data() {
    return {
      name: '邦邦留学App'
    }
  }
}
</script>
<style></style>
<style>
#app {
}
</style>
