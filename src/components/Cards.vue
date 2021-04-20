<template>
    <div id="cards">
    <div class="card" :key="kanji.id" v-for="kanji in kanjis" >
        <FlashCard  :kanji="kanji"/>
    </div>
    </div>
</template>

<script >
    import FlashCard from './FlashCard'

    export default {
        name: 'Cards',
        props: {
            kanjis: Array,
        },
        components: {
            FlashCard,
        },
        
    }
</script>

<style scoped>
#cards {
    display:flex;
    flex-direction: column;
    flex-wrap:wrap;
    justify-content: space-around;
}

.card {

     font-size: 110px;
     text-align: center;
     border: solid white 1px;
     background-color: black;
     color:white;
     padding:0;
     width:10%;
     margin-left:10%; 
     margin-top: 10%;
     cursor:pointer;
}


</style>