<template>
<div  v-bind:data-kanji="content.kanji" :style="{fontSize: fontSize, color: correct ? 'green' : 'red'}" 
v-bind:class="{verso : clicked}  " @click="turnCard" :data-num="num"> {{content[column][0]}} </div>
</template>

<script>


export default {
    name: 'FlashCard',
    props: {
        content: Object,
        column: String,
        fontSize: String,
        num: String
    },
    components: {
    },
    data() {
        return {
            clicked: false,
            correct: false
        }
    },
    methods: {
        format(content, column) { //met en forme le json en chaine
            console.log(content, column)
            console.log(this.$props.content[(this.$props.column)])
        },
        turnCard(event){
            //envoie le kanji et la colonne du kanji sélectionné
            this.$emit('turn-card', event.explicitOriginalTarget.dataset.kanji,event.explicitOriginalTarget.dataset.num)
            //event.target.classList.toggle('verso')
            this.clicked =!this.clicked
            this.correct = !this.correct
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

</style>