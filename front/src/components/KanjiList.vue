<template>
<div class="res">
    <h2>Suggestions</h2>
    <div class="listKanji" > 
        <a @click="goToKanjiPage($event)"  :key="kanji.id" v-for="kanji in kanjis" class="kanji"> {{kanji}}</a>
    </div>
    </div>
</template>

<script>

export default {
    name: 'KanjiList',
    props: {
        kanjis: Object
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

.res {
    display: flex;
    flex-direction: column;
    width:80%;
}

.listKanji {
    width: 100%;
    margin-top: 10%;
    display:flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap:wrap; 
}

h2 {
        color: #FAF0CD;
        font-size : 60px;
        margin-left:35%;

}

.kanji {
    font-size:70px;
    margin-left: 3%;
    color: #FAF0CD;
    cursor:pointer;
}
</style>