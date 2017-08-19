<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>
import { mapState , mapMutations} from 'vuex'
export default {
  name: 'app',
  computed: {
  },
  watch: {
    '$route' (to, from) {
      document.body.scrollTop = 0;
    }
  },
  methods: {
   
  },
  created: function () {
  }
}
</script>

<style lang="less">
html,body, #app {
    height: 100%;
}

</style>
