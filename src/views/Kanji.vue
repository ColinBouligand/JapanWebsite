<template>
<div v-if="showAddTask"> <AddTask @add-task="addTask" /></div>
    <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />

<Header @toggle-add-task="toggleAddTask" title="Dessine moi ça bien" :showAddTask="showAddTask"/>

<div id="canvas-container">
    <Canvas />
</div>
 


</template>

<script>

import Tasks from '../components/Tasks'
import AddTask from '../components/AddTask'

import Header from '../components/header'

import Canvas from '../components/Canvas'


export default {
    name: 'Home',
    props:{
        showAddTask: Boolean,
    },
    components: {
        Tasks,
        AddTask,
        Header,
        Canvas
    },
    data() {
        return {
        tasks: [],
        }
    },
     methods: {
      async addTask(task){
        const res = await fetch('http://localhost:8080/tasks', {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
          },
          body: JSON.stringify(task)

        })
        const data = await res.json()

        this.tasks = [...this.tasks, data]
      },
      async deleteTask(id){
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

      },
      async fetchTasks(){
        const res = await fetch('http://localhost:8080/tasks')
        const data = await res.json()
        return data
      },
      async fetchTask(id){
        //http://localhost:8080  -> avant api
        const res = await fetch(`http://localhost:8080/tasks/${id}`)
        const data = await res.json()
        return data
      },

  },
  async created() {
    this.tasks = await this.fetchTasks()
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
        position: relative;
        margin-left: 10%;
    }
</style>
