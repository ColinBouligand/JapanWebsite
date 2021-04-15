<template>
   <p v-bind:class="{verso : clicked}" @click="turnCard"> {{kanji}} </p>
</template>

<script>

export default {
    name: 'Card',
    props: {
        kanji: String,
    },
    data() {
        return {
                clicked: false
        }
    },
    methods: {
        turnCard(){
            this.clicked = !this.clicked;
        }

    }
}


</script>


<style scoped>


 .verso {
    color:black;
 }

</style>