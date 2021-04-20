<template>
<Navbar />
<div class="container">


<router-view ></router-view>
<!--<Footer />-->

</div>

</template>

<script>
import Navbar from './components/Navbar'
//import Footer from './components/Footer'


export default {
  name: 'App',
  components: {
    Navbar,
   // Footer
  },
  data() {
    return{
    showAddTask: false,
    }
  },
  methods: {
    toggleAddTask(){
        this.showAddTask = !this.showAddTask
      },
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
