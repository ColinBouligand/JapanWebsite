<template>
  <div class="content">
      <div class="front">{{kanji.kanji}}</div>
      <div class="back" >
        <p>{{format(kanji.meanings)}}</p>
      </div>
  </div>
</template>

<script>


export default {
    name: 'Card',
    props: {
        kanji: Object
    },
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
        format(value) { //met en forme le json en chaine
          var res=""
          for(var i in value)
          {
              res+= `${value[i]} - `  //  équivalent en template litterals de value[i] + " - "
          }
          /*if(Object.keys(value).length  > 5){ //changement de l'espacement si trop de résultats
          console.log("trop grand")
              document.getElementsByClassName('back')[0].style.lineHeight = "75px"
          }*/
          return res.substring(0, res.length - 2); // enlève le dernier tiret
        }
    },
    async created(){
      
        }
}



 
</script>


<style scoped>

.content {
  position: absolute;
  width: 100%;
  height: 100%;
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
  line-height: 300px;
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