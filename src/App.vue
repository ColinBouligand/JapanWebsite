<template>
  <Navbar />
  <router-view ></router-view>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data() {
    return{
    }
  },
  methods: {
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
      background: linear-gradient(45deg, #ea4f4c 0%, #6d0019 100%);

}





</style>
