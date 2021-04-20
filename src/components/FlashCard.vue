<template>
<div class="content">
    <div class="front">{{kanji.kanji}}</div>
    <div class="back" >
      <p>{{JSON.stringify(kanji.meanings)}}</p>
       </div>
</div>
   <!--<p v-bind:class="{verso : clicked}" @click="turnCard">  </p> --> 
</template>

<script>


export default {
    name: 'FlashCard',
    props: {
        kanji: Object
    },
    components: {
    },
    data() {
        return {
               // clicked: false
              // meanings: ""
        }
    },
    async created(){
        console.log(this.kanji.meanings)
        //console.log(this.kanji.meanings)
        //this.meanings= JSON.stringify(this.kanji.meanings)
        //console.log(this.meanings)
      
        }
}



 
</script>


<style scoped>

.content {
  position: absolute;
  width: 10%;
  height: 10%;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);

  transition: transform 1s;
  transform-style: preserve-3d;
}

.card:hover .content {
  transform: rotateY( 180deg ) ;
  transition: transform 0.5s;
}

.front,
.back {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #FAF0CD;
  line-height: 100px;
  color: #DB5249;
  text-align: center;
  font-size: 60px;
  border-radius: 5px;
  backface-visibility: hidden;
}

.back {
  background: #9B2D23;
  color: #FAF0CD;
  transform: rotateY( 180deg );
  font-size: 30px;
  line-height: 100px;
  word-wrap: break-word;
 }

/* Toast */
Toast {
    color:white;
}


</style>