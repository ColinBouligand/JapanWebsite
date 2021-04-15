<template>
<div v-if="showAddTask"> <AddTask  /></div>
    <!--<Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" /> -->

<Header @toggle-add-task="toggleAddTask" title="Atelier Dessin" :showAddTask="showAddTask"/>

<div id="canvas-container">
  
    <Canvas @add-drawing="addDrawing"/>
</div>

<Drawings :drawings="drawings"/>
 


</template>

<script>

import Drawings from '../components/Drawings'
import AddTask from '../components/AddTask'

import Header from '../components/header'

import Canvas from '../components/Canvas'


export default {
    name: 'Home',
    props:{
        showAddTask: Boolean,
    },
    components: {
        Drawings,
        AddTask,
        Header,
        Canvas
    },
    data() {
        return {
        drawings: [],
        }
    },
     methods: {
      async addDrawing(drawing){
        console.log(drawing)
        const res = await fetch('http://localhost:5000/drawings', {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
          },
          body: JSON.stringify(drawing)

        })
        const data = await res.json()

        this.drawings = [...this.drawings, data]
      },
      /*async deleteTask(id){
        if(confirm('Are you sure ?')){
          const res = await fetch(`http://localhost:8080/tasks/${id}`, {
          method: 'DELETE'
        })
        res.status === 200 ? (this.tasks= this.tasks.filter((task)=> task.id !== id))
        : alert('Error deleting task')

        }
      },
      async toggleReminder(id){
        const taskToToggle = await this.fetchTask(id)
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
        
        const res = await fetch(`http://localhost:8080/tasks/${id}`, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json',
          },
          body: JSON.stringify(updTask)
        })
        const data =  await res.json()
        this.tasks = this.tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task)

      },*/
      async fetchDrawings(){
        const res = await fetch('http://localhost:5000/drawings')
        const data = await res.json()
        return data
      }

  },
  async created() {
    this.drawings = await this.fetchDrawings()
  }
}

</script>

<style scoped>

    Header{
       position: relative;
        margin-left: 10%;
        margin-top: 3%;
    }

    #canvas-container {
      display:flex;
      flex-direction: column;
      width:50%;
      position:relative;
      margin-left:25%;
      align-items:center;

    }
</style>
