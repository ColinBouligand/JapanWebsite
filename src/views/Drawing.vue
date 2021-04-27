<template>
    <!--<Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" /> -->

<Button @click="changeTraining()" :text="training ? 'Dessin':'Entrainement'" color="Orange"/>
<Select v-if="training && kanjisSelect" :content="kanjisSelect" @select-change="selectChange"/>
<Header  title="Atelier Dessin" />

<div id="canvas-container">
  
    <Canvas :training="training" @add-drawing="addDrawing" :kanji="kanji"/>
</div>

<Drawings :drawings="drawings"/>
 


</template>

<script>

import Drawings from '../components/Drawings'
import Header from '../components/header'
import Canvas from '../components/Canvas'
import Button from '../components/button'
import Select from '../components/Select'



export default {
    name: 'Drawing',
    props:{
    },
    components: {
        Drawings,
        Header,
        Canvas,
        Button,
        Select,
    },
    data() {
        return {
        drawings: [],
        kanjisSelect: [],
        training: false,
        kanji: ""

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
      },
      async fetchKanjisSelect(){
        const res = await fetch('https://kanjiapi.dev/v1/kanji/grade-1')
        const data = await res.json()
        return data
      },
      changeTraining(){
        this.training = !this.training
        this.$forceUpdate();

      },
      selectChange(kanji){
        console.log(kanji)
        this.kanji = kanji
        this.$forceUpdate();

      }

  },
  async created() {
    this.kanjisSelect = await this.fetchKanjisSelect()//{ 1:"1", 2:"2" , 3:"3"}
    console.log(this.kanjisSelect)
    //this.drawings = await this.fetchDrawings()
  },
  computed : {
    options() {
       return Object.keys(this.kanjisSelect).map(k => {
        let o = this.kanjisSelect[k]
        console.log(o)
        return `${o}`
      })
    }
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
      min-width:150px;
      min-height:100px;

    }
    Select {
      position: relative;
      margin-left: 43%;
      width:3%;
      min-width:40px;

    }
</style>
