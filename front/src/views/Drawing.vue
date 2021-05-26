<template>

<Help :textModal="textModal" />
<Button @click="changeTraining()" :text="training ? 'Dessin':'Entrainement'" color="black" textColor="white" />
<Select v-if="training && kanjisSelect" :content="kanjisSelect" @select-change="selectChange"/>
<div class="container_all">
<div id="canvas-container">
  
    <Canvas :training="training" @get-kanji="getKanji" :kanji="kanji"/>
</div>

<KanjiList v-if="kanjisAnswer && !training" :kanjis="kanjisAnswer"/>
</div>
 


</template>

<script>

import Canvas from '../components/Canvas'
import Button from '../components/button'
import Select from '../components/Select'
import Help from '../components/Help'
import KanjiList from '../components/KanjiList'




export default {
    name: 'Drawing',
    props:{
    },
    components: {
        Canvas,
        Button,
        Select,
        Help,
        KanjiList,
    },
    data() {
        return {
        drawings: [],
        kanjisSelect: [],
        training: false,
        kanji: "",
        textModal: "Cette page est dédiée au tracé des kanji. Elle est composée de 2 parties. La première vous permet de dessiner un kanji que vous ne connaissez pas et d'accéder à ses informations. La deuxième partie, accessible via le bouton 'entrainement' vous permet de vous entrainer au tracé des kanji en choisissant un modèle.",
        kanjisAnswer : []

        }
    },
     methods: {
      async getKanji(kanjiDrawn){
        console.log(kanjiDrawn)
	
        const res = await fetch('http://2.56.212.232:5000?kanji='+kanjiDrawn.imgUrl)
        const data = await res.json()
        console.log(data) 
        this.kanjisAnswer = data
        console.log(this.kanjisAnswer) 
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

      },
      
      

  },
  async created() {
    this.kanjisSelect = await this.fetchKanjisSelect()
    this.kanjisAnswer= []
    console.log(this.kanjisSelect)
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

* {
     font-weight: bold;
}
    Header{
       position: relative;
        margin-left: 10%;
        margin-top: 3%;
    }

    #canvas-container {
      display:flex;
      flex-direction: column;
      width:25%;
      position:relative;
      margin-left:10%;
      align-items:center;
      min-width:150px;
      min-height:100px;
      margin-top:5%;

    }
    Select {
      position: relative;
      margin-left: 9%;
      width:3%;
      min-width:40px;

    }

    Button {
      min-width: 130px;
    }

    .container_all {
      display: flex;
      flex-direction: row;
      width: 100%;
    }

    KanjiList{
      width: 60%;
    }

 
</style>
