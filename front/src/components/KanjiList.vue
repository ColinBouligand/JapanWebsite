<template>
    <div class="listKanji" > 
        <a @click="goToKanjiPage($event)"  :key="kanji.id" v-for="kanji in kanjis" class="kanji"> {{kanji}}</a>
    </div>
</template>

<script>

export default {
    name: 'KanjiList',
    props: {
        kanjis: Array
    },
    async created() {
        console.log(this.kanjis)
    },
    methods : {
        goToKanjiPage(event){
            console.log(event)
            window.location.href= `${window.location.origin}/kanji/${event.target.innerText}`
    },
    }

}
</script>

<style scoped>
.listKanji {
    display:flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap:wrap; 
}

.kanji {
    font-size:70px;
    margin-left: 3%;
    cursor:pointer;
}
</style>