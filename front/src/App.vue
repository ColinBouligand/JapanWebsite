<template>
<Navbar />
<div class="container">
<router-view ></router-view>
</div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar,
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html {
  min-height:100%;
}
body {
      background: linear-gradient(45deg, #ea4f4c 0%, #6d0019 100%);
      background-repeat: no-repeat;
      font-family: 'Lato', sans-serif;

}

@import url('https://fonts.googleapis.com/css2?family=Lato:wght@100&display=swap');

</style>
