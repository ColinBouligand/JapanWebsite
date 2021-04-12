<template>
<Navbar />
<div class="container">
<Header @toggle-add-task="toggleAddTask" title="Task Tracker" :showAddTask="showAddTask"/>
<Canvas />

<router-view :showAddTask="showAddTask"></router-view>
<Footer />

</div>

</template>

<script>
import Navbar from './components/Navbar'

import Header from './components/header'

import Canvas from './components/Canvas'

import Footer from './components/Footer'



export default {
  name: 'App',
  components: {
    Navbar,
    Header,
    Canvas,
    Footer
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


.btn {
  display: inline-block;
  background: black;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;

}



</style>
