<template>
<div  v-bind:data-kanji="content.kanji" :style="{fontSize: fontSize}" 
v-bind:class="{verso : clicked, minSize: minSize}  " @click="turnCard" :data-num="num"> {{content[column][0]}} </div>
</template>

<script>
//, color: clicked ? 'black' : 'red'

export default {
    name: 'FlashCard',
    props: {
        content: Object,
        column: String,
        fontSize: String,
        num: String,
        turned: Boolean,
    },
    components: {
    },
    data() {
        return {
            clicked: false,
            minSize: false
        }
    },
    methods: {
        format(content, column) { //met en forme le json en chaine
            console.log(content, column)
            console.log(this.$props.content[(this.$props.column)])
        },
        async turnCard(e){

             // e.target.getAttribute("data-kanji") === e.explicitOriginalTarget.dataset.kanji
                this.$emit('turn-card', e.target.getAttribute("data-kanji"),e.target.getAttribute("data-num"))
                this.clicked =!this.clicked
                this.correct = !this.correct
                  
        }
    },
    created() {
        if(this.column == "meanings")
        {
            this.minSize=true;

        }        
    
    },watch:
    {
    turned(newValue)
    {
        if(newValue)
        {
            this.clicked=false

        }
    }
    },
    emits: ['turn-card'],
    computed: {

    }
}
</script>



<style scoped>
.minSize {
    font-size: 30px;
}

.verso {
    background: #9B2D23!important;
    color: #FAF0CD!important;
}

div {
    word-wrap: break-word;
}
  /*animation : clickedOn 1s*/
/*
@keyframes clickedOn {
    0% {width: 20%; background-color:#FAF0CD}
    100% {width: 22%; background-color:#F5F5F5}

}*/



/*
.verso {
  animation: fadeOut 1s;
  animation-fill-mode: forwards;
}

@keyframes fadeOut {
  99%  {visibiliy: visible;}
  100% {visibility: hidden;}
}
*/
</style>