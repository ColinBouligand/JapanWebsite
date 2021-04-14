<template>
    <div id="cards">
    <div class="card" :key="kanji.id" v-for="kanji in kanjis" >
    <Card  :kanji="kanji"/>
    </div>
    </div>
</template>

<script >
    import Card from './Card'

    export default {
        name: 'Cards',
        props: {
            kanjis: Array,
        },
        components: {
            Card,
        },
        
    }
</script>

<style scoped>
#cards {
    display:flex;
    flex-wrap:wrap;
    justify-content: space-around;
}

.card {
    text-align: center;
     border: solid white 1px;
     background-color: black;
     color:white;
     padding:0;
     width:10%;
     margin-bottom: 1%;
     cursor:pointer;
}

</style>