<template>
<div  v-bind:data-kanji="content.kanji" :style="{fontSize: fontSize, color: clicked ? 'black' : 'red'}" 
v-bind:class="{verso : clicked, minSize: minSize}  " @click="turnCard" :data-num="num"> {{content[column][0]}} </div>
</template>

<script>


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
        async turnCard(event){
            //envoie le kanji et la colonne du kanji sélectionné
            console.log(event)
            console.log(event.explicitOriginalTarget)
            console.log(event.explicitOriginalTarget.dataset)
            
                this.$emit('turn-card', event.explicitOriginalTarget.dataset.kanji,event.explicitOriginalTarget.dataset.num)
                this.clicked =!this.clicked
                this.correct = !this.correct
            

        }
    },
    created() {
        if(this.column == "meanings")
        {
            this.minSize=true;

        }

        //if(this.content[this.column][0].length > 8)
        
    
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

            //clicked: function() {return false;},
            //correct: function() {return false}
    }
}
</script>



<style scoped>
.minSize {
    font-size: 30px;
    padding:10%;
}


</style>